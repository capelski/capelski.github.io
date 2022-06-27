import React from 'react';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { BlockSnippet } from '../block-snippet';
import { InlineSnippet } from '../inline-snippet';
import { Spaces } from '../spaces';

export const english: ArticleContent = {
    title: 'Effective code sharing in Typescript monorepos',
    description: 'How to share code between client and server in Typescript monorepos',
    shareSentence: 'Time to get rid of the duplicated code in your Typescript monorepo!',
    introduction: (
        <p>
            With the popularization of node.js since 10+ years ago, it's becoming more and more
            usual to find the same programming language in both sides of web applications. Using
            node.js in the server side allows for re-using a good amount of logic but, how can we
            effectively share code between client and server in Typescript monorepos? Let's have a
            look at different alternatives.
        </p>
    ),
    body: (
        <React.Fragment>
            <p>
                Most modern web applications are characterized by the following two traits when it
                comes to code repetition:
            </p>
            <ul>
                <li>
                    The same <b>validation logic</b> is executed on both client and server side. On
                    the client side, to detect validation errors without having to communicate with
                    the server, and on the server side, to protect ourselves from API faulty calls.
                </li>
                <li>
                    Very similar <b>data models</b> are used in both client and server side. Since
                    we deal with the same application data on both ends, it's only logic to define
                    symmetric data models.
                </li>
            </ul>
            <p>
                In node.js monorepos we can easily extract the duplicated code away and require it
                using relative paths. But the extraction comes with some challenges when Typescript
                is in the mix. Let's use a sample Typescript web app to better illustrate those
                challenges and how to resolve them effectively. We can call it <b>Weather Now</b>.
            </p>
            <ArticleImage
                articleId={ArticleId.typescriptMonorepo}
                filename="weather-now-ui.png"
                footer="Weather Now UI"
            />
            <p>
                On one hand we have a React UI (i.e. <InlineSnippet>weather-client</InlineSnippet>)
                that fetches weather data for a given city from a web API and displays it in a
                simple layout. On the other hand we have an <b>Express web API</b> (i.e.{' '}
                <InlineSnippet>wether-server</InlineSnippet>) with a single endpoint that returns
                weather data (i.e. <InlineSnippet>/api/weather</InlineSnippet>) and serves the
                static React UI files in the root url.
            </p>
            <p>
                And, to fit the purpose of this article, the{' '}
                <Anchor url="https://github.com/capelski/weather-monorepo">monorepo</Anchor> sure
                has some duplicated code: <InlineSnippet>validateCityName</InlineSnippet>, the
                function which <b>validates</b> that a city name has been provided, and the{' '}
                <InlineSnippet>Validation</InlineSnippet>, <InlineSnippet>Weather</InlineSnippet>{' '}
                and <InlineSnippet>WeatherIcons</InlineSnippet> <b>types</b>.
            </p>
            <ArticleImage
                articleId={ArticleId.typescriptMonorepo}
                filename="duplicated-code.png"
                footer="Sample duplicated code in Weather Now"
            />
            <p>
                Now that we have a concrete example, let's proceed to extract that duplicated code
                into a common folder (e.g. <InlineSnippet>weather-common</InlineSnippet>) and
                require it through relative path imports (see{' '}
                <Anchor url="https://github.com/capelski/weather-monorepo/tree/base-code-extraction">
                    base-code-extraction
                </Anchor>{' '}
                branch).
            </p>
            <ArticleImage
                articleId={ArticleId.typescriptMonorepo}
                filename="base-code-extraction.png"
                footer="Extraction of duplicated code to common folder"
            />
            <p>
                Here is where the challenges start: Typescript does compile successfully but node
                fails to start the server.
            </p>
            <BlockSnippet>
                $ npm run start:server
                <br />
                <br />
                {'>'} start:server
                <br />
                {'>'} cd weather-server && npm run start
                <br />
                <br />
                {'>'} start
                <br />
                {'>'} node distribution/index.js
                <br />
                <br />
                internal/modules/cjs/loader.js:905
                <br />
                <Spaces number={2} />
                throw err;
                <br />
                <Spaces number={2} />^<br />
                <br />
                Error: Cannot find module
                '/.../weather-monorepo/weather-server/distribution/index.js'
                <br />
                <Spaces number={4} />
                at Function.Module._resolveFilename (internal/modules/cjs/loader.js:902:15)
                <br />
                <Spaces number={4} />
                at Function.Module._load (internal/modules/cjs/loader.js:746:27)
                <br />
                <Spaces number={4} />
                at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:75:12)
                <br />
                <Spaces number={4} />
                at internal/main/run_main_module.js:17:47 {'{'}
                <br />
                <Spaces number={2} />
                code: 'MODULE_NOT_FOUND',
                <br />
                <Spaces number={2} />
                requireStack: []
                <br />
                {'}'}
            </BlockSnippet>
            <p>
                In Javascript monorepos, where the code files maintain their relative location at
                runtime, this type of code extraction works straight away. In Typescript
                repositories however, where the compiled files generally change their location (i.e.
                the distribution folder), further configuration is necessary to perform the code
                extraction, since we are now importing code from outside the Typescript{' '}
                <Anchor url="https://www.typescriptlang.org/tsconfig#rootDir">rootDir</Anchor> .
            </p>
            <p>
                <i>
                    It is possible to keep the compiled files in the same relative location as the
                    Typescript files (i.e. by removing the <InlineSnippet>outDir</InlineSnippet>{' '}
                    property in <InlineSnippet>tsconfig.json</InlineSnippet>), but we generally want
                    to compile them to a separate location, so we only include the distribution
                    files when deploying the code to production.
                </i>
            </p>
            <p>
                Importing code from outside the scope of a Typescript project forces the Typescript
                compiler to{' '}
                <b>replicate the file system hierarchy inside the distribution folder</b>, so it can
                guarantee that the referenced files will be compiled and available from within the
                distribution folder (note that Typescript never changes the relative paths in
                compiled files). In Weather Now this causes the{' '}
                <InlineSnippet>index.js</InlineSnippet> server file's location to change, causing
                the <InlineSnippet>start</InlineSnippet> npm script to fail.
            </p>
            <BlockSnippet>
                .<br />
                ···
                <br />
                ├─ weather-common
                <br />
                |<Spaces number={5} />
                ···
                <br />
                |<Spaces number={5} />
                utils.ts
                <br />
                └─ weather-server
                <br />
                <Spaces number={3} />
                ├─ distribution
                <br />
                <Spaces number={3} />|<Spaces number={2} />
                ├─ weather-common
                <br />
                <Spaces number={3} />|<Spaces number={2} />|<Spaces number={5} />
                ···
                <br />
                <Spaces number={3} />|<Spaces number={2} />|<Spaces number={5} />
                utils.js
                <br />
                <Spaces number={3} />|<Spaces number={2} />
                └─ weather-server
                <br />
                <Spaces number={3} />|<Spaces number={8} />
                ···
                <br />
                <Spaces number={3} />|<Spaces number={8} />
                index.js
                <br />
                <Spaces number={3} />
                └─ source
                <br />
                <Spaces number={9} />
                ···
                <br />
                <Spaces number={9} />
                index.ts
                <br />
                <Spaces number={6} />
                ···
                <br />
                <Spaces number={6} />
                package.json
                <br />
                <Spaces number={6} />
                tsconfig.server.json
                <br />
                ···
                <br />
                package.json
                <br />
                tsconfig.base.json
                <br />
            </BlockSnippet>
            <p>
                Fortunately there are several ways of fixing this problem 👍 Let's have a look at
                different solutions.
            </p>
            <h3>1. Relative paths fixes</h3>
            <p>
                The quick and dirty approach to get things working again. We just need to adapt the
                code to support the changes in the distribution folder. For Weather Now this means
                changing the references to compiled files in{' '}
                <InlineSnippet>package.json</InlineSnippet> (i.e.{' '}
                <InlineSnippet>main</InlineSnippet> and <InlineSnippet>start</InlineSnippet> npm
                script) as well as the paths to certain resources in the code files (see{' '}
                <Anchor url="https://github.com/capelski/weather-monorepo/tree/1-path-fixes">
                    1-path-fixes
                </Anchor>{' '}
                branch).
            </p>
            <ArticleImage
                articleId={ArticleId.typescriptMonorepo}
                filename="relative-path-fixes.png"
                footer="Adaptations for the new distribution file system hierarchy"
            />
            <p>
                Changing those paths might not look like a major deal but it adds unnecessary
                complexity to our code. Moreover, it forces us to introduce additional logic to, for
                example, run the code without compiling (e.g. using{' '}
                <InlineSnippet>nodemon</InlineSnippet> or <InlineSnippet>ts-node</InlineSnippet>).
                For Weather Now this means introducing an environment variable and setting the{' '}
                <InlineSnippet>express.static</InlineSnippet> path dynamically.
            </p>
            <p>
                It works, but we can do better. Why changing the code to match the distribution file
                system hierarchy when we can change the distribution file system hierarchy to match
                the code?
            </p>
            <h3>2. common npm project</h3>
            <p>
                By turning the common folder into an npm project itself, Typescript will expect the
                compiled files to exist in the referenced paths and it will stop replicating the
                file system hierarchy inside the distribution folder 💪 Let's go ahead and add both{' '}
                <InlineSnippet>package.json</InlineSnippet> and{' '}
                <InlineSnippet>tsconfig.json</InlineSnippet> files to the common folder, move the
                code files into a <InlineSnippet>source</InlineSnippet> subfolder and define an npm
                script to compile the Typescript code (see{' '}
                <Anchor url="https://github.com/capelski/weather-monorepo/tree/2-npm-project">
                    2-npm-project
                </Anchor>{' '}
                branch).
            </p>
            <ArticleImage
                articleId={ArticleId.typescriptMonorepo}
                filename="common-npm-project.png"
                footer="Extraction of duplicated code to common npm project"
            />
            <p>Note that as a result of extracting the code to a separate project:</p>
            <ul>
                <li>
                    We are introducing a build dependency. We will always need to compile the common
                    project separately before compiling the projects that depend on it (i.e. update
                    the <InlineSnippet>build</InlineSnippet> npm script on the root{' '}
                    <InlineSnippet>package.json</InlineSnippet>).
                    <ArticleImage
                        articleId={ArticleId.typescriptMonorepo}
                        filename="common-npm-project-build-dependency.png"
                        footer="Modifications to build npm script to compile common project"
                    />
                </li>
                <li>
                    Typescript looses access to the types definitions. We will need to generate type
                    declaration files for the common project (i.e. setting the{' '}
                    <InlineSnippet>declaration</InlineSnippet> property to true in{' '}
                    <InlineSnippet>tsconfig.json</InlineSnippet>) and let Typescript know where to
                    locate those files (i.e. setting the <InlineSnippet>types</InlineSnippet>{' '}
                    property in the common <InlineSnippet>package.json</InlineSnippet>).
                    <ArticleImage
                        articleId={ArticleId.typescriptMonorepo}
                        filename="common-npm-project-types-resolution.png"
                        footer="VSCode types definition resolution through declaration files"
                    />
                    <i>
                        Generating type declaration files allows Typescript to compile but will as
                        well cause the IDE symbols navigation to go the declaration files instead of
                        the source code. Unfortunately we can't fix this issue when using relative
                        path imports.
                    </i>
                </li>
                <li>
                    Hot reloading will no longer detect changes happening outside the project{' '}
                    <InlineSnippet>source</InlineSnippet> folder. We will need to compile the common
                    project in watch mode as well as tweaking nodemon (through{' '}
                    <InlineSnippet>nodemon.json</InlineSnippet>) to watch for changes in the common
                    project's source folder.
                </li>
                <ArticleImage
                    articleId={ArticleId.typescriptMonorepo}
                    filename="common-npm-project-nodemon.png"
                    footer="Hot reloading necessary changes after extracting duplicated code"
                />
            </ul>
            <p>
                Now the compiled common code will remain inside the common project, and the
                distribution folders of the other projects will remain unchanged 🎉 Much better than{' '}
                <i>1. Relative paths fixes</i>, but still can be improved.
            </p>
            <BlockSnippet>
                .<br />
                ···
                <br />
                ├─ weather-common
                <br />
                |<Spaces number={2} />
                ├─ distribution
                <br />
                |<Spaces number={2} />|<Spaces number={5} />
                ···
                <br />
                |<Spaces number={2} />|<Spaces number={5} />
                utils.js
                <br />
                |<Spaces number={2} />
                └─ source
                <br />
                |<Spaces number={8} />
                ···
                <br />
                |<Spaces number={8} />
                utils.ts
                <br />
                |<Spaces number={5} />
                ···
                <br />
                |<Spaces number={5} />
                package.json
                <br />
                |<Spaces number={5} />
                tsconfig.common.json
                <br />
                └─ weather-server
                <br />
                <Spaces number={3} />
                ├─ distribution
                <br />
                <Spaces number={3} />|<Spaces number={5} />
                ...
                <br />
                <Spaces number={3} />|<Spaces number={5} />
                index.js
                <br />
                <Spaces number={3} />
                └─ source
                <br />
                <Spaces number={9} />
                ···
                <br />
                <Spaces number={9} />
                index.ts
                <br />
                <Spaces number={6} />
                ···
                <br />
                <Spaces number={6} />
                package.json
                <br />
                <Spaces number={6} />
                tsconfig.server.json
                <br />
                ···
                <br />
                package.json
                <br />
                tsconfig.base.json
                <br />
            </BlockSnippet>
            <h3>3. common npm project + npm local dependencies</h3>
            <p>
                After turning the common folder into a separate npm project we can use npm local
                dependencies (
                <Anchor url="https://docs.npmjs.com/cli/v8/commands/npm-install">
                    natively supported
                </Anchor>{' '}
                since npm 2.0) to install the common npm project as a dependency of the other npm
                projects, get rid of the relative paths in the cross-project import statements* and
                let npm natively resolve the dependency instead.
            </p>
            <p>
                All we need to do is install the common project as a local dependency in all the
                projects that are importing code from it in the following fashion. This will
                register the local dependency in both <InlineSnippet>package.json</InlineSnippet>{' '}
                and <InlineSnippet>package-lock.json</InlineSnippet> in the dependent projects.
            </p>
            <BlockSnippet>
                cd weather-client && npm install --save ../weather-common
                <br />
                cd ../weather-server && npm install --save ../weather-common
            </BlockSnippet>
            <p>
                Under the hood npm creates symbolic links to the local dependency folder inside the
                dependent projects' <InlineSnippet>node_modules</InlineSnippet> folder:
            </p>
            <ArticleImage
                articleId={ArticleId.typescriptMonorepo}
                filename="local-dependency-symbolic-links.png"
                footer="node.js generated symbolic links"
            />
            <p>
                We can now go ahead and replace all the relative path imports with regular npm
                dependency imports (see{' '}
                <Anchor url="https://github.com/capelski/weather-monorepo/tree/3-local-dependency">
                    3-local-dependency
                </Anchor>{' '}
                branch, or{' '}
                <Anchor url="https://github.com/capelski/weather-monorepo/tree/3-local-dependency-namespace">
                    3-local-dependency-namespace
                </Anchor>{' '}
                if you prefer to namespace your packages).
            </p>
            <ArticleImage
                articleId={ArticleId.typescriptMonorepo}
                filename="local-dependency-import.png"
                footer="npm local dependency import"
            />
            <p>
                Another advantage from this alternative is that it allows us to restore the IDE
                source code navigation we lost when extracting the duplicated code to a shared
                folder. We can use the Typescript{' '}
                <Anchor url="https://www.typescriptlang.org/tsconfig#paths">paths</Anchor> property
                to tell the IDE where to look for type definitions. For Weather Now this is:
            </p>
            <BlockSnippet>
                {'{'}
                <br />
                <Spaces number={2} />
                "compilerOptions": {'{'}
                <br />
                <Spaces number={4} />
                "paths": {'{'}
                <br />
                <Spaces number={6} />
                "weather-common": ["./weather-common/source"]
                <br />
                <Spaces number={4} />
                {'}'}
                <br />
                <Spaces number={2} />
                {'}'},<br />
                <Spaces number={2} />
                "extends": "./tsconfig.base.json"
                <br />
                {'}'}
            </BlockSnippet>
            <ArticleImage
                articleId={ArticleId.typescriptMonorepo}
                filename="local-dependency-types-resolution.png"
                footer="VSCode types definition resolution through Typescript paths"
            />
            <p>
                Note that using Typescript paths to resolve the relative path imports without
                registering the local npm dependencies will result in runtime errors since, as
                previously mentioned, Typescript does not modify the imports path on compilation.
            </p>
            <ArticleImage
                articleId={ArticleId.typescriptMonorepo}
                filename="wrong-ts-paths-resolution.png"
                footer="Wrong usage of Typescript paths"
            />
            <h3>4. common npm project + npm workspaces</h3>
            <p>
                After turning the common folder into a separate npm project, we can use{' '}
                <Anchor url="https://docs.npmjs.com/cli/v7/using-npm/workspaces">
                    npm workspaces
                </Anchor>{' '}
                (introduced in npm 7.0) to simplify the management of the different projects in the
                monorepo. The main advantage of using npm workspaces is being able to run, directly
                from the root folder, npm scripts defined in the{' '}
                <InlineSnippet>package.json</InlineSnippet> of any project in the monorepo.
            </p>
            <p>
                In order to enable workspaces in an existing npm monorepo we need to move the
                different projects into a specific folder (e.g.{' '}
                <InlineSnippet>projects</InlineSnippet>) and specify that folder through the{' '}
                <InlineSnippet>workspaces</InlineSnippet> property in the root{' '}
                <InlineSnippet>package.json</InlineSnippet>. npm workspaces come with a set of
                dependencies so we will need to re-install npm dependencies after updating the{' '}
                <InlineSnippet>package.json</InlineSnippet>, which will update{' '}
                <InlineSnippet>package-lock.json</InlineSnippet> as well.
            </p>
            <ArticleImage
                articleId={ArticleId.typescriptMonorepo}
                filename="npm-workspaces.png"
                footer="Enabling npm workspaces in package.json"
            />
            <p>
                Note that after the re-install, apart from new npm workspaces specific dependencies
                (e.g. <InlineSnippet>@nodelib/fs.scandir</InlineSnippet>), the{' '}
                <InlineSnippet>package-lock.json</InlineSnippet> file will also contain each of the
                existing projects in the workspace folder as dependencies. Additionally, npm will
                create symbolic links in the root <InlineSnippet>node_modules</InlineSnippet>{' '}
                folder.
            </p>
            <ArticleImage
                articleId={ArticleId.typescriptMonorepo}
                filename="npm-workspaces-symbolic-links.png"
                footer="node.js generated symbolic links, through workspaces"
            />
            <p>
                We can now install the common project as a local dependency in all the projects that
                are importing code from it, this time using workspaces (i.e. the{' '}
                <InlineSnippet>--workspace</InlineSnippet>, or <InlineSnippet>-w</InlineSnippet>,
                argument).
            </p>
            <BlockSnippet>
                npm install --save ./projects/weather-common -w weather-client
                <br />
                npm install --save ./projects/weather-common -w weather-server
            </BlockSnippet>
            <p>
                This will register the local dependency in the root{' '}
                <InlineSnippet>package.json</InlineSnippet> and the dependent project's{' '}
                <InlineSnippet>package.json</InlineSnippet>. It should update the dependent
                projects's <InlineSnippet>package-lock.json</InlineSnippet> as well, but there is
                currently an npm{' '}
                <Anchor url="https://github.com/npm/cli/issues/3847">known issue</Anchor> which
                causes the following install command to fail, leaving the file unchanged.
            </p>
            <BlockSnippet>
                $ npm install --save ./projects/weather-common -w weather-client
                <br />
                npm ERR! Cannot set properties of null (setting 'dev')
                <br />
                <br />
                npm ERR! A complete log of this run can be found in:
                <br />
                npm ERR
                <Spaces number={5} />
                /.../.npm/_logs/2022-05-30T05_57_51_827Z-debug.log
                <br />
            </BlockSnippet>
            <p>
                Fortunately there is a simple workaround to that issue: re-installing the
                dependencies of the dependent project (e.g. running an{' '}
                <InlineSnippet>npm install</InlineSnippet> in the project folder). We can after
                replace all the relative paths in the cross-project import statements* with regular
                npm dependency imports (see{' '}
                <Anchor url="https://github.com/capelski/weather-monorepo/tree/4-npm-workspaces">
                    4-npm-workspaces
                </Anchor>{' '}
                branch, or{' '}
                <Anchor url="https://github.com/capelski/weather-monorepo/tree/4-npm-workspaces-namespace">
                    4-npm-workspaces-namespace
                </Anchor>{' '}
                if you prefer to namespace your packages).
            </p>
            <ArticleImage
                articleId={ArticleId.typescriptMonorepo}
                filename="npm-workspaces-import.png"
                footer="npm local dependency import, through workspaces"
            />
            <p>
                Just like when using npm local dependencies, we can as well restore the IDE source
                code navigation we lost when extracting the duplicated code to a shared folder by
                using Typescript{' '}
                <Anchor url="https://www.typescriptlang.org/tsconfig#paths">paths</Anchor> property
                to tell the IDE where to look for type definitions. For Weather Now this is:
            </p>
            <BlockSnippet>
                {'{'}
                <br />
                <Spaces number={2} />
                "compilerOptions": {'{'}
                <br />
                <Spaces number={4} />
                "paths": {'{'}
                <br />
                <Spaces number={6} />
                "weather-common": ["./projects/weather-common/source"]
                <br />
                <Spaces number={4} />
                {'}'}
                <br />
                <Spaces number={2} />
                {'}'},<br />
                <Spaces number={2} />
                "extends": "./tsconfig.base.json"
                <br />
                {'}'}
            </BlockSnippet>
            <ArticleImage
                articleId={ArticleId.typescriptMonorepo}
                filename="npm-workspaces-types-resolution.png"
                footer="VSCode types definition resolution through Typescript paths"
            />
            <p>
                One more advantage of having npm workspaces in place is that we can simplify, or
                even remove, the "shortcut" npm scripts. "shortcut" scripts are a common practice in
                node.js monorepos: since npm doesn't detect scripts defined in "nested" folders, the
                only way to run "nested" scripts from the root folder is to define additional
                scripts which change the folder and then run the corresponding npm script:
            </p>
            <ArticleImage
                articleId={ArticleId.typescriptMonorepo}
                filename="shortcut-npm-scripts.png"
                footer='Root folder "shortcut" npm scripts'
            />
            <p>
                Since we have landed npm workspaces to our monorepo we can replace the{' '}
                <InlineSnippet>cd</InlineSnippet> instructions in our root{' '}
                <InlineSnippet>package.json</InlineSnippet> npm scripts with the corresponding{' '}
                <InlineSnippet>-w</InlineSnippet> argument, slightly speeding up the scripts
                execution time:
            </p>
            <ArticleImage
                articleId={ArticleId.typescriptMonorepo}
                filename="npm-workspaces-scripts.png"
                footer="Simplification of root folder npm scripts through npm workspaces"
            />
            <p>
                <i>
                    Note that certain npm scripts must remain intact. We need, for example, to build
                    the projects in a certain order (i.e.{' '}
                    <InlineSnippet>weather-common</InlineSnippet> before{' '}
                    <InlineSnippet>weather-server</InlineSnippet>), so using the{' '}
                    <InlineSnippet>--ws</InlineSnippet> (all workspaces) for the{' '}
                    <InlineSnippet>build</InlineSnippet> script could run into compilation errors.
                    Or, trying to use <InlineSnippet>npm install -ws</InlineSnippet> in the
                    postinstall script would result into an endless install loop (the workspaces
                    arguments only apply on install when adding/updating a dependency), so we need
                    to keep the original postinstall script.
                </i>
            </p>
            <h3>* What's the fuss with cross-project relative paths?</h3>
            <p>
                Relative paths in cross-project import statements are not necessarily a problem. The
                value of replacing them is in making the dependent projects agnostic of the common
                code file system hierarchy. This way, if we were to make changes in the common npm
                project, the dependent projects would remain unchanged (as long as the common code
                API is kept the same).
            </p>
            <p>
                Not that, while both <i>3. npm local dependencies</i> and <i>4. npm workspaces</i>{' '}
                allow for relative paths removal, they introduce a potential minor drawback: not
                being able to install public packages with the same name as the local dependencies.
                For example, naming a project <InlineSnippet>common</InlineSnippet> would prevent us
                from installing the{' '}
                <Anchor url="https://www.npmjs.com/package/common">common</Anchor> package from the
                npm registry.
            </p>
            <p>
                A convenient way of working around these conflicts is to <b>namespace</b> the
                packages. In fact, you might have noticed that some popular packages use the{' '}
                <InlineSnippet>@organization/package</InlineSnippet> format on their names:{' '}
                <InlineSnippet>@types/node</InlineSnippet>,{' '}
                <InlineSnippet>@react-native-community/slider</InlineSnippet>,{' '}
                <InlineSnippet>@angular/core</InlineSnippet>, etc. By using that convention is
                easier to avoid name conflicts, since your local dependencies will have very
                specific names.
            </p>
            <p>To namespace your packages you need to:</p>{' '}
            <ul>
                <li>
                    Move the packages to a <InlineSnippet>@namespace</InlineSnippet> subfolder.
                </li>
                <li>
                    Update paths to files outside the project folders accordingly (e.g. the{' '}
                    <InlineSnippet>extends</InlineSnippet> property in{' '}
                    <InlineSnippet>tsconfig.json</InlineSnippet> files referencing the root{' '}
                    <InlineSnippet>tsconfig.base.json</InlineSnippet>).
                </li>
                <li>
                    Update root <InlineSnippet>package.json</InlineSnippet> npm scripts that contain
                    project paths.
                </li>
                <li>
                    Modify the <InlineSnippet>name</InlineSnippet> property in the{' '}
                    <InlineSnippet>package.json</InlineSnippet> file of your npm projects to include
                    the namespace, and update <InlineSnippet>package-lock.json</InlineSnippet> by
                    running <InlineSnippet>npm install</InlineSnippet>.
                </li>
                <li>
                    In case you are renaming a project (e.g. from{' '}
                    <InlineSnippet>weather-common</InlineSnippet> to{' '}
                    <InlineSnippet>@weather/common</InlineSnippet>), you will need to rename the
                    project folder and update the corresponding relative import paths as well as
                    potential npm scripts in the root <InlineSnippet>package.json</InlineSnippet>.
                </li>
            </ul>
            <p>
                See the corresponding example branch in each section for specific implementation
                details.
            </p>
            <h3>Conclusions</h3>
            <p>
                Quoting the popular reference to feline taxidermy, "there is more than one way to
                skin a cat". The four described approaches will help you removing duplicated code.
                The more implementation effort, the more advantages you get. Give them a try and
                decide which one works better for you. Happy coding! ⌨️
            </p>
        </React.Fragment>
    )
};
