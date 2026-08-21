import React from 'react';
import { NavLink } from 'react-router-dom';
import { articleRoute } from '../../routes';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { ResponsiveTable } from '../responsive-table';

export const catalan: ArticleContent = {
    title: 'Blackjack 03. Guanys esperats',
    description:
        "Com predir els guanys d'un jugador de Blackjack a partir de les seves puntuacions finals esperades",
    shareSentence: 'Les teves decisions al Blackjack maximitzen els teus guanys?',
    introduction: (
        <p>
            Per sobre de tot, el Blackjack va de guanyar diners. Les nostres decisions son tant
            bones com els diners que ens fan guanyar. Per assegurar-nos que prenem les decisions
            correctes, hem d'entendre com aquestes decisions afecten els nostres guanys a la llarga.
            En aquest capítol intentarem predir els guanys que podem esperar en funció de les
            decisions que prenem.
        </p>
    ),
    body: (
        <React.Fragment>
            <p>
                Comencem amb un exemple. Imagina un jugador prudent que demana carta amb 14 o menys
                i es planta amb 15 o més, sense doblar ni dividir mai. Comença a jugar amb un pot de
                100€, apostant 10€ per ronda, i juga 100 rondes. Diguem que no té gaire sort i
                aconsegueix unes 37 victòries, 5 blackjacks, 8 empats i 50 derrotes (no són números
                aleatoris; més endavant veurem d'on surten). Al final de les 100 rondes el seu pot
                haurà variat d'aquesta manera:
            </p>
            <ResponsiveTable<[string, string, string, string]>
                headerless={true}
                rows={[
                    ['Victòries', '37', '+10€', '+370€'],
                    ['Blackjacks', '5', '+15€', '+75€'],
                    ['Empats', '8', '0€', '+0€'],
                    ['Derrotes', '50', '-10€', '-500€'],
                    ['Total', '', '', '-55€']
                ]}
            />
            <p>
                És a dir, haurà perdut 55€ al llarg de 100 rondes. Un resultat bastant decebedor. Hi
                havia alguna manera de predir aquest resultat abans de començar a jugar? Vegem fins
                a quin punt ens hi podem acostar. Coneixem l'estratègia del jugador: "plantar-se amb
                15". Amb això podem obtenir les seves puntuacions finals esperades, fent servir el
                mètode que vam descriure al{' '}
                <NavLink
                    viewTransition={true}
                    to={articleRoute.path.replace(':articleId', ArticleId.blackjack02FinalScores)}
                >
                    capítol 2
                </NavLink>
                .
            </p>
            <ResponsiveTable<[string, string]>
                rows={[
                    ['Puntuació', 'Probabilitat'],
                    ['15', '13.29%'],
                    ['16', '12.80%'],
                    ['17', '12.27%'],
                    ['18', '11.71%'],
                    ['19', '11.11%'],
                    ['20', '15.78%'],
                    ['21', '5.03%'],
                    ['BJ', '4.73%'],
                    ['22+', '13.28%']
                ]}
            />{' '}
            <p style={{ textAlign: 'center' }}>
                <i>
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/threshold/scores?t=15">
                        https://capelski.github.io/blackjack-stats/ca/threshold/scores?t=15
                    </Anchor>
                </i>
            </p>
            <p>
                Com que també coneixem les puntuacions finals esperades del crupier, podem creuar
                els dos conjunts de puntuacions finals per esbrinar amb quina freqüència el jugador
                pot esperar guanyar, empatar o perdre. Creuar les puntuacions finals consisteix a
                crear un escenari per a cada puntuació final possible del jugador i cada puntuació
                final possible del crupier. Com que cada escenari està definit per les dues
                puntuacions, podem determinar el resultat de la partida en cada escenari. Per
                exemple, quan el jugador té una puntuació de 15 i el crupier té una puntuació de 17,
                el jugador perd. Quan el jugador té una puntuació de 20 i el crupier té una
                puntuació de 18, el jugador guanya. I així successivament. Aquesta és la matriu
                d'escenaris per a l'estratègia de "plantar-se amb 15".
            </p>
            <ResponsiveTable<[string, string, string, string, string, string, string, string]>
                rows={[
                    ['', '17', '18', '19', '20', '21', 'BJ', '22+'],
                    ['15', '🔴', '🔴', '🔴', '🔴', '🔴', '🔴', '🟢'],
                    ['16', '🔴', '🔴', '🔴', '🔴', '🔴', '🔴', '🟢'],
                    ['17', '🟡', '🔴', '🔴', '🔴', '🔴', '🔴', '🟢'],
                    ['18', '🟢', '🟡', '🔴', '🔴', '🔴', '🔴', '🟢'],
                    ['19', '🟢', '🟢', '🟡', '🔴', '🔴', '🔴', '🟢'],
                    ['20', '🟢', '🟢', '🟢', '🟡', '🔴', '🔴', '🟢'],
                    ['21', '🟢', '🟢', '🟢', '🟢', '🟡', '🔴', '🟢'],
                    ['BJ', '🟢', '🟢', '🟢', '🟢', '🟢', '🟡', '🟢'],
                    ['22+', '🔴', '🔴', '🔴', '🔴', '🔴', '🔴', '🔴']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/threshold/results/matrix?t=15&mm=result">
                        https://capelski.github.io/blackjack-stats/ca/threshold/results/matrix?t=15&mm=result
                    </Anchor>
                </i>
            </p>
            <p>
                I encara n'hi ha més. Coneixem la probabilitat de cada puntuació final, tant del
                jugador com del crupier. Podem doncs calcular la probabilitat de cada escenari,
                multiplicant la probabilitat que el jugador acabi amb la puntuació X per la
                probabilitat que el crupier acabi amb la puntuació Y. Esperem que el jugador acabi
                amb una puntuació de, per exemple, 17 en el 12.27% de les partides. També esperem
                que el crupier acabi amb una puntuació de 17 en el 14.51% de les partides. Per tant,
                podem esperar que tant el jugador com el crupier empatin amb una puntuació de 17 en
                el 12.27% x 14.51% = 1.78% de les partides. Calcular la probabilitat de tots els
                escenaris genera la taula següent.
            </p>
            <ResponsiveTable<
                [string, string, string, string, string, string, string, string, string]
            >
                rows={[
                    ['', '17', '18', '19', '20', '21', 'BJ', '22+', 'Total'],
                    ['15', '1.93%', '1.85%', '1.77%', '2.40%', '0.97%', '0.63%', '3.74%', '13.29%'],
                    ['16', '1.86%', '1.79%', '1.71%', '2.31%', '0.93%', '0.61%', '3.60%', '12.80%'],
                    ['17', '1.78%', '1.71%', '1.64%', '2.21%', '0.89%', '0.58%', '3.46%', '12.27%'],
                    ['18', '1.70%', '1.63%', '1.56%', '2.11%', '0.85%', '0.55%', '3.30%', '11.71%'],
                    ['19', '1.61%', '1.55%', '1.48%', '2.00%', '0.81%', '0.53%', '3.13%', '11.11%'],
                    ['20', '2.29%', '2.20%', '2.11%', '2.85%', '1.15%', '0.75%', '4.44%', '15.78%'],
                    ['21', '0.73%', '0.70%', '0.67%', '0.91%', '0.37%', '0.24%', '1.42%', '5.03%'],
                    ['BJ', '0.69%', '0.66%', '0.63%', '0.85%', '0.34%', '0.22%', '1.33%', '4.73%'],
                    [
                        '22+',
                        '1.93%',
                        '1.85%',
                        '1.77%',
                        '2.39%',
                        '0.97%',
                        '0.63%',
                        '3.74%',
                        '13.28%'
                    ],
                    [
                        'Total',
                        '14.51%',
                        '13.95%',
                        '13.35%',
                        '18.03%',
                        '7.27%',
                        '4.73%',
                        '28.16%',
                        '100%'
                    ]
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/threshold/results/matrix?t=15">
                        https://capelski.github.io/blackjack-stats/ca/threshold/results/matrix?t=15
                    </Anchor>
                </i>
            </p>
            <p>
                <i>
                    Les probabilitats de les puntuacions finals del crupier no canvien quan
                    analitzem un subconjunt de puntuacions finals del jugador. En altres paraules,
                    si el crupier acaba amb una puntuació de 17 en el 14.51% de totes les partides,
                    també acabarà amb una puntuació de 17 en el 14.51% de les partides en què el
                    jugador té una puntuació de X. En estadística, això s'anomena invariància de
                    selecció.
                </i>
            </p>
            <p>
                Aquesta taula és bastant extensa. Anton Txékhov, un dramaturg rus, deia que si en
                una història apareix una pistola, s'ha de disparar abans que la història s'acabi.
                Podríem establir un principi semblant en estadística: si en una història apareix una
                taula, les seves dades s'han de combinar per produir un o més indicadors abans que
                la història s'acabi. En aquesta història obtindrem aquests indicadors agrupant les
                probabilitats per resultat: victòries, empats i derrotes. A més, com que les
                victòries amb blackjack es paguen millor, en farem un grup separat.
            </p>
            <ul>
                <li>Victòries = 3.74 + 3.60 + 3.46 + ... = 37.56%</li>
                <li>Victòries amb blackjack = 0.69% + 0.66% + 0.63% + ... = 4.51%</li>
                <li>Empats = 1.78% + 1.63% + 1.48% + ... = 8.33%</li>
                <li>Derrotes = 1.93% + 1.85% + 1.77% + ... = 49.60%</li>
            </ul>
            <p>
                Aquestes probabilitats agrupades comencen a dibuixar un retrat de l'estratègia de
                "plantar-se amb 15". Un retrat que ens diu, per exemple, que el jugador prudent perd
                més sovint del que guanya. El retrat no explica, però, com aquest nombre més alt de
                derrotes afecta els nostres guanys al llarg del temps. Com que el que ens interessa
                són els guanys, voldrem traduir cada resultat a guanys. Una manera pràctica de
                fer-ho és expressar els guanys de cada resultat en termes de variació del pot:
            </p>
            <ul>
                <li>Les victòries incrementen el pot en l'import apostat. +1 aposta</li>
                <li>
                    Les victòries amb blackjack incrementen el pot en 3/2 vegades l'import apostat.
                    +3/2 apostes
                </li>
                <li>Els empats no afecten el pot. +0 apostes</li>
                <li>Les derrotes redueixen el pot en l'import apostat. -1 aposta</li>
            </ul>
            <p>
                Sabem amb quina freqüència esperem obtenir cada resultat i sabem com cada resultat
                afecta el nostre pot. Podem combinar aquestes dues informacions per calcular la
                variació esperada del pot a la llarga. Per fer-ho, farem servir una aposta de mida
                fixa, així podem equiparar victòries i derrotes. Si canviéssim la mida de l'aposta a
                mesura que avança la partida ja no ho podríem fer. El número resultant és un
                indicador excel·lent dels guanys esperats que proporciona una estratègia, i sovint
                s'anomena <b>avantatge</b> en la comunitat del Blackjack.
            </p>
            <ResponsiveTable<[string, string, string, string]>
                headerless={true}
                rows={[
                    ['Victòries', '37.56%', '+1 aposta', '+37.56% apostes'],
                    ['Victòries amb blackjack', '4.51%', '+3/2 apostes', '+6.77% apostes'],
                    ['Empats', '8.33%', '+0 apostes', '+0 apostes'],
                    ['Derrotes', '49.60%', '-1 aposta', '-49.60% apostes'],
                    ['Avantatge', '', '', '-5.27% apostes']
                ]}
            />
            <p>
                L'avantatge ens diu quin percentatge de la nostra aposta podem esperar guanyar o
                perdre per ronda de mitjana. Si l'avantatge és negatiu, el joc afavoreix el crupier
                i podem esperar perdre diners a la llarga. Al contrari, si l'avantatge és positiu,
                el joc afavoreix el jugador i podem esperar guanyar diners. L'avantatge de
                l'estratègia de "plantar-se amb 15" ens diu que, de mitjana, podem esperar que el
                nostre pot es redueixi un 5.27% de l'import apostat per ronda.
            </p>
            <p>
                <i>
                    Valors d'avantatge negatius ens donen una idea de quantes rondes podem esperar
                    jugar abans de quedar-nos sense diners. Donat el pot inicial expressat en termes
                    d'apostes, podem esbrinar quant tarda el pot a arribar a 0. Si comencem a jugar
                    amb un pot de, per exemple, 10 apostes i sabem que perdem el 5.27% de l'import
                    apostat per ronda, podem esperar quedar-nos sense diners després de 10 apostes /
                    0.0527 apostes per ronda = 189.7 rondes.
                </i>
            </p>
            <p>
                L'indicador de l'avantatge ens ajuda a predir quants diners guanyarem o perdrem a la
                llarga. Tornem a l'exemple del jugador prudent. Sabem que pot esperar perdre, de
                mitjana, el 5.27% de la seva aposta cada ronda. Com que aposta 10€ per ronda, això
                vol dir perdre 0.527€ per ronda. Després de 100 rondes, pot esperar haver perdut
                52.7€. El jugador ha perdut 55€ en l'exemple anterior, així que la predicció és
                força encertada!
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack03ExpectedEarnings}
                alt="Diana amb un dard al centre, representant la precisió de la predicció dels guanys"
                width={300}
                filename="bullseye.png"
            />
            <p>
                Això no és cap casualitat, evidentment. He triat convenientment el nombre de
                victòries, derrotes i empats perquè quedin molt a prop de les probabilitats
                esperades. 37.56% de victòries ={'>'} 37 victòries, 4.51% de victòries amb blackjack
                ={'>'} 5 blackjacks, etc. Si el jugador guanya més rondes, els resultats reals
                s'allunyaran de la predicció. Si el jugador guanya menys rondes, els resultats reals
                s'allunyaran de la predicció de la mateixa manera. Com que, a la llarga, les
                probabilitats esperades tendeixen a complir-se, podem assumir que els números que he
                fet servir no estan gaire lluny dels resultats reals.
            </p>
            <p>
                Finalment, l'indicador de l'avantatge ens permet comparar estratègies diferents.
                Aquests són els indicadors de diverses estratègies de "plantar-se amb X".
                L'estratègia de "plantar-se amb 16" és la que té el valor d'avantatge més alt i és,
                per tant, la més rendible de totes. Al capítol següent farem servir l'indicador de
                l'avantatge per esbrinar les{' '}
                <NavLink
                    viewTransition={true}
                    to={articleRoute.path.replace(
                        ':articleId',
                        ArticleId.blackjack04OptimalActions
                    )}
                >
                    accions òptimes
                </NavLink>{' '}
                que maximitzen els guanys per a cada puntuació possible.
            </p>
            <ResponsiveTable<[string, string]>
                rows={[
                    ['Estratègia', 'Avantatge'],
                    ['Plantar-se amb 12', '-8.08%'],
                    ['Plantar-se amb 13', '-6.82%'],
                    ['Plantar-se amb 14', '-5.82%'],
                    ['Plantar-se amb 15', '-5.28%'],
                    ['Plantar-se amb 16', '-5.21%'],
                    ['Plantar-se amb 17', '-5.67%'],
                    ['Plantar-se amb 18', '-9.00%']
                ]}
            />
            <ArticleImage
                articleId={ArticleId.blackjack03ExpectedEarnings}
                alt="Gràfic amb els valors d'avantatge de diverses estratègies 'plantar-se amb X' en funció dels valors de X"
                width={600}
                filename="stand-score-vs-edge.png"
            />
        </React.Fragment>
    )
};
