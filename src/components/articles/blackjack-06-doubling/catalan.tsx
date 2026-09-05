import React from 'react';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { ArticleLink } from '../article-link';
import { ResponsiveTable } from '../responsive-table';

export const catalan: ArticleContent = {
    title: 'Blackjack 06. Doblar',
    description: 'Com detectar les mans de Blackjack que val la pena doblar',
    shareSentence: 'No doblis mai un 10 al Blackjack quan el crupier té un A',
    introduction: (
        <p>
            Per fer el joc més atractiu pels jugadors, els casinos ofereixen accions addicionals a
            banda de plantar-se o demanar carta. Aquestes accions no sempre són rendibles però, i
            podem acabar perdent més diners dels que ens tocaria si les triem indiscriminadament. En
            aquest capítol veurem com doblar en les situacions adequades ens ajudarà a guanyar més
            diners al final del dia.
        </p>
    ),
    body: (
        <React.Fragment>
            <p>
                Doblar consisteix a doblar la mida de l'aposta, com el nom indica, i rebre només una
                carta més. La puntuació que obtinguem després de rebre aquesta carta serà la
                puntuació final de la mà i el crupier passarà al jugador següent. És una jugada
                arriscada, ja que després no podrem continuar demanant cartes. Només voldrem doblar
                quan tinguem moltes probabilitats de guanyar la partida rebent una única carta.
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack06Doubling}
                alt="Doblar una mà de Blackjack"
                width={600}
                filename="doubling.png"
            />
            <p>
                Imaginem que doblem amb una puntuació de 4, per exemple. La nostra puntuació final
                serà 15 si la carta següent és un A, 6 si la carta següent és un 2, 7 si la carta
                següent és un 3, i així successivament. La puntuació final de la mà sempre estarà
                dins del rang 6 - 15. Com que la puntuació final del crupier sempre és 17 o
                superior, amb un rang de puntuacions finals com aquest només guanyarem la partida
                quan el crupier es passi de 21. A la pràctica, això fa que, amb mans de 4 punts,
                doblar sigui el mateix que plantar-se. Amb la diferència que perdrem el doble de
                diners, ja que haurem doblat l'aposta. Axi doncs, doblar una mà de 4 punts és una
                mala jugada.
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack06Doubling}
                alt="Doblar una mà de Blackjack amb una puntuació de 4"
                width={600}
                filename="doubling-4.png"
            />
            <p>
                Per identificar les situacions en què doblar surt a compte, hem de calcular
                l'avantatge de doblar de la mateixa manera que vam fer al{' '}
                <ArticleLink articleId={ArticleId.blackjack04OptimalActions}>capítol 4</ArticleLink>
                . Igual que l'avantatge de demanar carta, l'avantatge de doblar surt de combinar
                l'avantatge de tots els escenaris futurs als quals podem arribar amb la carta
                següent. Hi ha però dues diferències:
            </p>
            <ul>
                <li>
                    Després de doblar, no podem demanar més cartes. Independentment de quina sigui
                    l'acció òptima per cada escenari futur, ens haurem de plantar.
                </li>
                <li>
                    Doblar implica multiplicar l'aposta per dos. L'avantatge de cada escenari futur
                    no té en compte la mida doble de l'aposta, així que, quan els combinem, obtenim
                    l'avantatge de demanar una carta més i després plantar-nos. Recordem que
                    l'avantatge d'una acció expressa els guanys esperats en termes de la mida de
                    l'aposta. Si la mida de l'aposta es duplica, també ho faran els guanys esperats.
                    Hem de multiplicar doncs l'avantatge obtingut per 2 per tal de tenir en compte
                    l'aposta doble.
                </li>
            </ul>
            <p>Així queda l'avantatge de doblar per a una puntuació de 10.</p>
            <ResponsiveTable<[string, string, string, string, string, string]>
                rows={[
                    [
                        'Carta següent',
                        'Probabilitat',
                        'Puntuació següent',
                        'Acció',
                        'Avantatge',
                        'Avantatge (ponderat)'
                    ],
                    ['A', '1 / 13', '11/21', 'Fi', '83.26%', '6.40%'],
                    ['2', '1 / 13', '12', 'Fi', '-43.68%', '-3.36%'],
                    ['3', '1 / 13', '13', 'Fi', '-43.68%', '-3.36%'],
                    ['4', '1 / 13', '14', 'Fi', '-43.68%', '-3.36%'],
                    ['5', '1 / 13', '15', 'Fi', '-43.68%', '-3.36%'],
                    ['6', '1 / 13', '16', 'Fi', '-43.68%', '-3.36%'],
                    ['7', '1 / 13', '17', 'Fi', '-29.17%', '-2.24%'],
                    ['8', '1 / 13', '18', 'Fi', '-0.71%', '-0.05%'],
                    ['9', '1 / 13', '19', 'Fi', '26.59%', '2.05%'],
                    ['10 - K', '4 / 13', '20', 'Fi', '57.96%', '17.83%'],
                    ['Edge', '', '', '', '', '7.19% x2 = 14.37%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/optimal/analysis/10?d=9-to-11&a=double">
                        https://capelski.github.io/blackjack-stats/ca/optimal/analysis/10?d=9-to-11&a=double
                    </Anchor>
                </i>
            </p>
            <p>
                Ara ja sabem com obtenir l'avantatge de doblar. Tornem a calcular la taula d'accions
                òptimes per a cada puntuació del jugador de la mateixa manera que vam fer al capítol
                4, incloent-hi l'opció de doblar. La taula revela que, en general, doblar només val
                la pena quan el jugador té un 10 o un 11. Sembla raonable. Després de demanar una
                carta amb 10 o 11, l'acció òptima per a la majoria d'escenaris futurs és plantar-se;
                no poder demanar més cartes no ens penalitza gaire. I, com que 10 i 11 són
                puntuacions fortes amb les que demanar carta, doblar amplifica encara més els
                guanys.
            </p>
            <ResponsiveTable<[string, string, string, string, string]>
                rows={[
                    ['Mà', 'Plantar-se', 'Demanar', 'Doblar', 'Acció'],
                    ['2/12', '-43.68%', '-1.12%', '-32.54%', 'Demanar'],
                    ['...', '...', '...', '...', '...'],
                    ['9', '-43.68%', '-3.97%', '-19.64%', 'Demanar'],
                    ['10', '-43.68%', '8.56%', '14.37%', 'Doblar'],
                    ['11', '-43.68%', '14.40%', '26.05%', 'Doblar'],
                    ['12', '-43.68%', '-33.04%', '-67.20%', 'Demanar'],
                    ['...', '...', '...', '...', '...'],
                    ['20', '57.96%', '-85.90%', '-171.81%', 'Plantar-se']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/optimal/analysis?d=all">
                        https://capelski.github.io/blackjack-stats/ca/optimal/analysis?d=all
                    </Anchor>
                </i>
            </p>
            <p>
                Com afecta els guanys esperats de l'estratègia doblar? Per trobar la resposta haurem
                de modificar lleugerament els càlculs que vam fer als capítols 2 i 3. Al{' '}
                <ArticleLink articleId={ArticleId.blackjack02FinalScores}>capítol 2</ArticleLink>{' '}
                vam elaborar una llista de totes les mans possibles amb què pot acabar un jugador.
                Doblar fa que algunes de les mans d'aquesta llista acabin amb una aposta doble. Les
                mans de 8,2 i 8,3, per exemple, doblaran i acabaran amb un multiplicador d'aposta de
                2x. Cal que en prenguem nota.
            </p>
            <ResponsiveTable<[string, string, string, string]>
                rows={[
                    ['Cartes', 'Puntuació', 'Probabilitat', "Multiplicador de l'aposta"],
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
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/optimal/hands/?d=all&cf=8">
                        https://capelski.github.io/blackjack-stats/ca/optimal/hands/?d=all&cf=8
                    </Anchor>
                </i>
            </p>
            <p>
                Després vam agrupar les mans per les seves puntuacions finals. Com que ara algunes
                de les mans impliquen apostes dobles, hem de tenir en compte el multiplicador de
                l'aposta a l'hora d'agrupar-les. Tindrem un grup diferent per a cada combinació de
                puntuació final i multiplicador d'aposta. Així reflectirem les diferents maneres que
                hi ha d'arribar a cada mà final. Podem arribar a una puntuació final de 15, per
                exemple, plantant-nos amb una mà de 8,7, però també doblant amb una mà de 7,3 i
                rebent un 5. Tots dos camins produeixen una puntuació final de 15, però com que els
                pagaments són diferents, volem tractar aquestes mans finals per separat.
            </p>
            <ResponsiveTable<[string, string, string]>
                rows={[
                    ['Puntuació', "Multiplicador de l'aposta", 'Probabilitat'],
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
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/optimal/scores?d=all">
                        https://capelski.github.io/blackjack-stats/ca/optimal/scores?d=all
                    </Anchor>
                </i>
            </p>
            <p>
                Al{' '}
                <ArticleLink articleId={ArticleId.blackjack03ExpectedEarnings}>
                    capítol 3
                </ArticleLink>{' '}
                vam comparar les puntuacions finals esperades amb les puntuacions finals esperades
                del crupier i vam agrupar els escenaris per resultat. Un altre cop, alguns dels
                grups de puntuació final impliquen ara apostes dobles, així que hem de processar
                aquests grups per separat en la comparació amb el crupier.
            </p>
            <ResponsiveTable<
                [string, string, string, string, string, string, string, string, string, string]
            >
                rows={[
                    [
                        '',
                        "Multiplicador de l'aposta",
                        '17',
                        '18',
                        '19',
                        '20',
                        '21',
                        'BJ',
                        '22+',
                        'Total'
                    ],
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
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/optimal/comparisons/matrix?d=all">
                        https://capelski.github.io/blackjack-stats/ca/optimal/comparisons/matrix?d=all
                    </Anchor>
                </i>
            </p>
            <p>
                Haver aïllat els escenaris doblats ens permet calcular la seva contribució a
                l'avantatge de l'estratègia. En els escenaris on tenim una aposta doble, la variació
                del pot serà el doble de la mida de l'aposta. És a dir, el 4.54% de les vegades que
                guanyem després de doblar la mà, afegirem 2 apostes al pot. I el 3.63% de les
                vegades que perdem després de doblar la mà, restarem 2 apostes del pot. Combinant
                els avantatges de cada grup trobem l'avantatge d'una estratègia que inclou doblar.
                En aquest cas, és de -3.27%.
            </p>
            <ResponsiveTable<[string, string, string, string]>
                rows={[
                    ['Resultat', "Multiplicador de l'aposta", 'Probabilitat', 'Variació del pot'],
                    ['Victòries', '+1 aposta', '33.56%', '+33.56% aposta'],
                    ['Victòries amb blackjack', '+3/2 aposta', '4.51%', '+6.76% aposta'],
                    ['Victòries doblades', '+2 apostes', '4.54%', '+9.08% aposta'],
                    ['Empats', '+0 aposta', '8.33%', '+0 aposta'],
                    ['Derrotes', '-1 aposta', '45.43%', '-45.43% aposta'],
                    ['Derrotes doblades', '-2 apostes', '3.63%', '-7.25% aposta'],
                    ['Avantatge', '', '', '-3.27% aposta']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/optimal/results?d=all">
                        https://capelski.github.io/blackjack-stats/ca/optimal/results?d=all
                    </Anchor>
                </i>
            </p>
            <p>
                Hi ha situacions addicionals en què doblar millora els nostres guanys. Per
                identificar-les, hem de calcular l'avantatge de doblar per a cada possible carta del
                crupier. El mateix que vam fer al{' '}
                <ArticleLink articleId={ArticleId.blackjack05DealerCard}>capítol 5</ArticleLink>{' '}
                pels avantatges de plantar-se i de demanar carta. Aquestes són les accions òptimes
                per a cada carta del crupier quan el jugador pot doblar. L'estratègia es fa més
                difícil de recordar, però els guanys esperats milloren notablement: -1.17%, comparat
                amb el -2.42% que teníem sense doblar.
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
                    [
                        'Puntuació del jugador',
                        '2',
                        '3',
                        '4',
                        '5',
                        '6',
                        '7',
                        '8',
                        '9',
                        '10 - K',
                        'A'
                    ],
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
                    S = Plantar-se / H = Demanar / D = Doblar. Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/dealer/summary?d=all&dsm=compact">
                        https://capelski.github.io/blackjack-stats/ca/dealer/summary?d=all&dsm=compact
                    </Anchor>
                </i>
            </p>
            <p>
                Finalment, cal tenir en compte que alguns casinos només permeten doblar amb
                puntuacions de 9, 10 o 11. Això redueix l'avantatge de l'estratègia fins a -1.25%
                però, d'altra banda, fa l'estratègia més fàcil de recordar. Al capítol següent
                parlarem de com millorar encara més els guanys esperats dividint les parelles quan
                toqui.
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
                    [
                        'Puntuació del jugador',
                        '2',
                        '3',
                        '4',
                        '5',
                        '6',
                        '7',
                        '8',
                        '9',
                        '10 - K',
                        'A'
                    ],
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
                    S = Plantar-se / H = Demanar / D = Doblar. Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/dealer/summary?d=9-to-11&dsm=compact">
                        https://capelski.github.io/blackjack-stats/ca/dealer/summary?d=9-to-11&dsm=compact
                    </Anchor>
                </i>
            </p>
        </React.Fragment>
    )
};
