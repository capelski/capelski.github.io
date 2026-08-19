import React from 'react';
import { NavLink } from 'react-router-dom';
import { articleRoute } from '../../routes';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { ResponsiveTable } from '../responsive-table';

export const catalan: ArticleContent = {
    title: 'Blackjack 02. Puntuacions finals',
    description:
        'Com predir les puntuacions finals esperades de qualsevol jugador de Blackjack a partir de la seva estratègia',
    shareSentence: 'Sabies que el crupier es passa de 21 en 1 de cada 4 mans al Blackjack?',
    introduction: (
        <p>
            Un aspecte clau que fa difícil prendre decisions al Blackjack és que sempre juguem la
            nostra mà abans que el crupier jugui la seva. Gairebé fa l'efecte de pujar en una
            subhasta secreta on, sense saber la oferta del nostre rival, hem de fer una oferta prou
            alta per guanyar. Amb la diferència que el nostre rival sí que sap la nostra oferta.
            Això s'anomena l'avantatge de l'últim jugador.
        </p>
    ),
    body: (
        <React.Fragment>
            <ArticleImage
                articleId={ArticleId.blackjack02FinalScores}
                alt="Representació abstracta d'una oferta en una subhasta secreta"
                className="image-300"
                filename="blind-auction.png"
            />
            <p>
                Per compensar aquest avantatge, el crupier juga amb una estratègia fixa que el
                jugador coneix: es planta amb 17 i demana carta amb 16 o menys. Això limita
                l'avantatge del crupier i crea una certa sensació de justícia. No sabem quina serà
                la puntuació final del crupier, però sí que podem dir que o bé es passarà de 21 o bé
                acabarà amb una puntuació dins del rang 17-21. Això ens dona una idea de la
                puntuació que hem de superar. Però encara hi ha més.
            </p>
            <p>
                Resulta que podem aprofitar l'estratègia del crupier per predir amb quina freqüència
                es passarà de 21 i amb quina freqüència acabarà amb cada puntuació del seu rang.
                Aquesta predicció encara no ens ajudarà a prendre millors decisions, però ens
                permetrà predir els guanys de les nostres decisions a la llarga. Per predir la
                puntuació final del crupier necessitem combinar dues coses.
            </p>
            <p>
                La primera és una llista de totes les mans possibles amb què pot acabar el crupier.
                Generar aquesta llista requereix simular tots els escenaris possibles pels quals pot
                passar el crupier i apuntar cada mà amb una puntuació de 17 o més. És un exercici
                lent i propens a errors però, afortunadament, els ordinadors són molt bons fent
                aquest tipus de tasques.
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack02FinalScores}
                className="image-600"
                filename="dealer-hands-tree.png"
                footer="Esquema amb totes les mans possibles del crupier"
            />
            <ul>
                <li>
                    Si la 1a carta és A i la 2a carta és A, la puntuació és 2/12. El crupier demana
                    una 3a carta. La simulació continua
                </li>
                <li>
                    Si la 1a carta és A, la 2a carta és A i la 3a carta és A, la puntuació és 3/13.
                    El crupier demana una 4a carta. La simulació continua
                </li>
                <li>...</li>
                <li>
                    Si la 1a carta és A, la 2a carta és A i la 3a carta és un 8, la puntuació és
                    10/20. El crupier deixa de demanar cartes. Apuntem la mà i ens saltem
                    simulacions posteriors des d'aquesta mà
                </li>
                <li>...</li>
                <li>
                    Si la 1a carta és A, la 2a carta és A i la 3a carta és una K, la puntuació és
                    12. El crupier demana una 4a carta. La simulació continua
                </li>
                <li>...</li>
                <li>
                    Si la 1a carta és A i la 2a carta és K, la puntuació és blackjack. El crupier
                    deixa de demanar cartes. Apuntem la mà i ens saltem simulacions posteriors des
                    d'aquesta mà
                </li>
                <li>...</li>
            </ul>
            <p>
                La segona cosa que necessitem és la probabilitat que el crupier acabi amb cada mà de
                la llista. Al{' '}
                <NavLink
                    to={articleRoute.path.replace(
                        ':articleId',
                        ArticleId.blackjack01SolidDecisions
                    )}
                >
                    capítol 1
                </NavLink>{' '}
                vaig introduir el model de probabilitat independent i vam definir la probabilitat de
                treure una carta determinada com 1 de cada 13, independentment de les cartes que
                s'han repartit abans. Amb aquest model, la probabilitat d'una combinació de cartes
                concreta s'obté multiplicant la probabilitat de cada carta de la combinació. Alguns
                exemples:
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack02FinalScores}
                className="image-600"
                filename="sample-hands-probabilities.png"
                footer="Probabilitat d'obtenir certes mans"
            />
            <p>
                Aquestes probabilitats ens diuen que el crupier acabarà amb les cartes A,J (en
                aquest ordre concret) 1 de cada 169 vegades, i que només acabarà amb les cartes
                A,A,2,J,6 1 de cada 371293 vegades. Els números tenen sentit: el primer escenari és
                molt més probable que el segon. Amb aquest mètode podem obtenir la probabilitat de
                cada combinació de la llista de mans finals del crupier:
            </p>
            <ResponsiveTable<[string, string, string]>
                rows={[
                    ['Cartes', 'Puntuació', 'Probabilitat'],

                    ['A, A, A, A, A, A, A', '7/17', '0.00000159%'],
                    ['A, A, A, A, A, A, 2', '8/18', '0.00000159%'],
                    ['…', '…', '…'],
                    ['A, A, K, A, 2, K', '22+', '0.0000207%'],
                    ['…', '…', '…'],
                    ['A, 2, 3, 2', '8/18', '0.0035%'],
                    ['…', '…', '…'],
                    ['4, 2, 4, 3, 2, 10', '22+', '0.0000207%'],
                    ['…', '…', '…'],
                    ['8, 9', '17', '0.59%'],
                    ['…', '…', '…'],
                    ['K, K', '20', '0.59%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    La llista de mans finals possibles conté 79489 elements i és massa llarga per
                    escriure-la aquí sencera. Consulta{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/threshold/hands">
                        https://capelski.github.io/blackjack-stats/ca/threshold/hands
                    </Anchor>{' '}
                    per veure la llista completa de mans si en tens curiositat.
                </i>
            </p>
            <p>
                Tenint les dues coses podem esbrinar la probabilitat que el crupier acabi la partida
                amb una puntuació concreta. Ho fem agrupant les mans per puntuació final. Per
                exemple, les mans "A, A, A, A, A, A, A" i "8, 9" formaran part del grup amb
                puntuació 17. Les mans "A, A, A, A, A, A, 2" i "A, 2, 3, 2" formaran part del grup
                amb puntuació 18. Les mans "A, A, K, A, 2, K" i "4, 2, 4, 3, 2, 10" formaran part
                del grup de mans que es passen de 21. I així successivament.
            </p>
            <p>
                Un cop totes les mans estan agrupades, sumem la probabilitat de totes les mans del
                mateix grup. Així queda la llista després d'agrupar les mans per puntuació final i
                sumar les seves probabilitats.
            </p>
            <ResponsiveTable<[string, string, string]>
                rows={[
                    ['Puntuació', 'Mans', 'Probabilitat'],
                    ['17', '6640', '14.51%'],
                    ['18', '6650', '13.95%'],
                    ['19', '6666', '13.35%'],
                    ['20', '6701', '18.03%'],
                    ['21', '6726', '7.27%'],
                    ['BJ', '8', '4.73%'],
                    ['22+', '46098', '28.16%'],
                    ['Total', '79489', '100.00%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/threshold/scores">
                        https://capelski.github.io/blackjack-stats/ca/threshold/scores
                    </Anchor>
                </i>
            </p>
            <p>
                En base a aquesta llista podem esperar que el crupier acabi amb una puntuació de 20
                punts 18 de cada 100 vegades. També podem esperar que el crupier es passi de 21 en
                28 de cada 100 vegades, o aproximadament en 1 de cada 4 mans. No és impressionant el
                que ens pot arribar a dir sobre els resultats del crupier una mica d'estadística
                bàsica?
            </p>
            <p>
                De fet, aquest enfocament no es limita al crupier. Podem fer servir el mateix mètode
                per trobar les puntuacions finals esperades de qualsevol jugador amb una estratègia
                definida. Aquestes són les puntuacions finals esperades per a una estratègia
                habitual entre els jugadors: demanar carta amb 14 o menys i plantar-se amb 15. Al
                capítol següent, farem servir aquestes puntuacions finals per predir els{' '}
                <NavLink
                    to={articleRoute.path.replace(
                        ':articleId',
                        ArticleId.blackjack03ExpectedEarnings
                    )}
                >
                    guanys esperats
                </NavLink>{' '}
                d'una estratègia determinada.
            </p>
            <ResponsiveTable<[string, string, string]>
                rows={[
                    ['Puntuació', 'Mans', 'Probabilitat'],
                    ['15', '1310', '13.29%'],
                    ['16', '1314', '12.80%'],
                    ['17', '1320', '12.27%'],
                    ['18', '1330', '11.71%'],
                    ['19', '1346', '11.11%'],
                    ['20', '1381', '15.78%'],
                    ['21', '1406', '5.03%'],
                    ['BJ', '8', '4.73%'],
                    ['22+', '6234', '13.28%'],
                    ['Total', '15649', '100.00%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/threshold/scores?t=15">
                        https://capelski.github.io/blackjack-stats/ca/threshold/scores?t=15
                    </Anchor>
                </i>
            </p>
            <p>
                <i>
                    L'estratègia de "plantar-se amb 15" resulta intuïtiva perquè 15 és la puntuació
                    més baixa on la probabilitat de passar-se de 21 demanant carta és més gran del
                    50%. Amb el model de probabilitat independent, el risc de passar-se de 21 amb
                    una puntuació de 15 equival a 7 cartes (7, 8, 9, 10, J, Q, K) de 13, o 53.85%.
                    Això vol dir que, demanant carta, ens passem de 21 més sovint del que aconseguim
                    millorar la puntuació. Sembla doncs un punt natural per deixar de demanar
                    cartes.
                </i>
            </p>
        </React.Fragment>
    )
};
