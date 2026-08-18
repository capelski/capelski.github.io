import React from 'react';
import { NavLink } from 'react-router-dom';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { ResponsiveTable } from '../responsive-table';

export const catalan: ArticleContent = {
    title: 'Blackjack 04. Accions òptimes',
    description: 'Com trobar les accions que maximitzen els teus guanys al Blackjack',
    shareSentence: 'Demanar o no demanar carta? Aquí tens la resposta definitiva pel Blackjack',
    introduction: (
        <p>
            Decidir quina és l'acció més adequada pot ser difícil en certes situacions. Alguns
            jugadors segueixen la seva intuïció i decideixen sobre la marxa. Altres observen certs
            paràmetres de la partida i els tenen en compte a l'hora de decidir. Independentment dels
            nostres mètodes, com podem estar segurs que estem prenent la decisió òptima? Com podem
            saber que estem escollint les accions que maximitzen els nostres guanys?
        </p>
    ),
    body: (
        <React.Fragment>
            <p>
                Per respondre aquestes preguntes, examinem la presa de decisions darrere d'un
                exemple trivial: escollir un menú per dinar. Quan hem de decidir entre diverses
                opcions de menjar, decidim en base a uns quants factors: les opcions disponibles a
                la carta, el seu preu, el temps que tenim, etc. I, per damunt de tot, decidim en
                base a la gana que tenim. L'objectiu final de dinar és satisfer la gana; si fem la
                tria correcta, haurem satisfet la gana al final de l'àpat.
            </p>
            <p>
                Aquest exemple trivial reflecteix uns quants aspectes de la presa de decisions. En
                primer lloc, prenem les decisions en base a un o més paràmetres d'entrada. Quan
                triem el dinar, el paràmetre d'entrada principal és la gana que tenim. En segon
                lloc, mesurem els resultats de les nostres decisions en base a un o més paràmetres
                de sortida. En l'exemple del dinar, el paràmetre de sortida principal és el nostre
                nivell de gana després de menjar. Finalment, determinem si la decisió ha estat
                encertada o no categoritzant els resultats. Si estem tips, hem pres una bona
                decisió. Si encara tenim gana, hem pres una mala decisió.
            </p>
            <p>
                Per prendre bones decisions hem d'entendre la correlació entre els paràmetres
                d'entrada i els de sortida. Com més correlacionats estiguin aquests dos conjunts de
                paràmetres, més encertades poden ser les nostres decisions. En el cas de triar el
                dinar, aquesta correlació és òbvia, perquè fem servir el mateix paràmetre per
                mesurar l'entrada i la sortida: el nivell de gana. Si en comptes d'això triés el
                plat en base a les condicions meteorològiques, la correlació desapareixeria. No
                tindria cap certesa d'haver satisfet la gana al final de l'àpat.
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack04OptimalActions}
                alt="Persona rumiant què menjar per dinar mentre mira el temps que fa a fora"
                className="image-600"
                filename="lunch-options.png"
            />
            <p>
                La presa de decisions al Blackjack no és cap excepció. L'objectiu és guanyar diners,
                així que les bones decisions seran les que maximitzin els nostres guanys. Una manera
                efectiva de mesurar els guanys esperats és l'indicador de l'avantatge que vam
                introduir al <NavLink to={ArticleId.blackjack03ExpectedEarnings}>capítol 3</NavLink>
                , així que aquest pot ser el nostre paràmetre de sortida. Per optimitzar les nostres
                decisions, voldrem basar les estratègies en paràmetres d'entrada que es
                correlacionin bé amb l'indicador de l'avantatge. Si els paràmetres d'entrada no s'hi
                correlacionen bé, no podem estar segurs que l'estratègia estigui aconseguint els
                guanys màxims. Això és justament el que passa amb les estratègies de "plantar-se amb
                X".
            </p>
            <p>
                Pot semblar que el paràmetre d'entrada de les estratègies de "plantar-se amb X" és
                la puntuació del jugador, però de fet no ho és. Les estratègies de "plantar-se amb
                X" intenten trobar l'equilibri entre el risc de passar-se de 21 i el potencial de
                millorar la puntuació de la mà. Plantegen la pregunta "Quina és la probabilitat
                màxima de passar-me de 21 que estic disposat a acceptar per intentar millorar la
                meva puntuació?". El paràmetre d'entrada en què es fixen és, en realitat, la
                probabilitat de passar-se de 21 per a la puntuació del jugador.
            </p>
            <p>
                Quan juguem, no calculem explícitament la probabilitat de passar-nos de 21 (és a
                dir, el paràmetre d'entrada) cada vegada que prenem una decisió. Aquesta informació
                no està immediatament disponible i calcular-la requereix un cert esforç. En comptes
                d'això ens basem en la puntuació del jugador (és a dir, un altre indicador), que
                conté aquesta informació de manera implícita. El paràmetre d'entrada que hi ha al
                nucli de l'estratègia, però, és la probabilitat de passar-se de 21.
            </p>
            <p>
                Fent servir el model de probabilitat independent, introduït al{' '}
                <NavLink to={ArticleId.blackjack01SolidDecisions}>capítol 1</NavLink>, podem
                expressar la probabilitat de passar-se de 21 per a una puntuació determinada com el
                nombre de cartes de 13 que fan que el jugador es passi. Escollir la probabilitat
                màxima de passar-se de 21 que estàs disposat a acceptar determina la puntuació més
                baixa amb què et plantaràs. Si estàs disposat a acceptar, per exemple, un risc del
                60% de passar-te de 21, vol dir que demanaràs carta fins a 16 (53.85% de
                probabilitat de passar-te) i et plantaràs a partir de 17 (61.54% de probabilitat de
                passar-te).
            </p>
            <ResponsiveTable<[string, string, string]>
                rows={[
                    ['Probabilitat màxima de passar-se', 'Estratègia', 'Avantatge'],
                    ['0/13 = 0%', 'Plantar-se amb 12', '-8.08%'],
                    ['4/13 = 30.77%', 'Plantar-se amb 13', '-6.82%'],
                    ['5/13 = 38.46%', 'Plantar-se amb 14', '-5.82%'],
                    ['6/13 = 46.15%', 'Plantar-se amb 15', '-5.28%'],
                    ['7/13 = 53.85%', 'Plantar-se amb 16', '-5.21%'],
                    ['8/13 = 61.54%', 'Plantar-se amb 17', '-5.67%'],
                    ['9/13 = 69.23%', 'Plantar-se amb 18', '-9.00%']
                ]}
            />
            <p>
                Al capítol 3 vam calcular l'avantatge de diverses estratègies de "plantar-se amb X"
                per esbrinar el valor de X que maximitza l'avantatge. En general, quan ens trobem
                havent de provar diferents valors d'un paràmetre d'entrada per trobar el que
                maximitza un paràmetre de sortida, sovint vol dir que no entenem la correlació entre
                tots dos o que no hi ha correlació directament.
            </p>
            <p>
                Així doncs, la probabilitat de passar-se de 21 no ens ajuda a maximitzar els guanys.
                Quins altres paràmetres d'entrada podem fer servir? Tractar les puntuacions dobles
                de manera diferent? La probabilitat que el crupier es passi de 21? Cap d'aquests
                paràmetres es correlaciona bé amb l'avantatge tampoc. Per trobar el paràmetre que
                busquem hem de fer un pas enrere i analitzar el problema des d'una altra
                perspectiva.
            </p>
            <p>
                La pregunta definitiva que volem que la nostra estratègia respongui és: "Quina de
                les accions disponibles proporciona més guanys a la llarga?". Ja que mesurem els
                guanys esperats amb l'indicador de l'avantatge i que també el fem servir com a
                paràmetre de sortida... per què no fer servir l'avantatge com a paràmetre d'entrada
                de la nostra estratègia? La correlació entre els paràmetres d'entrada i de sortida
                seria immillorable.
            </p>
            <p>
                Fer servir l'avantatge com a paràmetre d'entrada comporta un repte: hem de calcular
                l'avantatge de cada acció disponible per cada possible puntuació. És factible això?
                Comencem per la part fàcil: l'avantatge de plantar-se. Quan ens plantem, determinem
                la puntuació final de la nostra mà. Sabent la puntuació final, la podem comparar amb
                les puntuacions finals esperades del crupier de la mateixa manera que vam fer al
                capítol 3. Combinant les probabilitats de cada comparació obtenim l'avantatge
                esperat de plantar-se amb aquella puntuació. L'avantatge de plantar-se amb una
                puntuació de 20, per exemple, és de 57.96%.
            </p>
            <ResponsiveTable<[string, string, string, string]>
                rows={[
                    [
                        'Puntuació del crupier',
                        'Probabilitat',
                        'Resultat',
                        "Contribució a l'avantatge"
                    ],
                    ['17', '14.51%', 'Victòria', '14.51%'],
                    ['18', '13.95%', 'Victòria', '13.95%'],
                    ['19', '13.35%', 'Victòria', '13.35%'],
                    ['20', '18.03%', 'Empat', '0.00%'],
                    ['21', '7.27%', 'Derrota', '-7.27%'],
                    ['BJ', '4.73%', 'Derrota', '-4.73%'],
                    ['22+', '28.16%', 'Victòria', '28.16%'],
                    ['Avantatge', '', '', '57.96%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/optimal/analysis/20?a=stand">
                        https://capelski.github.io/blackjack-stats/ca/optimal/analysis/20?a=stand
                    </Anchor>
                </i>
            </p>
            <p>
                Ara la part difícil: l'avantatge de demanar carta. Igual que acabem de fer amb
                l'avantatge de plantar-se, per determinar l'avantatge de demanar carta necessitem
                saber a quines puntuacions finals ens portarà demanar carta. El repte és que demanar
                carta no determina la puntuació final de la mà. Si demanem carta amb una puntuació
                de 9 i la carta que ens toca és un 5, per exemple, la nostra puntuació passa a ser
                14. Continuarem demanant? Si és així, no podem saber la puntuació final sense saber
                quina decisió prendrem amb aquella puntuació de 14. La nostra decisió està
                condicionada per decisions futures. Que, al seu torn, poden estar condicionades per
                altres decisions futures. Això sona a un bucle infinit. Estem davant d'un dilema de
                l'ou i la gallina?
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack04OptimalActions}
                alt="Il·lustració del dilema de l'ou i la gallina en la presa de decisions"
                className="image-600"
                filename="chicken-egg-dilemma.png"
            />
            <p>
                Afortunadament, el bucle no pot durar per sempre. Tard o d'hora ens passarem de 21 o
                arribarem a 21, i no podrem demanar més cartes. Això vol dir que coneixem tots els
                escenaris futurs possibles de demanar carta amb una puntuació de 20. Amb això n'hi
                ha prou per calcular l'avantatge de demanar carta amb aquesta puntuació 💪 Ho fem
                multiplicant l'avantatge de cada escenari futur per la probabilitat d'arribar a
                aquell escenari, que és la probabilitat de treure una carta que hi porta. Finalment
                sumem tots els valors.
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
                    ['A', '1 / 13', '21', 'Plantar-se', '83.26%', '6.40%'],
                    ['2 - K', '12 / 13', '22+', 'Fi', '-100%', '-92.31%'],
                    ['Avantatge', '', '', '', '', '-85.90%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/optimal/analysis/20?a=hit">
                        https://capelski.github.io/blackjack-stats/ca/optimal/analysis/20?a=hit
                    </Anchor>
                </i>
            </p>
            <p>
                Ara podem comparar l'avantatge de les dues accions. És a dir, -85.90% de demanar
                carta contra 57.96% de plantar-se. Com que té l'avantatge més alt de tros, l'acció
                òptima és plantar-se. Això difícilment et sorprendra, perquè intuïtivament ja saps
                que demanar carta amb una puntuació de 20 és una mala idea. Ara en tenim una
                demostració matemàtica. A continuació passa una cosa interessant. En decidir
                plantar-nos amb una puntuació de 20, hem determinat totes les decisions futures
                possibles de demanar carta amb una puntuació de 19. Podem calcular l'avantatge de
                demanar carta amb una puntuació de 19 🎉
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
                    ['A', '1 / 13', '20', 'Plantar-se', '57.96%', '4.46%'],
                    ['2', '1 / 13', '21', 'Fi', '83.26%', '6.40%'],
                    ['3 - K', '11 / 13', '22+', 'Passar-se', '-100.00%', '-84.62%'],
                    ['Avantatge', '', '', '', '', '-73.75%']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/optimal/analysis/19?a=hit">
                        https://capelski.github.io/blackjack-stats/ca/optimal/analysis/19?a=hit
                    </Anchor>
                </i>
            </p>
            <p>
                Ara podem comparar aquest número amb l'avantatge de plantar-se amb 19 i determinar
                l'acció òptima per a una puntuació de 19. Això, al seu torn, determinarà totes les
                decisions futures possibles de demanar carta amb una puntuació de 18. Aquí es
                desencadena un efecte dòmino que ens permet calcular l'avantatge de demanar carta
                amb totes les puntuacions possibles fins a la més baixa. En teoria de jocs, això es
                coneix com a inducció cap enrere. Aquesta és la llista d'accions òptimes per a cada
                puntuació possible.
            </p>
            <ArticleImage
                articleId={ArticleId.blackjack04OptimalActions}
                alt="Representació de l'efecte dòmino en la inducció cap enrere"
                className="image-600"
                filename="domino-effect.png"
            />
            <ResponsiveTable<[string, string, string, string]>
                rows={[
                    ['Mà', 'Plantar-se', 'Demanar', 'Acció'],
                    ['2/12', '-43.68%', '-1.12%', 'Demanar'],
                    ['...', '...', '...', '...'],
                    ['7/17', '-29.17%', '-11.54%', 'Demanar'],
                    ['8/18', '-0.71%', '-4.97%', 'Plantar-se'],
                    ['...', '...', '...', '...'],
                    ['10/20', '57.96%', '8.56%', 'Plantar-se'],
                    ['4', '-43.68%', '-22.71%', 'Demanar'],
                    ['...', '...', '...', '...'],
                    ['14', '-43.68%', '-42.26%', 'Demanar'],
                    ['15', '-43.68%', '-46.60%', 'Plantar-se'],
                    ['...', '...', '...', '...'],
                    ['20', '57.96%', '-85.90%', 'Plantar-se']
                ]}
            />
            <p style={{ textAlign: 'center' }}>
                <i>
                    Font:{' '}
                    <Anchor url="https://capelski.github.io/blackjack-stats/ca/optimal/analysis">
                        https://capelski.github.io/blackjack-stats/ca/optimal/analysis
                    </Anchor>
                </i>
            </p>
            <p>
                Ara coneixem l'acció amb l'avantatge més alt per a cada situació possible. Escollint
                aquestes accions podem estar segurs que la nostra estratègia maximitza l'avantatge
                i, per tant, maximitza els nostres guanys. Òbviament, no calcularem l'avantatge de
                cada acció possible en viu i en directe mentre juguem. Seria un suplici. L'únic que
                hem de fer és memoritzar les accions òptimes per a cada puntuació del jugador. La
                nostra estratègia òptima en aquest punt es pot resumir com "plantar-se amb 15 i
                8/18" per recordar-la fàcilment.
            </p>
            <p>
                Són notícies agredolces. D'una banda, tenim una estratègia fàcil de recordar que
                sabem que maximitza els nostres guanys. De l'altra, l'estratègia no és gaire
                rendible. L'avantatge de l'estratègia de "plantar-se amb 15 i 8/18" és del -4.07%.
                Millor que el -5.21% de l'estratègia de "plantar-se amb 16", però encara no prou bo.
                Al capítol següent veurem com fer servir{' '}
                <NavLink to={ArticleId.blackjack05DealerCard}>la carta del crupier</NavLink> per
                millorar l'avantatge significativament.
            </p>
        </React.Fragment>
    )
};
