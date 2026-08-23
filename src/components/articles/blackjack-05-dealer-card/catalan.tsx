import React from 'react';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { ArticleLink } from '../article-link';
import { ResponsiveTable } from '../responsive-table';

export const catalan: ArticleContent = {
    title: 'Blackjack 05. La carta del crupier',
    description:
        'Com aprofitar la carta del crupier per millorar els guanys de la teva estratègia al Blackjack',
    shareSentence: 'Demanar carta amb un 16? Només contra certes cartes del crupier',
    introduction: (
        <p>
            En capítols anteriors d'aquesta saga hem aplicat uns quants mètodes matemàtics per
            millorar les nostres decisions al Blackjack. Puntuacions finals esperades, guanys
            esperats i accions òptimes. Bons fonaments i, tot i així, encara no guanyem diners al
            final del dia. Per millorar els nostres guanys haurem de fer les coses d'una altra
            manera. Considerar informació addicional... però quina informació podria ser aquesta?
        </p>
    ),
    body: (
        <React.Fragment>
            <p>
                Fins ara hem estat parant molta atenció a la informació disponible al nostre costat
                de la taula, la puntuació del jugador. Resulta que la informació de l'altre costat
                de la taula, la carta del crupier, també és valuosa. Tenir en compte la carta del
                crupier ens ajudarà a detectar situacions en què podem guanyar més diners introduint
                excepcions a la nostra estratègia.
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack05DealerCard}
                alt="Crupier de Blackjack amb la carta desconeguda"
                width={600}
                filename="dealer-card-unknown.png"
            />
            <p>
                Al <ArticleLink articleId={ArticleId.blackjack02FinalScores}>capítol 2</ArticleLink>{' '}
                vam fer servir l'estratègia del crupier per elaborar una llista de totes les mans
                possibles amb què el crupier pot acabar la partida. Després vam fer servir aquesta
                llista per esbrinar amb quina freqüència podem esperar que el crupier acabi amb una
                puntuació determinada. Aquesta informació és precisa des d'un punt de vista global,
                però deixa de banda un factor clau. Conèixer la primera carta del crupier descarta
                un bon nombre de mans finals possibles de la llista.
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
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/threshold/hands">
                        https://capelski.github.io/blackjack-stats/ca/threshold/hands
                    </Anchor>
                </i>
            </p>
            <p>
                Fixem-nos en la primera mà final de la llista, per exemple: A, A, A, A, A, A, A.
                Aquesta mà només és possible si la primera carta del crupier és un A. Si la primera
                carta del crupier és qualsevol altra, el crupier no pot arribar a aquesta mà final.
                Podem obtenir probabilitats de puntuació final més precises excloent aquesta mà
                final de la llista quan la primera carta del crupier no és un A.
            </p>
            <p>
                El mateix passa amb cada mà final de la llista. Si només tenim en compte les mans
                finals que són possibles donada la primera carta del crupier, obtindrem
                probabilitats més precises. Per fer-ho, hem de dividir la llista de mans finals en
                grups, un per cada possible primera carta. Així queden les probabilitats finals del
                crupier quan dividim la llista. Podem veure, per exemple, que la probabilitat que el
                crupier aconsegueixi un blackjack és nul·la quan la primera carta no és ni un A ni
                un 10.
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
                        'Puntuació del crupier',
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
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/dealer/scores?dcm=absolute">
                        https://capelski.github.io/blackjack-stats/ca/dealer/scores?dcm=absolute
                    </Anchor>
                </i>
            </p>
            <p>
                Els números de la taula anterior reflecteixen les probabilitats globals. Un cop el
                crupier té la seva carta repartida, les probabilitats globals ja no ens interessen.
                Si la carta del crupier és un 2, per exemple, la probabilitat que el crupier es
                passi de 21 és del 2.72%, però no sobre el 100% dels casos, sino sobre el 7.69% de
                probabilitat total de la columna. 2.72% / 7.69% = 35.36%. El crupier es passarà de
                21 el 35.36% de les vegades que la seva carta sigui un 2. Així queda la taula quan
                ajustem les probabilitats perquè cada columna sumi 100%.
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
                        'Puntuació del crupier',
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
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/dealer/scores">
                        https://capelski.github.io/blackjack-stats/ca/dealer/scores
                    </Anchor>
                </i>
            </p>
            <p>
                Ara els números tenen més sentit. Podem veure més clarament que, per exemple, la
                probabilitat que el crupier es passi de 21 és gairebé quatre vegades més alta quan
                la carta del crupier és un 6 que quan és un A. Quatre vegades més alta! És una
                diferència enorme. Segur que això canvia les coses a l'hora de calcular els
                avantatges de les accions.
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack05DealerCard}
                alt="Crupier de Blackjack amb un 6 com a carta"
                width={600}
                filename="dealer-card-6.png"
            />
            <p>
                Al{' '}
                <ArticleLink articleId={ArticleId.blackjack04OptimalActions}>capítol 4</ArticleLink>{' '}
                vam calcular l'avantatge de cada acció per a qualsevol puntuació del jugador.
                Recordem ràpidament com funciona el càlcul. L'avantatge de demanar carta surt de
                ponderar els escenaris futurs als quals arribarem demanant una altra carta,
                començant per la puntuació més alta del jugador i anant cap enrere. L'avantatge de
                plantar-se surt de comparar la puntuació del jugador amb les puntuacions finals
                esperades del crupier. En aquesta comparació vam fer servir les puntuacions finals
                esperades globals del crupier. Per a una mà de 14 punts, per exemple, l'avantatge de
                demanar carta és del -43.68%, mentre que l'avantatge de plantar-se és del -42.26%.
            </p>
            <p>
                Vegem com canvien aquests avantatges quan la carta del crupier és un 6, per exemple.
                Per calcular l'avantatge de plantar-se, ara farem servir les puntuacions finals
                esperades quan el crupier té un 6. L'avantatge de plantar-se millora de manera
                natural perquè és més probable que el crupier es passi de 21.
            </p>
            <ResponsiveTable<[string, string, string, string]>
                rows={[
                    [
                        'Puntuació del crupier',
                        'Probabilitat',
                        'Resultat',
                        "Contribució a l'avantatge"
                    ],
                    ['17', '16.54%', 'Derrota', '-16.54%'],
                    ['18', '10.63%', 'Derrota', '-10.63%'],
                    ['19', '10.63%', 'Derrota', '-10.63%'],
                    ['20', '10.17%', 'Derrota', '-10.17%'],
                    ['21', '9.72%', 'Derrota', '-9.72%'],
                    ['22+', '42.32%', 'Victòria', '42.32%'],
                    ['Avantatge', '', '', '-15.37%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/dealer/breakdown/6/analysis/14/?a=stand">
                        https://capelski.github.io/blackjack-stats/ca/dealer/breakdown/6/analysis/14/?a=stand
                    </Anchor>
                </i>
            </p>
            <p>
                L'avantatge de demanar carta també canvia. L'acció òptima per a les puntuacions de
                15 en endavant continua sent la mateixa davant d'un 6 del crupier: plantar-se.
                Demanar carta porta per tant als mateixos escenaris futurs, però cadascun d'aquests
                escenaris té millors avantatges davant d'un 6 del crupier. Degut també al fet que el
                crupier té més probabilitats de passar-se de 21. Combinant els avantatges de tots
                els escenaris futurs, trobem que l'avantatge de demanar carta augmenta fins al
                -30.07%
            </p>
            <ResponsiveTable<[string, string, string, string, string, string]>
                rows={[
                    [
                        'Carta següent',
                        'Probabilitat',
                        'Puntuació següent',
                        'Acció',
                        'Avantatge',
                        "Contribució a l'avantatge"
                    ],
                    ['A', '1 / 13', '15', 'Plantar-se', '-15.37%', '-1.18%'],
                    ['2', '1 / 13', '16', 'Plantar-se', '-15.37%', '-1.18%'],
                    ['3', '1 / 13', '17', 'Plantar-se', '1.17%', '0.09%'],
                    ['4', '1 / 13', '18', 'Plantar-se', '28.34%', '2.18%'],
                    ['5', '1 / 13', '19', 'Plantar-se', '49.60%', '3.82%'],
                    ['6', '1 / 13', '20', 'Plantar-se', '70.40%', '5.42%'],
                    ['7', '1 / 13', '21', 'Fi', '90.28%', '6.94%'],
                    ['8 - K', '6 / 13', '22+', 'Passar-se', '-100.00%', '-46.15%'],
                    ['Avantatge', '', '', '', '', '-30.07%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/dealer/breakdown/6/analysis/14/?a=hit">
                        https://capelski.github.io/blackjack-stats/ca/dealer/breakdown/6/analysis/14/?a=hit
                    </Anchor>
                </i>
            </p>
            <p>
                Tots dos avantatges han millorat significativament, però el més important és que ara
                plantar-se és molt més rendible que demanar carta. Encara podem esperar perdre
                diners, ja que 14 és una mala puntuació al capdavall, però, quan el crupier té un 6,
                en perdrem menys plantant-nos.
            </p>
            <ResponsiveTable<[string, string, string]>
                rows={[
                    ['Acció', 'Avantatge global', 'Avantatge contra un 6 del crupier'],
                    ['Plantar-se', '-42.26%', '-15.37%'],
                    ['Demanar', '-43.68%', '-30.07%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>Avantatges per a una mà de 14 punts</i>
            </p>
            <p>
                Una cosa semblant passa quan ens fixem en les mans de 16 punts. Basant el càlcul en
                les puntuacions finals esperades globals del crupier, els avantatges de plantar-se i
                de demanar carta són del -43.68% i del -50.93% respectivament. Plantar-se és l'acció
                òptima. Quan la carta del crupier és un A, però, és menys probable que el crupier es
                passi de 21. Els avantatges són del -76.94% i del -66.57% quan el crupier té un A,
                cosa que decanta la balança a favor de demanar carta. Encara pots esperar perdre
                diners amb una mà de 16 punts contra un A del crupier, però demanar carta farà que
                en perdis una mica menys.
            </p>
            <ResponsiveTable<[string, string, string]>
                rows={[
                    ['Acció', 'Avantatge global', 'Avantatge contra un A del crupier'],
                    ['Plantar-se', '-43.68%', '-76.94%'],
                    ['Demanar', '-50.93%', '-66.57%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>Avantatges per a una mà de 16 punts</i>
            </p>
            <p>
                Aquest principi afecta totes les puntuacions del jugador: la carta del crupier pot
                canviar l'acció òptima. Tornant a calcular les accions òptimes per cada puntuació i
                cada carta possible del crupier trobem la taula següent. És bastant semblant a les
                accions òptimes de l'estratègia de "plantar-se amb 15 i 8/18", però amb unes quantes
                excepcions per aprofitar debilitats concretes del crupier.
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
                    ['4 - 11', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
                    ['12', 'H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
                    ['13 - 16', 'S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
                    ['17 - 20', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    S = Plantar-se / H = Demanar. Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/dealer/summary?dsm=compact">
                        https://capelski.github.io/blackjack-stats/ca/dealer/summary?dsm=compact
                    </Anchor>
                </i>
            </p>
            <p>
                Aquesta és la base de l'anomenada Estratègia Bàsica que fan servir la majoria de
                jugadors de Blackjack de tot el món. A la pràctica, vol dir tenir estratègies
                diferents per a diferents cartes del crupier. Requereix recordar una varietat de
                casos més gran, però l'augment de complexitat queda justificat de sobres per
                l'augment dels guanys esperats. Amb aquests ajustaments, hem aconseguit millorar els
                guanys esperats de la nostra estratègia fins a un espectacular -2.42%! Al capítol
                següent analitzarem com doblar i dividir en els moments adequats ens pot ajudar a
                millorar els guanys esperats encara més.
            </p>
        </React.Fragment>
    )
};
