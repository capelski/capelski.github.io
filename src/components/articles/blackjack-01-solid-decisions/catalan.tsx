import React from 'react';
import { NavLink } from 'react-router-dom';
import { articleRoute } from '../../routes';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { ResponsiveTable } from '../responsive-table';

export const catalan: ArticleContent = {
    title: 'Blackjack 01. Decisions sòlides',
    description: "Com l'estadística ens ajuda a prendre decisions sòlides al Blackjack",
    shareSentence: "L'estadística és la teva millor amiga per pendre bones decisions al Blackjack",
    introduction: (
        <p>
            Imagina jugar al Blackjack amb la pila de cartes destapada. Sabries en tot moment quina
            carta ve a continuació i no et passaries mai de 21. Continuaries demanant carta mentre
            afegir la següent carta a la teva mà mantingués la puntuació per sota de 22. No
            guanyaries totes les mans, però les teves probabilitats de guanyar diners a la llarga es
            dispararien.
        </p>
    ),
    body: (
        <React.Fragment>
            <p>
                Imagina que tens un 15. Si la carta següent és un 3, demanaràs carta i el
                convertiràs en un 18. Si en canvi la carta següent és un 8, demanar carta et faria
                passar de 21: et plantaràs i esperaràs que el crupier es passi. En tots dos casos,
                el crupier pot acabar amb una puntuació més alta que la teva, però tenir la
                informació sobre la carta següent simplifica la presa de decisions perquè ja no
                t'has de preocupar de passar-te de 21.
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack01SolidDecisions}
                className="image-600"
                filename="sample-15-upcoming-3.png"
                footer="Exemple de mà de 15 punts amb un 3 com a carta següent"
            />
            <ArticleImage
                articleId={ArticleId.blackjack01SolidDecisions}
                className="image-600"
                filename="sample-15-upcoming-8.png"
                footer="Exemple de mà de 15 punts amb un 8 com a carta següent"
            />
            <p>
                Per desgràcia, no hi ha gaires casinos disposats a donar-te tant avantatge. De fet,
                els casinos volen que et passis de 21. Quan tant tu com el crupier us passeu de 21,
                el casino es queda els teus diners abans fins i tot que el crupier jugui la seva mà.
                Això és el que fa que el joc sigui rendible per a la banca. En un joc just, que tots
                dos jugadors quedin eliminats hauria de ser un empat, oi? Al joc del Blackjack no
                funciona així. Els casinos volen la certesa que guanyaran diners a final de dia i un
                joc perfectament just no ofereix aquesta certesa.
            </p>
            <p>
                <i>
                    Per si t'ho preguntes, l'escenari en què tant el crupier com el jugador es
                    passen de 21 passa més sovint del que et pensaries. Aproximadament 1 de cada 13
                    mans per a un jugador que copia l'estratègia de la banca (el nombre exacte depèn
                    de les decisions del jugador). En capítols posteriors d'aquesta saga veurem d'on
                    surten aquests números.
                </i>
            </p>
            <p>
                Els casinos mantenen la pila de cartes tapada, així que no tenim ni idea de quina és
                la carta següent i ens veiem obligats a prendre decisions difícils. En aquestes
                condicions, com podem estar segurs que les nostres decisions són sòlides? Aquesta
                pregunta fa anys que ronda. Molta gent llesta hi ha pensat i ha arribat a solucions
                diferents. Edward O. Thorp, per exemple, va idear una solució molt popular el 1962:
                el comptatge de cartes.
            </p>
            <h4>El comptatge de cartes</h4>
            <p>
                La idea consisteix a fer un seguiment de les cartes que s'han repartit fins al
                moment per determinar quines cartes queden a la baralla. Recordar totes i cadascuna
                de les cartes repartides és difícil, així que els sistemes de comptatge de cartes
                divideixen les cartes en categories i assignen un valor a cada categoria. Els
                jugadors mantenen un comptador mental dels valors de les cartes repartides i no
                necessiten memoritzar les cartes exactes que han sortit.
            </p>
            <p>
                El sistema més popular per comptar cartes és el sistema Hi-Lo, que divideix les
                cartes en tres categories. Cartes baixes (2, 3, 4, 5, 6), cartes altes (10, J, Q, K,
                A) i cartes neutres (7, 8, 9). Les cartes baixes sumen 1 al comptador, les cartes
                altes en resten 1 i les cartes neutres no l'afecten.
            </p>
            <p>
                Quan el valor del comptador és positiu, indica que queda una proporció més alta de
                cartes altes a la baralla, cosa que és favorable per al jugador. Al contrari, un
                valor del comptador negatiu suggereix una proporció més alta de cartes baixes,
                favorable per el crupier. No és un sistema perfecte però dona al jugador un
                avantatge sobre la banca.
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack01SolidDecisions}
                className="image-600"
                filename="card-counting.png"
                footer="Exemple de compte de cartes"
            />
            <p>
                Molta gent ha guanyat quantitats de diners considerables comptant cartes:{' '}
                <Anchor url="https://www.imdb.com/title/tt0478087/">21 Blackjack</Anchor> és una
                gran pel·lícula per somiar desperts en fer-se ric comptant cartes. Malauradament,
                comptar cartes requereix de certa habilitat per part del jugador i els casinos poden
                prendre mesures per prevenir-ho (per exemple, barrejar les cartes repartides amb la
                pila al final de cada partida). A la pràctica no ens en podem fiar. Quines altres
                opcions tenim?
            </p>
            <h4>Anàlisi empírica</h4>
            <p>
                Fem un experiment senzill. Prepara una mà de 15 punts, reparteix una carta i apunta
                tant la carta repartida com la puntuació resultant. Després torna a agafar la carta
                repartida i barreja-la a la baralla. Repeteix-ho un gran nombre de vegades i
                acabaràs amb una llista semblant a la següent.
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack01SolidDecisions}
                className="image-600"
                filename="sample-15-upcoming-unknown.png"
                footer="Exemple de mà de 15 punts sense conèixer la carta següent"
            />
            <ResponsiveTable<[string, string]>
                rows={[
                    ['Carta següent', 'Puntuació resultant'],
                    ['8', '23'],
                    ['J', '25'],
                    ['4', '19'],
                    ['6', '21'],
                    ['A', '16'],
                    ['...', '...']
                ]}
            />
            <p>
                Després de repetir l'experiment moltes vegades, agrupa cada fila de la llista
                anterior per la puntuació resultant i obtindràs el nombre de vegades que hem acabat
                amb cada puntuació. Aquest és l'aspecte de la llista agrupada després de repetir
                l'experiment 100 vegades. Els teus resultats poden variar lleugerament però la
                distribució global no hauria de ser gaire diferent.
            </p>
            <ResponsiveTable<[string, string, string]>
                rows={[
                    ['Carta següent', 'Puntuació resultant', 'Ocurrències'],
                    ['A', '16', '9'],
                    ['2', '17', '8'],
                    ['3', '18', '7'],
                    ['4', '19', '5'],
                    ['5', '20', '8'],
                    ['6', '21', '7'],
                    ['10 - K', '22+', '56']
                ]}
            />
            <p>
                Aquesta taula no ens diu quina serà la carta següent però ens dona una bona idea de
                què és probable que passi en aquesta situació. 56 de cada 100 vegades acabarem amb
                una puntuació de 22 o més i perdrem la partida immediatament. I 9 de cada 100
                vegades acabarem amb una puntuació de 16, insuficient per guanyar el crupier. En
                altres paraules, demanar carta amb un 15 portarà a un mal resultat en 56 + 9 = 65 de
                cada 100 vegades. Seguim sense saber quina serà la carta següent però, en absència
                d'informació addicional, demanar carta sembla una jugada arriscada.
            </p>
            <ArticleImage
                alt="Exemple de mà de 15 a punt de passar-se de 21"
                articleId={ArticleId.blackjack01SolidDecisions}
                className="image-600"
                filename="sample-15-upcoming-bust.png"
            />
            <p>
                Aquest enfocament empíric és perfectament vàlid però té algunes limitacions. D'una
                banda, fem servir només una baralla en lloc de les 6-8 baralles que fan servir els
                casinos. I la manera com barregem les cartes és probablement diferent de com ho fan
                els crupiers o les dispensadores electròniques. Aquestes variacions poden semblar
                irrellevants però poden provocar diferències significatives a la llarga.
            </p>
            <p>
                D'altra banda, els resultats només seran precisos si repetim l'experiment un gran
                nombre de vegades. Si repetim l'experiment 100 vegades podríem obtenir una
                distribució de cartes poc probable que no seria representativa dels resultats a la
                llarga. Per anul·lar la possibilitat de distribucions improbables, hauríem de
                repetir l'experiment moltes més vegades. Factible, però lent.
            </p>
            <h4>Anàlisi estadística</h4>
            <p>
                Afortunadament hi ha una manera més pràctica de calcular la taula anterior. Una que
                no es veu afectada per la forma com barregem les cartes ni pel nombre de vegades que
                repetim els experiments. Sabem que cada baralla conté 52 cartes, agrupades en 4
                conjunts idèntics de 13 cartes. Dividint el nombre de cartes amb el mateix símbol
                entre el nombre total de cartes, trobem la probabilitat de treure una carta amb
                aquell símbol. Hi ha 4 asos en una baralla de 52 cartes, per tant podem esperar
                treure un as 4 de cada 52 vegades. Expressat en percentatge, això és 4/52 = 1/13 =
                0.0769 = <b>7.69%</b>.
            </p>
            <p>
                I així és com acabem arribant a la probabilitat i l'estadística. Dues disciplines
                bastant impopulars però molt útils a l'hora d'analitzar el Blackjack. D'aquí en
                endavant farem servir alguns metodes estadístics per analitzar el joc. Tanmateix,
                conscient de les reticències que generen, en farem servir el mínim imprescindible.
                Com va dir Antoine de Saint-Exupéry: "La perfecció s'assoleix no quan ja no hi ha
                res més a afegir, sinó quan ja no hi ha res per treure".
            </p>
            <p>Hi ha dues maneres diferents de calcular la taula de dalt amb estadística:</p>
            <ul>
                <li>
                    <p>
                        <b>Ignorant</b> les cartes que ja s'han repartit. Els resultats són menys
                        precisos però el càlcul és més senzill i no depèn del nombre de baralles que
                        fa servir el casino. Quan fem servir aquesta opció assumim que hi ha un flux
                        infinit de cartes i que la probabilitat de treure una carta sempre es manté
                        igual. A la realitat no és així però és una aproximació prou bona per als
                        nostres propòsits.
                    </p>
                    <p>
                        Aquesta opció s'anomena model de <b>probabilitat independent</b>. Aquestes
                        són les probabilitats de treure cada carta següent per a una mà de 10,5:
                    </p>
                    <ResponsiveTable<[string, string, string, string]>
                        rows={[
                            ['Carta següent', 'Puntuació resultant', 'Cartes', 'Probabilitat'],
                            ['A', '16', '4/52', '7.69%'],
                            ['2', '17', '4/52', '7.69%'],
                            ['3', '18', '4/52', '7.69%'],
                            ['4', '19', '4/52', '7.69%'],
                            ['5', '20', '4/52', '7.69%'],
                            ['6', '21', '4/52', '7.69%'],
                            ['10 - K', '22+', '28/52', '53.85%']
                        ]}
                    />
                </li>
                <li>
                    <p>
                        <b>Considerant</b> les cartes que ja s'han repartit. Els resultats són més
                        precisos però el càlcul és més complex i depèn del nombre de baralles que fa
                        servir el casino. Quan fem servir aquesta opció hem d'ajustar les
                        probabilities per excloure les cartes que ja s'han repartit.
                    </p>
                    <p>
                        A l'exemple anterior, ja s'han repartit un 10 i un 5. Això vol dir que només
                        queden 3 cartes de 10 i 3 cartes de 5 a la baralla. També vol dir que queden
                        50 cartes a la baralla en lloc de 52. Per tant, la probabilitat de treure un
                        10 o un 5 no és 4/52 sinó 3/50. De la mateixa manera, la probabilitat de
                        treure qualsevol altra carta, per exemple un as, és 4/50.
                    </p>
                    <p>
                        Aquesta opció s'anomena model de <b>probabilitat dependent</b>. Aquestes són
                        les probabilitats de treure cada carta següent per a una mà de 10,5:
                    </p>
                    <ResponsiveTable<[string, string, string, string]>
                        rows={[
                            ['Carta següent', 'Puntuació resultant', 'Cartes', 'Probabilitat'],
                            ['A', '16', '4/50', '8%'],
                            ['2', '17', '4/50', '8%'],
                            ['3', '18', '4/50', '8%'],
                            ['4', '19', '4/50', '8%'],
                            ['5', '20', '3/50', '6%'],
                            ['6', '21', '4/50', '8%'],
                            ['10 - K', '22+', '27/50', '54%']
                        ]}
                    />
                    <p>
                        Les probabilitats són més precises. I encara ho són més si considerem{' '}
                        <b>8 baralles</b> en lloc d'una:
                    </p>
                    <ResponsiveTable<[string, string, string, string]>
                        rows={[
                            ['Carta següent', 'Puntuació resultant', 'Cartes', 'Probabilitat'],
                            ['A', '16', '32/414', '7.73%'],
                            ['2', '17', '32/414', '7.73%'],
                            ['3', '18', '32/414', '7.73%'],
                            ['4', '19', '32/414', '7.73%'],
                            ['5', '20', '31/414', '7.49%'],
                            ['6', '21', '32/414', '7.73%'],
                            ['10 - K', '22+', '223/414', '53.86%']
                        ]}
                    />
                </li>
            </ul>
            <p>
                Com pots veure, la diferència de probabilitats entre els dos models quan es fan
                servir 8 baralles és ridículament petita. Com que el model de probabilitat dependent
                és més complex i no ens aporta un guany significatiu, faré servir el model de
                probabilitat independent en els capítols següents d'aquesta sèrie.
            </p>
            <p>
                Així és com la probabilitat i l'estadística ens ajuden a prendre decisions sòlides
                al Blackjack. Ara que hem establert els fonaments podem atacar tasques més
                interessants, com per exemple,{' '}
                <NavLink
                    to={articleRoute.path.replace(':articleId', ArticleId.blackjack02FinalScores)}
                >
                    predir la puntuació final
                </NavLink>
                . Repassem els punts clau fins ara:
            </p>
            <ul>
                <li>Prendre decisions és difícil perquè hem d'intuir la carta següent</li>
                <li>
                    Fer seguiment de les cartes que s'han repartit ens pot ajudar a endevinar la
                    carta següent però és difícil
                </li>
                <li>
                    Les simulacions ens donen una idea de quina pot ser la carta següent, però tenen
                    limitacions
                </li>
                <li>
                    L'estadística ens dona una idea de quina pot ser la carta següent sense
                    necessitat de fer simulacions. Els números no són perfectes però són prou
                    exactes
                </li>
            </ul>
        </React.Fragment>
    )
};
