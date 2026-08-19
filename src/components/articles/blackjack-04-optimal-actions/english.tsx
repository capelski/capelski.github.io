import React from 'react';
import { NavLink } from 'react-router-dom';
import { articleRoute } from '../../routes';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { ResponsiveTable } from '../responsive-table';

export const english: ArticleContent = {
    title: 'Blackjack 04. Optimal actions',
    description: 'How to find the actions that maximize your earnings in Blackjack',
    shareSentence: 'To draw or not to draw? Here is the ultimate Blackjack answer',
    introduction: (
        <p>
            Deciding which action is more convenient can be difficult in certain situations. Some
            players follow their hunches and decide on the spot. Others observe certain parameters
            of the game and factor them into their decision making. Regardless of our methods, how
            can we be sure that we are making the optimal decision? How can we tell we are choosing
            the actions that optimize our earnings?
        </p>
    ),
    body: (
        <React.Fragment>
            <p>
                To answer these questions, let's examine the decision making behind a trivial
                example: choosing a meal option for a lunch out. When we need to decide among
                several food options, we decide based on a number of factors: the available options
                in the menu, their price, the time we have, etc. And, above all, we decide based on
                how hungry we are. The ultimate goal of having lunch is to satisfy our hunger; if we
                make the right choice, we will have satisfied our hunger at the end of the meal.
            </p>
            <p>
                This trivial example reflects a few aspects of decision making. Firstly, we make our
                decisions based on one or more input parameters. When choosing lunch, the main input
                parameter is our level of hunger. Secondly, we measure the results of our decisions
                based on one or more output parameters. In the lunch example, the main output
                parameter is our level of hunger after eating. Finally, we determine whether the
                decision was correct or not by categorizing the results. If we are satisfied, we
                have made a good decision. If we are still hungry, we have made a bad decision.
            </p>
            <p>
                To make good decisions we need to understand the correlation between input and
                output parameters. The more correlated these two sets of parameters are, the more
                accurate our decisions can be. In the case of choosing lunch, that correlation is
                obvious, because we use the same parameter to measure the input and output: our
                level of hunger. If I were to choose a meal option based on the weather conditions
                instead, the correlation would disappear. In that case, there would be no certainty
                I will have satisfied my hunger at the end of the meal.
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack04OptimalActions}
                alt="Person wondering what to eat for lunch while looking at the weather outside"
                className="image-600"
                filename="lunch-options.png"
            />
            <p>
                Decision making in Blackjack is no exception. The goal is to earn money, so good
                decisions will be the ones that maximize our earnings. An effective way of measuring
                the expected earnings is the edge indicator we introduced in{' '}
                <NavLink
                    to={articleRoute.path.replace(
                        ':articleId',
                        ArticleId.blackjack03ExpectedEarnings
                    )}
                >
                    chapter 3
                </NavLink>
                , so that can be our output parameter. To optimize our decision making, we will want
                to base our strategies on input parameters that correlate well with the edge
                indicator. If the input parameters don't correlate well with the edge indicator, we
                can't be certain that the strategy is achieving maximum earnings. That happens to
                the case for the "Stand on X" strategies.
            </p>
            <p>
                It might seem the input parameter of the "Stand on X" strategies is the player
                score, but in fact it is not. The "Stand on X" strategies try to find balance
                between the risk of busting and the potential of improving the hand score. They pose
                the question "What is the maximum probability of busting I am willing to accept in
                order to try improving my score?". The input parameter they focus on is actually the
                probability of busting for the player score.
            </p>
            <p>
                When we play, we don't explicitly calculate the probability of busting (i.e. the
                input parameter) every time we make a decision. That information is not immediately
                available to us and it takes some effort to calculate. We instead rely on the player
                score (i.e. some other indicator), which implicitly contains that information. The
                input parameter at the core of the strategy however is the probability of busting.
            </p>
            <p>
                Using the independent probability model, introduced in{' '}
                <NavLink
                    to={articleRoute.path.replace(
                        ':articleId',
                        ArticleId.blackjack01SolidDecisions
                    )}
                >
                    chapter 1
                </NavLink>
                , we can express the probability of busting for a certain score as the number of
                cards out of 13 that make the player bust. Choosing the maximum probability of
                busting you are willing to accept determines the lowest score you will stand on. If
                you are willing to accept, say, a 60% risk of busting, it means you will draw up to
                16 (53.85% probability of busting) and you will stand from 17 (61.54% probability of
                busting) onwards.
            </p>
            <ResponsiveTable<[string, string, string]>
                rows={[
                    ['Max probability of busting', 'Strategy', 'Edge'],
                    ['0/13 = 0%', 'Stand on 12', '-8.08%'],
                    ['4/13 = 30.77%', 'Stand on 13', '-6.82%'],
                    ['5/13 = 38.46%', 'Stand on 14', '-5.82%'],
                    ['6/13 = 46.15%', 'Stand on 15', '-5.28%'],
                    ['7/13 = 53.85%', 'Stand on 16', '-5.21%'],
                    ['8/13 = 61.54%', 'Stand on 17', '-5.67%'],
                    ['9/13 = 69.23%', 'Stand on 18', '-9.00%']
                ]}
            />
            <p>
                In chapter 3 we computed the edge of several "Stand on X" strategies to find out the
                X value that maximizes the edge. In general, when we find ourselves having to test
                different values of an input parameter to find the one that maximizes an output
                parameter, it often means that we don't understand the correlation between them or
                that there is no correlation in the first place.
            </p>
            <p>
                So the probability of busting doesn't help us maximize our earnings. What other
                input parameters can we use then? Treating soft scores differently? The dealer's
                probability of busting? Neither of these parameters correlate well with the edge
                either. To find the parameter we are looking for we need to take a step back and
                analyze the problem from a different perspective.
            </p>
            <p>
                The ultimate question we want our strategy to answer is: "Which of the available
                actions yields the most earnings in the long run?". Since we measure the expected
                earnings via the edge indicator and that is also our output parameter... why not
                using the edge as the input parameter of our strategy then? The correlation between
                the input and output parameters would be as good as it gets.
            </p>
            <p>
                Using the edge as input parameter comes with a challenge: we need to calculate the
                edge for each available action for each possible score. Is that feasible? Let's
                start with the easy bit: the edge of standing. When we stand, we determine the final
                score of our hand. Having the final score, we can compare it with the expected final
                scores of the dealer in the same fashion we did in chapter 3. Merging the
                probabilities of each different comparison gives us the expected edge for standing
                with that score. The edge of standing with a score of 20, for example, is 57.96%.
            </p>
            <ResponsiveTable<[string, string, string, string]>
                rows={[
                    ['Dealer score', 'Probability', 'Outcome', 'Edge contribution'],
                    ['17', '14.51%', 'Win', '14.51%'],
                    ['18', '13.95%', 'Win', '13.95%'],
                    ['19', '13.35%', 'Win', '13.35%'],
                    ['20', '18.03%', 'Push', '0.00%'],
                    ['21', '7.27%', 'Lose', '-7.27%'],
                    ['BJ', '4.73%', 'Lose', '-4.73%'],
                    ['22+', '28.16%', 'Win', '28.16%'],
                    ['Edge', '', '', '57.96%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/optimal/analysis/20?a=stand">
                        https://capelski.github.io/blackjack-stats/en/optimal/analysis/20?a=stand
                    </Anchor>
                </i>
            </p>
            <p>
                Now the hard part: the edge of drawing a card. Just like we did with the edge of
                standing, to determine the edge of drawing a card we need to know the final scores
                drawing a card will lead to. The challenge is that drawing a card doesn't determine
                the final score of the hand. If we draw a card with a score of 9 and the card we get
                is a 5, for example, that makes our score 14. Will we continue to draw? If so, we
                can't tell the final score without knowing the decision we will make with that score
                of 14. Our decision is affected by future decisions. Which, in turn, might be
                affected by further future decisions. That sounds like an infinite loop. Are we in a
                chicken and egg dilemma?
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack04OptimalActions}
                alt="Illustration of the chicken-and-egg dilemma in decision making"
                className="image-600"
                filename="chicken-egg-dilemma.png"
            />
            <p>
                Fortunately, the loop cannot last forever. We will eventually bust or reach 21, and
                we won't be able to draw more cards. That means that we know all the possible future
                scenarios of drawing a card with a score of 20. That is enough to calculate the edge
                of drawing a card with such a score 💪 We do so by multiplying the edge of each
                future scenario by the probability of reaching that scenario, which is the
                probability of drawing a card that leads to it. Finally we sum all the values
                together.
            </p>
            <ResponsiveTable<[string, string, string, string, string, string]>
                rows={[
                    [
                        'Next card',
                        'Probability',
                        'Next score',
                        'Action',
                        'Edge',
                        'Edge contribution'
                    ],
                    ['A', '1 / 13', '21', 'Stand', '83.26%', '6.40%'],
                    ['2 - K', '12 / 13', 'Bust', 'End', '-100%', '-92.31%'],
                    ['Edge', '', '', '', '', '-85.90%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/optimal/analysis/20?a=hit">
                        https://capelski.github.io/blackjack-stats/en/optimal/analysis/20?a=hit
                    </Anchor>
                </i>
            </p>
            <p>
                We are now able to compare the edge of both actions. That is -85.90% for drawing vs
                57.96% for standing. Since it has the highest edge by far, the optimal action is to
                stand. This will hardly surprise you, since intuitively you already know that
                drawing a card with a score of 20 is a bad idea. Now we have a mathematical proof of
                it. Something interesting happens next. By deciding to stand with a score of 20, we
                have determined all the possible future decisions for drawing a card with a score of
                19. We can calculate the edge of drawing a card with a score of 19 🎉
            </p>
            <ResponsiveTable<[string, string, string, string, string, string]>
                rows={[
                    [
                        'Next card',
                        'Probability',
                        'Next score',
                        'Action',
                        'Edge',
                        'Edge contribution'
                    ],
                    ['A', '1 / 13', '20', 'Stand', '57.96%', '4.46%'],
                    ['2', '1 / 13', '21', 'End', '83.26%', '6.40%'],
                    ['3 - K', '11 / 13', '22+', 'Bust', '-100.00%', '-84.62%'],
                    ['Edge', '', '', '', '', '-73.75%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/optimal/analysis/19?a=hit">
                        https://capelski.github.io/blackjack-stats/en/optimal/analysis/19?a=hit
                    </Anchor>
                </i>
            </p>
            <p>
                We can now compare that number with the edge of standing with 19 and determine the
                optimal action for a score of 19. That will in turn determine all the possible
                future decisions for drawing a card with a score of 18. This triggers a domino
                effect that allows us to calculate the edge of drawing a card with all possible
                scores down to the lowest one. In game theory, this is known as backward induction.
                Here is the list of optimal actions for every possible score.
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack04OptimalActions}
                alt="Representation of the domino effect in backward induction"
                className="image-600"
                filename="domino-effect.png"
            />
            <ResponsiveTable<[string, string, string, string]>
                rows={[
                    ['Hand', 'Stand', 'Hit', 'Action'],
                    ['2/12', '-43.68%', '-1.12%', 'Hit'],
                    ['...', '...', '...', '...'],
                    ['7/17', '-29.17%', '-11.54%', 'Hit'],
                    ['8/18', '-0.71%', '-4.97%', 'Stand'],
                    ['...', '...', '...', '...'],
                    ['10/20', '57.96%', '8.56%', 'Stand'],
                    ['4', '-43.68%', '-22.71%', 'Hit'],
                    ['...', '...', '...', '...'],
                    ['14', '-43.68%', '-42.26%', 'Hit'],
                    ['15', '-43.68%', '-46.60%', 'Stand'],
                    ['...', '...', '...', '...'],
                    ['20', '57.96%', '-85.90%', 'Stand']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/optimal/analysis">
                        https://capelski.github.io/blackjack-stats/en/optimal/analysis
                    </Anchor>
                </i>
            </p>
            <p>
                We now know the action with the highest edge for every possible situation. By
                choosing such actions we can be certain our strategy is maximizing our edge and,
                therefore, maximizing our earnings. Obviously, we won't be computing the edge of
                every possible action in real time while playing. That would be painful. All we need
                to do instead is memorize the optimal actions for each player score. Our optimal
                strategy at this stage can be summarized as "Stand on 15 and 8/18" for easy
                remembering.
            </p>
            <p>
                These are bitter sweet news. On one hand, we have an easy-to-remember strategy that
                we know maximizes our earnings. On the other hand, the strategy is not very
                profitable. The edge of the "Stand on 15 and 8/18" strategy is -4.07%. Better than
                the -5.21% edge of the "Stand on 16" strategy, but still not good enough. In the
                next chapter, we will be looking at how to use{' '}
                <NavLink
                    to={articleRoute.path.replace(':articleId', ArticleId.blackjack05DealerCard)}
                >
                    the dealer card
                </NavLink>{' '}
                to improve the edge significantly.
            </p>
        </React.Fragment>
    )
};
