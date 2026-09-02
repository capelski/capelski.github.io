import React from 'react';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { ArticleLink } from '../article-link';
import { ResponsiveTable } from '../responsive-table';

export const english: ArticleContent = {
    title: 'Blackjack 06. Doubling',
    description: 'How to spot the Blackjack hands that are worth doubling',
    shareSentence: 'Never double a Blackjack 10 when the dealer has an A',
    introduction: (
        <p>
            To make the game more appealing for players, casinos offer additional actions besides
            standing or drawing a card. Those actions are not always profitable however, and we
            might end up losing more money than we should if we chose them indiscriminately. In this
            chapter we will have a look at how doubling in the right situations will help us make
            more money at the end of the day.
        </p>
    ),
    body: (
        <React.Fragment>
            <p>
                Doubling consist in doubling down the bet size, as the name suggests, and being
                dealt one more card only. Which ever score we get after getting that card will be
                the final score of the hand and the dealer will move on to the next player. It is a
                risky move, as we will not have the chance to keep drawing more cards afterwards. We
                will only want to double when we have high probabilities of winning the game after
                being dealt a single card.
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack06Doubling}
                alt="Doubling a blackjack hand"
                width={600}
                filename="doubling.png"
            />
            <p>
                Imagine we double down with a score of 4, for example. Our final score will be 15 if
                the next card is A, 6 if the next card is 2, 7 if the next card is 3, and so on. The
                final score of the hand will always be in the 6 - 15 range. Since the dealer final
                score is always 17 or greater, with such a range of final scores we will only win
                the game when the dealer busts. At practice, this makes doubling the same as
                standing for player scores of 4. With the difference that we will lose twice as much
                money, since we will have doubled the bet. This makes doubling a bad move.
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack06Doubling}
                alt="Doubling a blackjack hand with a score of 4"
                width={600}
                filename="doubling-4.png"
            />
            <p>
                To identify the situations where we can benefit from doubling, we need to compute
                the edge for doubling in the same fashion we did in{' '}
                <ArticleLink articleId={ArticleId.blackjack04OptimalActions}>chapter 4</ArticleLink>
                . Just like the edge of drawing, the edge of doubling comes from combining the edge
                of all the future scenarios we can get to with the next card. The are two
                differences though. First, since we can not draw any more cards after doubling, we
                will be forced to stand, regardless of what the optimal action is for the future
                scenario.
            </p>
            <p>
                Second, the edge of each future scenario needs to reflect the doubled bet size.
                Remember the edge of an action conveys the expected earnings in terms of bet size.
                Since we multiplied the bet size by 2 to get to each future scenario, their edges
                need to be multiplied by 2 as well. This is what the edge of doubling looks like for
                a score of 10.
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
                    ['A', '1 / 13', '11/21', 'Stand', '83.26% (x2)', '12.81%'],
                    ['2', '1 / 13', '12', 'Stand', '-43.68% (x2)', '-6.72%'],
                    ['3', '1 / 13', '13', 'Stand', '-43.68% (x2)', '-6.72%'],
                    ['4', '1 / 13', '14', 'Stand', '-43.68% (x2)', '-6.72%'],
                    ['5', '1 / 13', '15', 'Stand', '-43.68% (x2)', '-6.72%'],
                    ['6', '1 / 13', '16', 'Stand', '-43.68% (x2)', '-6.72%'],
                    ['7', '1 / 13', '17', 'Stand', '-29.17% (x2)', '-4.49%'],
                    ['8', '1 / 13', '18', 'Stand', '-0.71% (x2)', '-0.11%'],
                    ['9', '1 / 13', '19', 'Stand', '26.59% (x2)', '4.09%'],
                    ['10 - K', '4 / 13', '20', 'Stand', '57.96% (x2)', '35.67%'],
                    ['Edge', '', '', '', '', '14.37%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/optimal/analysis/10?d=9-to-11&a=double">
                        https://capelski.github.io/blackjack-stats/en/optimal/analysis/10?d=9-to-11&a=double
                    </Anchor>
                </i>
            </p>
            <p>
                Now we know how to obtain the edge of doubling. Let's recompute the table of optimal
                actions for each player score in the same way we did in chapter 4, including the
                option to double. The table reveals that, overall, doubling is only worth it when
                the player has either a 10 or an 11. That seems reasonable. After drawing a card
                with 10 or 11, the optimal action for most future scenarios is to stand; not being
                able to draw any more cards doesn't penalize us much. And, since 10 and 11 are
                strong scores to draw a card with, doubling amplifies the earnings even more.
            </p>
            <ResponsiveTable<[string, string, string, string, string]>
                rows={[
                    ['Hand', 'Stand', 'Hit', 'Double', 'Action'],
                    ['2/12', '-43.68%', '-1.12%', '-32.54%', 'Hit'],
                    ['...', '...', '...', '...', '...'],
                    ['9', '-43.68%', '-3.97%', '-19.64%', 'Hit'],
                    ['10', '-43.68%', '8.56%', '14.37%', 'Double'],
                    ['11', '-43.68%', '14.40%', '26.05%', 'Double'],
                    ['12', '-43.68%', '-33.04%', '-67.20%', 'Hit'],
                    ['...', '...', '...', '...', '...'],
                    ['20', '57.96%', '-85.90%', '-171.81%', 'Stand']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/optimal/analysis?d=all">
                        https://capelski.github.io/blackjack-stats/en/optimal/analysis?d=all
                    </Anchor>
                </i>
            </p>
            <p>
                How does doubling affect the expected earnings of the strategy? To find the answer,
                we will need to modify slightly the calculations we did in chapters 2 and 3. In{' '}
                <ArticleLink articleId={ArticleId.blackjack02FinalScores}>chapter 2</ArticleLink>,
                we compiled a list of all the possible hands a player can end up with. Doubling
                causes some of the hands in that list to end up with a doubled bet size. Hands of
                8,2 and 8,3, for example, will double and end up with a 2x bet multiplier. Let's
                keep track of that.
            </p>
            <ResponsiveTable<[string, string, string, string]>
                rows={[
                    ['Cards', 'Score', 'Probability', 'Bet multiplier'],
                    ['...', '...', '...', '...'],
                    ['8, A', '9/19', '0.59%', '1x'],
                    ['8, 2, D, A', '11/21', '0.05%', '2x'],
                    ['...', '...', '...', '...'],
                    ['8, 2, D, K', '20', '0.05%', '2x'],
                    ['8, 3, D, A', '12', '0.05%', '2x'],
                    ['...', '...', '...', '...'],
                    ['8, 3, D, K', '21', '0.05%', '2x'],
                    ['8, 4, A, A, A', '15', '2.7e-4%', '1x'],
                    ['...', '...', '...', '...']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/optimal/hands/?d=all&cf=8">
                        https://capelski.github.io/blackjack-stats/en/optimal/hands/?d=all&cf=8
                    </Anchor>
                </i>
            </p>
            <p>
                We then grouped the hands by their final scores. Since now some of the hands involve
                doubled bets, we need to account for the bet multiplier when grouping them. We will
                have a different group for each final score and bet multiplier. This reflects the
                different ways there are to reach each final hand. We can get to a final score of
                15, for example, by standing on a 8,7 hand, but also by doubling on a 7,3 hand and
                being dealt a 5. Both paths produce a final score of 15, but since the payouts are
                different, we want to treat those final hands separately.
            </p>
            <ResponsiveTable<[string, string, string]>
                rows={[
                    ['Score', 'Bet multiplier', 'Probability'],
                    ['12', '2x', '0.68%'],
                    ['13', '2x', '0.68%'],
                    ['14', '2x', '0.68%'],
                    ['15', '1x', '11.77%'],
                    ['', '2x', '0.68%'],
                    ['...', '...', '...']
                ]}
            />{' '}
            <p style={{ textAlign: 'center' }}>
                <i>
                    Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/optimal/scores?d=all">
                        https://capelski.github.io/blackjack-stats/en/optimal/scores?d=all
                    </Anchor>
                </i>
            </p>
            <p>
                In{' '}
                <ArticleLink articleId={ArticleId.blackjack03ExpectedEarnings}>
                    chapter 3
                </ArticleLink>
                , we then compared the expected final scores with the expected final scores of the
                dealer and grouped the scenarios by result. Again, some of the final score groups
                now involve doubled bets, so we need to process those groups separately in the
                comparison with the dealer.
            </p>
            <ResponsiveTable<
                [string, string, string, string, string, string, string, string, string, string]
            >
                rows={[
                    ['', 'Bet multiplier', '17', '18', '19', '20', '21', 'BJ', '22+', 'Total'],
                    ['...', '...', '...', '...', '...', '...', '...', '...', '...', '...'],
                    [
                        '14',
                        '2x',
                        '0.10%',
                        '0.10%',
                        '0.09%',
                        '0.12%',
                        '0.05%',
                        '0.03%',
                        '0.19%',
                        '0.68%'
                    ],
                    [
                        '15',
                        '1x',
                        '1.71%',
                        '1.64%',
                        '1.57%',
                        '2.12%',
                        '0.86%',
                        '0.56%',
                        '3.32%',
                        '11.77%'
                    ],
                    [
                        '',
                        '2x',
                        '0.10%',
                        '0.10%',
                        '0.09%',
                        '0.12%',
                        '0.05%',
                        '0.03%',
                        '0.19%',
                        '0.68%'
                    ],
                    ['...', '...', '...', '...', '...', '...', '...', '...', '...', '...']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/optimal/comparisons/matrix?d=all">
                        https://capelski.github.io/blackjack-stats/en/optimal/comparisons/matrix?d=all
                    </Anchor>
                </i>
            </p>
            <p>
                Having isolated the doubled scenarios allows us to calculate their contribution to
                the strategy edge. In the scenarios where we have a double bet, the pot variation
                will be double the bet size. In other words, the 4.54% of the times we win after
                doubling the hand, we will add 2 bets to the pot. And the 3.63% of the times we lose
                after doubling the hand, we will subtract 2 bets from the pot. Combining the edges
                for each group we then find out the edge of a strategy that involves doubling. In
                this case, -3.27%.
            </p>
            <ResponsiveTable<[string, string, string, string]>
                rows={[
                    ['Result', 'Bet multiplier', 'Probability', 'Pot variation'],
                    ['Wins', '+1 bet', '33.56%', '+33.56% bet'],
                    ['Blackjack wins', '+3/2 bets', '4.51%', '+6.76% bet'],
                    ['Doubled wins', '+2 bets', '4.54%', '+9.08% bet'],
                    ['Pushes', '+0 bets', '8.33%', '+0 bet'],
                    ['Losses', '-1 bet', '45.43%', '-45.43% bet'],
                    ['Doubled losses', '-2 bets', '3.63%', '-7.25% bet'],
                    ['Edge', '', '', '-3.27% bet']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/optimal/results?d=all">
                        https://capelski.github.io/blackjack-stats/en/optimal/results?d=all
                    </Anchor>
                </i>
            </p>
            <p>
                There are additional situations where doubling yields better earnings. To identify
                them, we need to compute the edge of doubling for each possible dealer card. The
                same thing we did in{' '}
                <ArticleLink articleId={ArticleId.blackjack05DealerCard}>chapter 5</ArticleLink> for
                the edges of standing and drawing. Here are the optimal actions for each dealer card
                when the player is allowed to double. The strategy becomes harder to remember, but
                the expected earnings improve notably: -1.17%, compared to the -2.42% we had without
                doubling.
            </p>
            <ResponsiveTable<
                [
                    string,
                    string,
                    string,
                    string,
                    string,
                    string,
                    string,
                    string,
                    string,
                    string,
                    string
                ]
            >
                rows={[
                    ['Player score', '2', '3', '4', '5', '6', '7', '8', '9', '10 - K', 'A'],
                    ['2/12', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
                    ['3/13', 'H', 'H', 'H', 'H', 'D', 'H', 'H', 'H', 'H', 'H'],
                    ['4/14 - 5/15', 'H', 'H', 'H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
                    ['6/16', 'H', 'H', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
                    ['7/17', 'H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
                    ['8/18', 'S', 'D', 'D', 'D', 'D', 'S', 'S', 'H', 'H', 'H'],
                    ['9/19 - 10/20', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
                    ['4 - 8', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
                    ['9', 'H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
                    ['10 - 11', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H'],
                    ['12', 'H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
                    ['13 - 16', 'S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
                    ['17 - 20', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    S = Stand / H = Hit / D = Double. Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/dealer/summary?d=all&dsm=compact">
                        https://capelski.github.io/blackjack-stats/en/dealer/summary?d=all&dsm=compact
                    </Anchor>
                </i>
            </p>
            <p>
                Finally, note that some casinos only allow doubling with scores of 9, 10 or 11. That
                reduces the strategy edge to -1.25% but, on the flip side, it makes the strategy
                easier to remember. In the next chapter we will discuss further improving the
                expected earnings by splitting pairs when appropriate.
            </p>
            <ResponsiveTable<
                [
                    string,
                    string,
                    string,
                    string,
                    string,
                    string,
                    string,
                    string,
                    string,
                    string,
                    string
                ]
            >
                rows={[
                    ['Player score', '2', '3', '4', '5', '6', '7', '8', '9', '10 - K', 'A'],
                    ['2/12 - 7/17', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
                    ['8/18', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'H', 'H', 'H'],
                    ['9/19 - 10/20', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
                    ['4 - 8', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
                    ['9', 'H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
                    ['10 - 11', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H'],
                    ['12', 'H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
                    ['13 - 16', 'S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
                    ['17 - 20', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    S = Stand / H = Hit / D = Double. Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/dealer/summary?d=9-to-11&dsm=compact">
                        https://capelski.github.io/blackjack-stats/en/dealer/summary?d=9-to-11&dsm=compact
                    </Anchor>
                </i>
            </p>
        </React.Fragment>
    )
};
