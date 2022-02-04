import React from 'react';
import { ArticleContent } from '../article-data';

export const catalan: ArticleContent = {
    title: 'Provinença desconeguda',
    description: "Relat curt presentat al concurs de Sant Jordi de TMB de l'any 2020",
    introduction: (
        <p>
            Encara és petita per trobar la resposta però, un cop s'ha formulat la pregunta, ja no ha
            pogut deixar de pensar-hi. L'Elisabet té vuit anys i la seva experiència amb el metro de
            Barcelona es limita a les parades del trajecte que fa cada dia amb el seu pare de camí a
            l'escola. Agafen la línia groga a la parada de Bogatell i baixen a Poblenou per arribar
            caminant fins a Les Acàcies.
        </p>
    ),
    body: (
        <React.Fragment>
            <p>
                Avui se li ha despertat el dubte de casualitat, perquè ella i el seu pare s'han
                hagut d'esperar a l'andana una mica més del que és habitual. Mentre els ulls de
                l'Elisabet escodrinyaven cadascun del racons de l'estació amb la mirada, s'ha adonat
                que els vagons de tren que circulen per les vies inclouen una discreta incògnita:
                són massa voluminosos per haver passat per les escales que ella puja i baixa cada
                matí.
            </p>
            <p>
                Els túnels no tenen cap misteri. Ella mateixa n'havia excavat algun de menut, un
                parell de cursos enrere. Els vagons de tren en canvi han aconseguit desconcertar-la.
                Fins i tot per a ella, és evident que els vagons els han construït persones. El que
                no està tan clar és com els han pogut transportar fins a dins dels túnels. Si són
                massa grans per travessar els passadissos i escales de les estacions, deu voler dir
                que els han construït directament a dins. Però... on, exactament?
            </p>
            <p>
                Decideix esbrinar alguna cosa més pel seu compte abans de demanar ajuda al seu pare.
                El cert és que aquesta no és de la mena de preguntes que solen interessar al seu
                pare. Si la resposta no afecta les qüestions pràctiques del seu dia a dia, acostuma
                a perdre-hi l'interès ràpidament. Tanmateix, ella no aconsegueix oblidar-les tan
                fàcilment, les preguntes. Tan bon punt s'adona que desconeix algun aspecte que li ha
                passat per alt, se li desperta la inesgotable necessitat de descobrir-ne el com i el
                perquè.
            </p>
            <p>
                Durant el trajecte en metro hi rumia distretament. El seu cervell va donant forma a
                la idea que li sembla més plausible: una gegantina fàbrica de vagons soterrada en
                algun punt del subsol de Barcelona. Deuen saber on és, els ratolins que corren
                atrafegats pels costats de les vies? En són conscients la resta de passatgers
                capficats que van i venen per les andanes? Encara trigarà uns quants anys a
                descobrir els ets i uts de la xarxa de transports metropolitans, però avui, abans
                d'arribar a l'escola, l'Elisabet decideix que quan sigui gran arribarà a ser la
                directora de la misteriosa fàbrica de vagons de tren.
            </p>
        </React.Fragment>
    )
};
