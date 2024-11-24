import React from 'react';
import ReactGist from 'react-gist';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { BlockSnippet } from '../block-snippet';
import { InlineSnippet } from '../inline-snippet';

export const english: ArticleContent = {
    title: 'A minimalistic approach to transparently translating your application',
    description: 'How to transparently translate your application with minimal complexity',
    shareSentence: 'Automatically translate your application in this simple fashion',
    introduction: (
        <p>
            Translating an application is not trivial but it shouldn't be complicated. Using
            existing tools, we can flag the text that needs to be translated and extract it into
            resource files. Such files will be populated, either by human translators or machine
            generated content, and then the translation software will transparently do the rest.
            ¡Vamos alla!
        </p>
    ),
    body: (
        <React.Fragment>
            <ArticleImage
                articleId={ArticleId.minimalisticTranslation}
                alt="Representation of multi language platform"
                filename="translation-art.jpg"
                className="image-600"
            />
            <p>
                There is a set of features we will generally be interested in when setting up a
                translation system. Firstly we want the <b>application code</b> to remain{' '}
                <b>agnostic about the translation process</b>. Ideally we want to write the code in
                the default language (e.g. english) and let the translations be resolved during
                runtime, depending on the user selected language.
            </p>
            <p>
                Secondly we will want to minimize the overhead of extracting the translations into
                resource files. If we have a system in place to parse the code, detect translatable
                text and extract it into the resource files automatically, we can focus on writing
                code without having to manually maintain JSON files.
            </p>
            <p>
                Finally we will want the translation to be dynamic. If we are translating a client
                app there is no reason for the translation to require a page reload. We should be
                able to translate the static texts dynamically, without altering the state of the
                application. The only thing we need are the corresponding resources, regardless
                where they come from (e.g. always bundled with the static assets or lazy loaded from
                the server).
            </p>
            <p>
                Having the requirements clear, let's first writing some code to translate a sample
                client app. The code will be simple and not suitable for a real life scenario, but
                it will help us understand which challenges need to be addressed and why it is worth
                using existing tools. Let's start by introducing the sample client app.
            </p>
            <ArticleImage
                alt="Screenshot of the sample app"
                articleId={ArticleId.minimalisticTranslation}
                className="image-600"
                filename="sample-app-untranslated.png"
            />
            <ReactGist id="75da67be6f4edde211a735d18aa0c70a" />
            <p>
                It is a trivial client app, but it has three representative types of text that need
                to be translated: function string parameters (e.g. the{' '}
                <InlineSnippet>alert</InlineSnippet> argument), static text (e.g. the{' '}
                <InlineSnippet>button</InlineSnippet> name) and text with dynamic values (e.g.{' '}
                <InlineSnippet>
                    Hello {'{'}name{'}'}
                </InlineSnippet>
                ). It is written in React but the same ideas can be applied to other frameworks
                (e.g. Angular).
            </p>
            <p>
                In order to translate the app we will first need to modify the UI to include a
                language selector and store the selected language as part of the application state.
                Storing it via <InlineSnippet>useState</InlineSnippet> will take care about updating
                the application text every time the selected language changes. Having done that we
                can start with the actual translation part 💪
            </p>
            <ArticleImage
                alt="Screenshot of the sample app including a language selector"
                articleId={ArticleId.minimalisticTranslation}
                className="image-600"
                filename="language-selector.png"
            />
            <ReactGist id="894c4c82fdf59b6f7e82e027809fb7dc" />
            <h3>Custom code: translate</h3>
            <p>
                A simple and effective approach consists in passing all the text that needs to be
                translated to a translation function, which receives the user selected language as
                the second argument. The translation function then uses the selected language and
                the translatable text to retrieve the corresponding translation from a{' '}
                <InlineSnippet>resources</InlineSnippet> object.
            </p>
            <ReactGist id="905f10c961f0400e3e934c70294da09b" />
            <p>
                <i>
                    We could use explicit keys instead of the english translatable text. For
                    example:{' '}
                    <InlineSnippet>
                        {'{'}translate('AREA_COMPONENT-DISCRIMINATOR', language){'}'}
                    </InlineSnippet>
                    . That would give us more control over the management of translations, but it
                    decreases the code readability, as the actual content will only be present in
                    the resource files. Have a look at{' '}
                    <Anchor url="https://github.com/capelski/translation-approaches/tree/main/source/translate-function/alternatives/explicit-keys">
                        this alternative
                    </Anchor>{' '}
                    if you are interested.
                </i>
            </p>
            <p>
                The cornerstone of this approach is therefore building the resources object. We want
                to avoid having to do that manually so let's write a simple parser to do it for us.
                It must take a set of code files, locate all the calls to the{' '}
                <InlineSnippet>translate</InlineSnippet> function, obtain each first argument and
                add them to a dictionary. We will use the actual english text as the dictionary
                keys. Here is a minimal TypeScript implementation of such parser:
            </p>
            <ReactGist id="68e788aa153c0633af3848e9d86c7099" />
            <p>
                A reliable parser must support many other scenarios, but this naive implementation
                (only allows single/double quote strings, with no escaped single/double quotes) is
                good enough for demonstration purposes. Running it (i.e.{' '}
                <InlineSnippet>npx ts-node update-translations.ts</InlineSnippet>) will generate the
                following JSON resources file, with empty values for all languages other than
                English.
            </p>
            <ReactGist id="1e1b494cfd3064aa205e66f77353b77e" />
            <p>
                <i>
                    Note that the translation function returns the english text by default; we don't
                    necessarily need to include the English text into the resources dictionary. Here
                    I'm doing it for consistency.
                </i>
            </p>
            <p>
                We could call an external API to provide machine-generated translations but I'm not
                going to address that in this article. At this point, and given we only have a few
                translations, we can populate the file manually. Once that is done the{' '}
                <InlineSnippet>translate</InlineSnippet> function has all it needs to transparently
                replace the english text with the corresponding selected language. Sweet! We have a
                first working version.
            </p>
            <ArticleImage
                alt="The sample app translated to Spanish"
                articleId={ArticleId.minimalisticTranslation}
                className="image-600"
                filename="sample-app-translated.png"
            />
            <p>
                <i>
                    In some cases we might want to index the resources dictionaries with specific
                    keys (e.g. using fixed length alphanumeric codes or UUIDs). It is not
                    complicated to achieve; both the translate function and the parser will need to
                    call an additional function to obtain the text key. Have a look at{' '}
                    <Anchor url="https://github.com/capelski/translation-approaches/tree/main/source/translate-function/alternatives/hash-keys">
                        this alternative
                    </Anchor>{' '}
                    if you are interested.
                </i>
            </p>
            <h3>Custom code: interpolation</h3>
            <p>
                You might have noticed that the string we are passing to the{' '}
                <InlineSnippet>alert</InlineSnippet> function requires two separate translate calls.
                While it does the trick, it also breaks the resource files consistency. This happens
                because the position of the dynamic value within the message might be different for
                each language. To get around that we need to deliberately set some resources to be
                white space:
            </p>
            <ReactGist id="c0a4b71bb1d4865f465fcc503992251a" />
            <p>
                It also means including trailing whitespaces in the translations, which can easily
                be lost by translation tools. To resolve this problem most translation libraries
                allow using templates/placeholders in the translatable text. This concept is known
                as <b>interpolation</b> and, once we have chosen a syntax to flag templates in the
                translatable text (e.g. <InlineSnippet>'Text [[template]]'</InlineSnippet>), it is
                relatively simple to implement.
            </p>
            <p>
                One way to do it is by adding a third parameter to the{' '}
                <InlineSnippet>translate</InlineSnippet> function so it accepts a map of values. The
                map is expected to have a property for each template in the string parameter, and we
                will use the value of each property to replace the corresponding template in the
                string. Sounds more complicated than it actually is:
            </p>
            <ReactGist id="7d31cd8f40cd30538e60ab5badaa481f" />
            <p>
                Now <InlineSnippet>Hi! This is [[name]]'s laptop</InlineSnippet> becomes{' '}
                <InlineSnippet>"Hi! This is World's laptop"</InlineSnippet> (or, in Spanish,{' '}
                <InlineSnippet>Ey! Soy el ordenador de World</InlineSnippet>). This is starting to
                look solid 👌
            </p>
            <h3>Custom code: declarative component</h3>
            <p>
                One last thing before moving on to using existing libraries. With the addition of
                the <InlineSnippet>translate</InlineSnippet> function, the perfectly readable
                multiline text has become a long single line string. It would me more comfortable to
                have a <InlineSnippet>Translate</InlineSnippet> component that allows for multiline
                text and implicitly calls the function with its children as first parameter.
            </p>
            <ReactGist id="60e6595586184916e1e71442f760655d" />
            <p>
                Much nicer. This simple change has consequences however. On one hand, the HTML/JSX
                code can contain line breaks and multiple white spaces that we will not want to
                include in the resource files. We will need to remove such characters in the parser.
                And, additionally, because the resource files are indexed using the english content,
                we will also need to remove those characters in the Translate component (note the{' '}
                <InlineSnippet>parseHtml</InlineSnippet> call).
            </p>
            <p>
                On the other hand, we will need to modify the parser to extract the text inside the{' '}
                <InlineSnippet>Translate</InlineSnippet> components, as well as the strings passed
                to the <InlineSnippet>translate</InlineSnippet> function. Here things get
                complicated as{' '}
                <Anchor url="https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags">
                    HTML/JSX cannot really be parsed using regular expressions
                </Anchor>
                . We will modify our parser so it covers the sample app (using a multiline regular
                expression that matches text which doesn't contain the{' '}
                <InlineSnippet>{'>'}</InlineSnippet> character) but a solid approach requires
                building the code{' '}
                <Anchor url="https://en.wikipedia.org/wiki/Abstract_syntax_tree">
                    abstract syntax tree
                </Anchor>
                .
            </p>
            <ReactGist id="b9e34e34769dd5f1a968fd0f3c4f64ef" />
            <p>
                Now that we understand the complexity of maintaining a custom solution, we are in a
                better position to chose from the existing libraries out there. We want a library
                that provides an explicit translation function, interpolation, automatic parsing of
                the code files and, ideally, a declarative component. Well, it's our lucky day 🍾
            </p>
            <h3>Standard code: react-i18next</h3>
            <p>
                Why reinventing the wheel when there is an open-source, well tested and working
                library out there? It supports interpolation, a declarative component and a proper
                parser (e.g. it will not extract text that is commented out) to extract the
                translatable text from the code files. Say hi to your new ally:{' '}
                <Anchor url="https://www.npmjs.com/package/i18next">i18next</Anchor>.
            </p>
            <p>
                Even though the documentation can be tricky, setting up{' '}
                <InlineSnippet>i18next</InlineSnippet> is simple. We just need to install the
                package, along with the React flavour dependency (
                <InlineSnippet>react-i18next</InlineSnippet>), and initialize it with the default
                language and the resources in the following fashion.
            </p>
            <BlockSnippet>npm install --save i18next react-i18next</BlockSnippet>
            <br />
            <ReactGist id="83472160301c67ad147ca14bbcba56f0" />
            <p>
                Next, just like we did before for our custom translation code, we need to add a
                language selector to the UI. This time we don't need to store the selected language
                as part of the application state though, as i18next will take care of that:
            </p>
            <ReactGist id="ffa2e8b63495cd4f8f85d9fbac4f40ab" />
            <p>
                We are now ready to start using the i18next translation capabilities. In function
                components, such as our sample app, we can obtain the translation function by using
                the <InlineSnippet>useTranslation</InlineSnippet> hook. We need to use the hook for
                React to re-render the component when the selected language changes. The declarative
                component, <InlineSnippet>Trans</InlineSnippet>, is available out of the box.
                Putting it all together:
            </p>
            <ReactGist id="3b775d42dd05bd245cea681979d9a08d" />
            <p>
                Only one thing left to do: automatically extracting translatable text into resource
                files. We will need a parser for that. Here I'll be using{' '}
                <InlineSnippet>i18next-parser</InlineSnippet>. It requires a fair bit of{' '}
                <Anchor url="https://github.com/i18next/i18next-parser?tab=readme-ov-file#options">
                    configuration
                </Anchor>
                , but it supports Typescript without additional steps. By trial and error I got it
                working with the following parameters. Start here and tweak it to meet your needs:
            </p>
            <BlockSnippet>npm install --save-dev i18next-parser</BlockSnippet>
            <br />
            <ReactGist id="3d07f33628b9a03181fec5aa2d2c2692" />
            <p>
                Once you get the configuration right, running it will produce a resources file per
                each language, which we will need to import from the app. Note that i18next uses
                namespaces, expecting the resources for each language to be nested under a{' '}
                <InlineSnippet>translation</InlineSnippet> property by default. To workaround that
                when not using namespaces we can explicitly generate an object that matches the
                i18next expectations:
            </p>
            <BlockSnippet>npx i18next --config ./i18next-parser.config.js</BlockSnippet>
            <br />
            <ReactGist id="d7486cfc9687a3c77f6b8329ba84a435" />
            <p>
                <i>
                    According to{' '}
                    <Anchor url="https://www.i18next.com/overview/configuration-options#languages-namespaces-resources">
                        the documentation
                    </Anchor>{' '}
                    it is possible to disable namespaces. I spent a good while trying to do so but I
                    couldn't manage to.
                </i>
            </p>
            <h3>Bonus: machine generated content</h3>
            <p>
                As the application grows it won't be feasible to populate the resource files
                manually. Here is where a tool to manage the resource files can come in handy. There
                must be a bunch of tools for this purpose; I confess I haven't done any research on
                that. Here I'm suggesting{' '}
                <Anchor url="https://www.codeandweb.com/babeledit">BabelEdit</Anchor>, the tool we
                use at my current company. It requires purchasing a license but it does a good job
                and it comes with several useful features:
            </p>
            <ul>
                <li>Generating machine based translations.</li>
                <li>
                    Filtering text that is empty for at least one language, or text that is equal to
                    the default language.
                </li>
                <li>
                    Managing the approval status of each text and language. This can be used to keep
                    reflect which text has already been reviewed by human translators.
                </li>
                <li>
                    Exporting the translations to a single CSV file containing all (or a subset of)
                    the languages. CSV is the format that translators usually expect.
                </li>
                <li>
                    Importing a CSV file containing the translations for several languages into the
                    corresponding JSON files. When the translators send the CSV file back, this will
                    update the JSON files automatically.
                </li>
            </ul>
            <p>
                To start using it we need to create a new project (Generic JSON will do), import the
                JSON resource files and set the primary language. Babel saves the project in an XML
                file, which we will want to commit to the repository. From now on populating the
                resource files will be a matter of a few clicks!
            </p>
            <ArticleImage
                articleId={ArticleId.minimalisticTranslation}
                alt="Creation of a BabelEdit project"
                filename="babel-edit-new-project.png"
                className="image-600"
            />
            <ArticleImage
                articleId={ArticleId.minimalisticTranslation}
                alt="Adding languages to a BabelEdit project"
                filename="babel-edit-add-languages.png"
                className="image-600"
            />
            <ArticleImage
                articleId={ArticleId.minimalisticTranslation}
                alt="Setting the primary language of a BabelEdit project"
                filename="babel-edit-primary-language.png"
                className="image-600"
            />
            <ArticleImage
                articleId={ArticleId.minimalisticTranslation}
                alt="Resources view in BabelEdit (empty)"
                filename="babel-edit-empty-resources.png"
                className="image-600"
            />
            <ArticleImage
                articleId={ArticleId.minimalisticTranslation}
                alt="Resources view in BabelEdit (pre-translated)"
                filename="babel-edit-pretranslated-resources.png"
                className="image-600"
            />
            <h3>Conclusions</h3>
            <p>
                The main challenge when it comes to translating an app is detecting the text that
                needs to be translated and extracting it to resource files. Using a parser to
                automatically extract such texts makes the translation almost transparent from the
                developers point of view. And, if the parser is included in the continuous
                integration pipeline, it will make sure the resource files never go out of date.
            </p>
            <p>
                HTML/JSX parsers are not easy to implement and maintain however, so it's worth using
                existing open source libraries. Do your own research and pick the tools that better
                suit your needs. If you are happy to take my recommendation and go with{' '}
                <InlineSnippet>react-i18next</InlineSnippet>, here is the{' '}
                <Anchor url="https://github.com/capelski/translation-approaches">
                    sample code repository
                </Anchor>{' '}
                for you to start fiddling.
            </p>
        </React.Fragment>
    )
};