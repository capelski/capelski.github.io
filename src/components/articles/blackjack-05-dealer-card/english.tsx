import React from 'react';
import { NavLink } from 'react-router-dom';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { ResponsiveTable } from '../responsive-table';

export const english: ArticleContent = {
    title: 'Blackjack 05. The dealer card',
    description:
        'How to exploit the dealer card to improve the earnings of your Blackjack strategy',
    shareSentence: 'Hitting a 16? Only on certain dealer cards',
    introduction: (
        <p>
            In previous chapters of this series we have applied a number of mathematical methods to
            improve our Blackjack decision making. Expected final scores, expected earnings and
            optimal actions. All safe and sound and, yet, we are still not making money at the end
            of the day. To improve our earnings we will need to do things differently. Consider
            additional information. What additional information could that be?
        </p>
    ),
    body: (
        <React.Fragment>
            <p>
                We have been paying a lot of attention to the information available on our side of
                the table, the player score. It turns out the information at the other side of the
                table, the dealer's up card, is also valuable. Factoring in the dealer's up card
                will help us detect situations where we can achieve higher earnings by introducing
                exceptions in our strategy.
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack05DealerCard}
                alt="Blackjack dealer with unknown up card"
                className="image-600"
                filename="dealer-card-unknown.png"
            />
            <p>
                In <NavLink to={ArticleId.blackjack02FinalScores}>chapter 2</NavLink> we used the
                dealer strategy to compile a list of all the possible hands the dealer can finish
                the game with. We then used that list to find out how often we can expect the dealer
                to end up with a certain score. This information is accurate from a global point of
                view, but it misses out on a key factor. Knowing the dealer's first card rules out a
                good number of possible final hands from the list.
            </p>
            <ResponsiveTable<[string, string, string]>
                rows={[
                    ['Cards', 'Score', 'Probability'],

                    ['A, A, A, A, A, A, A', '7/17', '0.00000159%'],
                    ['A, A, A, A, A, A, 2', '8/18', '0.00000159%'],
                    ['…', '…', '…'],
                    ['A, A, K, A, 2, K', 'Bust', '0.0000207%'],
                    ['…', '…', '…'],
                    ['A, 2, 3, 2', '8/18', '0.0035%'],
                    ['…', '…', '…'],
                    ['4, 2, 4, 3, 2, 10', 'Bust', '0.0000207%'],
                    ['…', '…', '…'],
                    ['8, 9', '17', '0.59%'],
                    ['…', '…', '…'],
                    ['K, K', '20', '0.59%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/threshold/hands">
                        https://capelski.github.io/blackjack-stats/en/threshold/hands
                    </Anchor>
                </i>
            </p>
            <p>
                Take the first final hand in the list, for example. A, A, A, A, A, A, A, with a
                score of 7/17 and a probability of 0.00000159%. This hand is only possible if the
                dealer's first card is an A. If the dealer's first card is anything but an A, the
                dealer cannot reach this final hand. We can get more accurate final score
                probabilities by excluding this final hand from the list when the dealer's first
                card is not an A.
            </p>
            <p>
                The same goes for each final hand in the list. We only want to consider the final
                hands that are possible given the dealer's first card. To do so, we need to split
                the list of final hands by the first card of each combination. This is what the
                dealer's final probabilities look like when splitting the list by the dealer's first
                card. We can see, for example, that the dealer's probability of getting a blackjack
                is null when the first card is neither an A nor a 10. That makes sense.
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
                    ['Dealer score', '2', '3', '4', '5', '6', '7', '8', '9', '10 - K', 'A'],
                    [
                        '17',
                        '1.08%',
                        '1.04%',
                        '1.00%',
                        '0.94%',
                        '1.27%',
                        '2.84%',
                        '0.99%',
                        '0.92%',
                        '3.43%',
                        '1.01%'
                    ],
                    [
                        '18',
                        '1.04%',
                        '1.00%',
                        '0.97%',
                        '0.94%',
                        '0.82%',
                        '1.06%',
                        '2.76%',
                        '0.92%',
                        '3.43%',
                        '1.01%'
                    ],
                    [
                        '19',
                        '1.00%',
                        '0.97%',
                        '0.93%',
                        '0.91%',
                        '0.82%',
                        '0.60%',
                        '0.99%',
                        '2.70%',
                        '3.43%',
                        '1.01%'
                    ],
                    [
                        '20',
                        '0.95%',
                        '0.93%',
                        '0.90%',
                        '0.87%',
                        '0.78%',
                        '0.60%',
                        '0.53%',
                        '0.92%',
                        '10.53%',
                        '1.01%'
                    ],
                    [
                        '21',
                        '0.91%',
                        '0.88%',
                        '0.86%',
                        '0.83%',
                        '0.75%',
                        '0.57%',
                        '0.53%',
                        '0.47%',
                        '1.06%',
                        '0.41%'
                    ],
                    ['BJ', '-', '-', '-', '-', '-', '-', '-', '-', '2.37%', '2.37%'],
                    [
                        '22+',
                        '2.72%',
                        '2.88%',
                        '3.03%',
                        '3.20%',
                        '3.26%',
                        '2.02%',
                        '1.88%',
                        '1.76%',
                        '6.53%',
                        '0.89%'
                    ],
                    [
                        'Total',
                        '7.69%',
                        '7.69%',
                        '7.69%',
                        '7.69%',
                        '7.69%',
                        '7.69%',
                        '7.69%',
                        '7.69%',
                        '30.77%',
                        '7.69%'
                    ]
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/dealer/scores?dcm=absolute">
                        https://capelski.github.io/blackjack-stats/en/dealer/scores?dcm=absolute
                    </Anchor>
                </i>
            </p>
            <p>
                The numbers in the table above reflect the global probabilities. Once the dealer
                gets their card dealt, we no longer care about the global probabilities. If the
                dealer's up card is a 2, for example, the probability of the dealer busting is
                2.72%. But that is over the 7.69% total probability for that column, not over the
                global probabilities. 2.72% / 7.69% = 35.36%. The dealer will bust 35.36% of the
                times when their up card is a 2. Let's adjust the probabilities of the table so each
                column sums up to 100%.
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
                    ['Dealer score', '2', '3', '4', '5', '6', '7', '8', '9', '10 - K', 'A'],
                    [
                        '17',
                        '13.98%',
                        '13.50%',
                        '13.05%',
                        '12.23%',
                        '16.54%',
                        '36.86%',
                        '12.86%',
                        '12.00%',
                        '11.14%',
                        '13.08%'
                    ],
                    [
                        '18',
                        '13.49%',
                        '13.05%',
                        '12.59%',
                        '12.23%',
                        '10.63%',
                        '13.78%',
                        '35.93%',
                        '12.00%',
                        '11.14%',
                        '13.08%'
                    ],
                    [
                        '19',
                        '12.97%',
                        '12.56%',
                        '12.14%',
                        '11.77%',
                        '10.63%',
                        '7.86%',
                        '12.86%',
                        '35.08%',
                        '11.14%',
                        '13.08%'
                    ],
                    [
                        '20',
                        '12.40%',
                        '12.03%',
                        '11.65%',
                        '11.31%',
                        '10.17%',
                        '7.86%',
                        '6.94%',
                        '12.00%',
                        '34.22%',
                        '13.08%'
                    ],
                    [
                        '21',
                        '11.80%',
                        '11.47%',
                        '11.12%',
                        '10.82%',
                        '9.72%',
                        '7.41%',
                        '6.94%',
                        '6.08%',
                        '3.45%',
                        '5.39%'
                    ],
                    ['BJ', '-', '-', '-', '-', '-', '-', '-', '-', '7.69%', '30.77%'],
                    [
                        '22+',
                        '35.36%',
                        '37.39%',
                        '39.45%',
                        '41.64%',
                        '42.32%',
                        '26.23%',
                        '24.47%',
                        '22.84%',
                        '21.21%',
                        '11.53%'
                    ]
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/dealer/scores">
                        https://capelski.github.io/blackjack-stats/en/dealer/scores
                    </Anchor>
                </i>
            </p>
            <p>
                The numbers make more sense now. We can now see that, for example, the probability
                of the dealer busting is almost four times higher when the dealer card is a 6
                compared to when it is an A. Four times higher! This is a huge difference. Surely
                this must make a difference when computing edge values.
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack05DealerCard}
                alt="Blackjack dealer with 6 up card"
                className="image-600"
                filename="dealer-card-6.png"
            />
            <p>
                In <NavLink to={ArticleId.blackjack04OptimalActions}>chapter 4</NavLink> we computed
                the edge of each action for any given player score. Quick recap. The edge of drawing
                a card comes from pondering the future scenarios we will get to by drawing another
                card, starting with the highest player score and working our way backwards. The edge
                of standing comes from comparing the player score with the dealer's expected final
                scores. And, for that comparison, we used the overall dealer's expected final
                scores. For a player score of 14, for example, the edge of drawing is -43.68%, while
                the edge of standing is -42.26%.
            </p>
            <p>
                Let's see how these edges change when the dealer's up card is a 6, for example. When
                computing the edge of standing, we will now use the expected final scores
                corresponding to a dealer's up card of 6. The edge of standing improves naturally,
                because the dealer is more likely to bust and they cannot get a blackjack either.
            </p>
            <ResponsiveTable<[string, string, string, string]>
                rows={[
                    ['Dealer score', 'Probability', 'Outcome', 'Edge contribution'],
                    ['17', '16.54%', 'Lose', '-16.54%'],
                    ['18', '10.63%', 'Lose', '-10.63%'],
                    ['19', '10.63%', 'Lose', '-10.63%'],
                    ['20', '10.17%', 'Lose', '-10.17%'],
                    ['21', '9.72%', 'Lose', '-9.72%'],
                    ['22+', '42.32%', 'Win', '42.32%'],
                    ['Edge', '', '', '-15.37%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/dealer/breakdown/6/analysis/14/?a=stand">
                        https://capelski.github.io/blackjack-stats/en/dealer/breakdown/6/analysis/14/?a=stand
                    </Anchor>
                </i>
            </p>
            <p>
                The edge of drawing a card changes as well. The optimal action for scores of 15 and
                higher continues to be the same when facing a dealer 6, standing, so drawing a card
                leads to the same future scenarios. However, each of those scenarios have better
                edges when facing a dealer 6, due again to the dealer being more likely to bust.
                When merging the edges of all the possible scenarios, we find that the edge of
                drawing increases to -30.07%
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
                    ['A', '1 / 13', '15', 'Stand', '-15.37%', '-1.18%'],
                    ['2', '1 / 13', '16', 'Stand', '-15.37%', '-1.18%'],
                    ['3', '1 / 13', '17', 'Stand', '1.17%', '0.09%'],
                    ['4', '1 / 13', '18', 'Stand', '28.34%', '2.18%'],
                    ['5', '1 / 13', '19', 'Stand', '49.60%', '3.82%'],
                    ['6', '1 / 13', '20', 'Stand', '70.40%', '5.42%'],
                    ['7', '1 / 13', '21', 'End', '90.28%', '6.94%'],
                    ['8 - K', '6 / 13', '22+', 'Bust', '-100.00%', '-46.15%'],
                    ['Edge', '', '', '', '', '-30.07%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/dealer/breakdown/6/analysis/14/?a=hit">
                        https://capelski.github.io/blackjack-stats/en/dealer/breakdown/6/analysis/14/?a=hit
                    </Anchor>
                </i>
            </p>
            <p>
                Both edges have increased significantly, but the most important thing to notice is
                that standing is now much more profitable than drawing a card. We can still expect
                to lose money, since 14 is a bad player score after all, but we will lose a lot less
                by standing when the dealer has a 6.
            </p>
            <ResponsiveTable<[string, string, string]>
                rows={[
                    ['Action', 'Global edge', 'Edge vs dealer 6'],
                    ['Stand', '-42.26%', '-15.37%'],
                    ['Hit', '-43.68%', '-30.07%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>Edges for a player score of 14</i>
            </p>
            <p>
                A similar change occurs when looking at a player score of 16. Basing the calculation
                on the overall dealer's expected final scores, the edges of standing and drawing a
                card are -43.68% and -50.93% respectively, making standing the better call. When the
                dealer's up card is an A however, they are less likely to bust. This changes the
                edges to -76.94% and -66.57%, and turns the scale in favour of drawing. You can
                still expect to lose money when facing an A with a score of 16, but daring to draw
                that card will make you lose somewhat less.
            </p>
            <ResponsiveTable<[string, string, string]>
                rows={[
                    ['Action', 'Global edge', 'Edge vs dealer A'],
                    ['Stand', '-43.68%', '-76.94%'],
                    ['Hit', '-50.93%', '-66.57%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>Edges for a player score of 16</i>
            </p>
            <p>
                The same principle applies to all the other player scores: the dealer's up card
                might change the optimal action. Re-computing the optimal actions for each possible
                dealer card yields the following table. Somewhat similar to the optimal actions for
                the "Stand on 15 and 8/18" strategy, but with a number of exceptions to take
                advantage of specific dealer weaknesses.
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
                    ['4 - 11', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
                    ['12', 'H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
                    ['13 - 16', 'S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
                    ['17 - 20', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    H = Hit / S = Stand. Source:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/en/dealer/summary?dsm=compact">
                        https://capelski.github.io/blackjack-stats/en/dealer/summary?dsm=compact
                    </Anchor>
                </i>
            </p>
            <p>
                This is the base of the so called Basic Strategy most Blackjack players use around
                the globe. At practice, it means having different strategies for different dealer
                cards. It requires remembering a larger variety of cases, but the increase in
                complexity is definitely justified by the increase in expected earnings. With these
                tweaks, we have managed to improve the expected earnings of our strategy to a
                whopping -2.42%! In the next chapter we will analyze how doubling and splitting in
                the right moments can help us improve our expected earnings even further.
            </p>
        </React.Fragment>
    )
};
