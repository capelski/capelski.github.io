import React from 'react';
import ReactGist from 'react-gist';
import { NavLink } from 'react-router-dom';
import { articleRoute } from '../../routes';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { BlockSnippet } from '../block-snippet';
import { DirectoryView } from '../directory-view';
import { InlineSnippet } from '../inline-snippet';

export const english: ArticleContent = {
    title: 'Distribution of Typescript shared code without package repositories',
    description:
        'Distributing shared Typescript code to production environments without package repositories',
    shareSentence:
        "You don't need package repositories to distribute your Typescript monorepo shared code to production environments. Here are a couple of ways to do it!",
    introduction: (
        <p>
            A couple years ago I wrote a piece about{' '}
            <NavLink to={articleRoute.path.replace(':articleId', ArticleId.typescriptMonorepo)}>
                sharing code in Typescript monorepos
            </NavLink>
            , focusing mainly on npm workspaces, and I left out an important aspect of the software
            development lifecycle: shipping the compiled files to production environments. Because
            that is such a fundamental part of software development, I'll be addressing it in this
            second piece of writing.
        </p>
    ),
    body: () => {
        return (
            <React.Fragment>
                <ArticleImage
                    alt="Package distribution representation"
                    articleId={ArticleId.typescriptMonorepoII}
                    className="image-600"
                    filename="distribution.jpg"
                />
                <p>
                    Having successfully extracted the duplicate code into a separate directory/npm
                    project (covered in{' '}
                    <NavLink
                        to={articleRoute.path.replace(':articleId', ArticleId.typescriptMonorepo)}
                    >
                        sharing code in Typescript monorepos
                    </NavLink>
                    ), the task at hand is to decide how the shared code and its external
                    dependencies will make their way to production environments. Let's consider two
                    different solutions: one based on <b>relative path imports</b> and another based
                    on <b>npm dependencies</b>.
                </p>
                <p>
                    <i>
                        Note that the distribution issue is mostly a server side concern since
                        client apps are usually bundled into static assets that include both
                        external dependencies and code imported from outside the project.
                    </i>
                </p>
                <p>
                    To make the explanations more tangible, let's introduce a simple{' '}
                    <Anchor url="https://github.com/capelski/typescript-monorepo">
                        monorepo example
                    </Anchor>
                    . For the sake of simplicity the example code has no actual functionality, just
                    one duplicate function (<InlineSnippet>getId</InlineSnippet>) that relies on one
                    external dependency (<InlineSnippet>nanoid</InlineSnippet>). Here is the
                    monorepo structure:
                </p>
                <BlockSnippet>
                    <DirectoryView
                        structure={{
                            client: {
                                source: {
                                    'index.html': true,
                                    'index.tsx': true
                                },
                                'package.json': true,
                                'tsconfig.json': true,
                                'webpack.config.js': true
                            },
                            server: {
                                public: {},
                                source: {
                                    'main.ts': true
                                },
                                Dockerfile: true,
                                'package.json': true,
                                'tsconfig.json': true
                            }
                        }}
                    />
                </BlockSnippet>
                <p>The server side code:</p>
                <ReactGist id="c1687116d228e99ffb82b4e3e3a042cb" />
                <p>And the client side code:</p>
                <ReactGist id="3049496ceedf7650196bdc6adaa77c31" />
                <h3>Relative path imports</h3>
                <p>
                    When importing shared code via relative path imports, Typescript will include
                    the shared code into the project's compiled files. Distribution problem solved!
                    But there's a caveat: importing code from outside the project directory via
                    relative paths will impact the way Typescript compiles the files.
                </p>
                <p>
                    Because we are now importing code from outside the project's{' '}
                    <Anchor url="https://www.typescriptlang.org/tsconfig#rootDir">
                        <InlineSnippet>rootDir</InlineSnippet>
                    </Anchor>
                    , Typescript will need to create additional directories inside the compiled
                    files directory. In our example the directory structure will change from
                </p>
                <BlockSnippet>
                    <DirectoryView
                        structure={{
                            server: {
                                dist: {
                                    'main.js': true
                                },
                                source: {
                                    'main.ts': true
                                }
                            }
                        }}
                    />
                </BlockSnippet>
                <p>to:</p>
                <BlockSnippet>
                    <DirectoryView
                        structure={{
                            shared: {
                                'index.ts': true
                            },
                            server: {
                                dist: {
                                    server: {
                                        source: {
                                            'main.js': true
                                        }
                                    },
                                    shared: {
                                        'index.js': true
                                    }
                                },
                                source: {
                                    'main.ts': true
                                }
                            }
                        }}
                    />
                </BlockSnippet>
                <p>
                    <i>
                        Depending on the Typescript version you use, importing code from outside the
                        project directory might result in the following error. To fix it, simply
                        change the <InlineSnippet>rootDir</InlineSnippet> property to the path of
                        the directory that contains all projects (usually,{' '}
                        <InlineSnippet>".."</InlineSnippet>).
                        <BlockSnippet>
                            source/main.ts:3:23 - error TS6059: File
                            '/typescript-monorepo/shared/index.ts' is not under 'rootDir'
                            '/typescript-monorepo/server/source'. 'rootDir' is expected to contain
                            all source files.
                            <br />
                            <br />
                            import {'{'} getId {'}'} from "../../shared";
                        </BlockSnippet>
                    </i>
                </p>
                <p>
                    This consequence comes from the fact that Typescript doesn't change import paths
                    during compilation. Therefore the only way to guarantee the paths are still
                    correct after compilation is to replicate the same directory structure. The new
                    directory structure is not necessarily a deal breaker, but it could be when
                    using non-import relative paths (e.g.{' '}
                    <InlineSnippet>resolve(__dirname, "..", "public")</InlineSnippet>
                    ).
                </p>
                <p>
                    A simple solution is to make the non-imports paths relative to the distribution
                    directory. In our example:{' '}
                    <InlineSnippet>resolve(__dirname, "..", "..", "..", "public")</InlineSnippet>.
                    Another solution, for cases where development tools are used to run the project
                    without compiling (i.e. <InlineSnippet>ts-node</InlineSnippet>), would be to set
                    those paths depending on the execution mode.
                </p>
                <p>
                    And what about the external dependencies of the shared code? Well, since the
                    shared code is not an npm project, it can't manage its own dependencies. Each
                    project that imports from it is responsible for installing any dependencies the
                    shared code might need. It means having the same dependencies declared across
                    different <InlineSnippet>package.json</InlineSnippet> files but, hey, they were
                    already there before the code extraction, so it's not a big deal. If you want to
                    manage the external dependencies of the shared code from a single source, then
                    the <b>npm dependencies</b> approach will work better for you.
                </p>
                <p>Summary:</p>
                <ul>
                    <li>👍 The compiled files include the shared code.</li>
                    <li>👎 Might break non-import relative paths.</li>
                    <li>👎 Duplicate dependencies across different package.json files.</li>
                </ul>
                <p>
                    Changes:{' '}
                    <Anchor url="https://github.com/capelski/typescript-monorepo/compare/main...relative-path-imports">
                        https://github.com/capelski/typescript-monorepo/compare/main...relative-path-imports
                    </Anchor>
                </p>
                <ReactGist id="f29477fe4c52e48b917e23d053a83197" />
                <ReactGist id="68d8ed0f32ead27c7a082d477b715abe" />
                <h3>npm dependencies</h3>
                <p>
                    When importing shared code via npm dependencies (local or public), the shared
                    code becomes an independent npm project, so it can manage its own dependencies.
                    One problem solved! Now, what about the distribution of the compiled files?
                </p>
                <p>
                    When opting for public dependencies, the shared code will be provisioned via the
                    dependencies installation step (executed either directly on the production
                    environments or via Docker image). Note however that public dependencies involve
                    additional overhead (e.g. publishing the dependency to a package repository).
                    For the sake of simplicity, let's consider local dependencies this time.
                </p>
                <p>
                    When opting for local dependencies, the shared code will no longer be
                    provisioned via the dependencies installation step. This happens because local
                    dependencies are just a symbolic link inside the{' '}
                    <InlineSnippet>node_modules</InlineSnippet> directory, which rely on the shared
                    code being present in the workspace. Because the shared code will not be present
                    by default in the production environment, we will need to provide it separately.
                </p>
                <p>
                    This is what happens in our example when we try to run the Dockerized
                    application after having extracted the duplicate code into an npm local
                    dependency:
                </p>
                <BlockSnippet>
                    {'>'} docker run -p 3000:3000 server
                    <br />
                    <br />
                    <br />
                    {'>'} server@1.0.0 start
                    <br />
                    {'>'} node dist/main.js
                    <br />
                    <br />
                    node:internal/modules/cjs/loader:1042
                    <br />
                    &emsp;throw err;
                    <br />
                    &emsp;^
                    <br />
                    <br />
                    Error: Cannot find module 'shared'
                    <br />
                    Require stack:
                    <br />
                    - /usr/src/app/dist/main.js
                    <br />
                    &emsp;&emsp;at Module._resolveFilename
                    (node:internal/modules/cjs/loader:1039:15)
                    <br />
                    &emsp;&emsp;at Module._load (node:internal/modules/cjs/loader:885:27)
                    <br />
                    &emsp;&emsp;at Module.require (node:internal/modules/cjs/loader:1105:19)
                    <br />
                    &emsp;&emsp;at require (node:internal/modules/cjs/helpers:103:18)
                    <br />
                    &emsp;&emsp;at Object.{'<'}anonymous{'>'} (/usr/src/app/dist/main.js:8:18)
                    <br />
                    &emsp;&emsp;at Module._compile (node:internal/modules/cjs/loader:1218:14)
                    <br />
                    &emsp;&emsp;at Module._extensions..js (node:internal/modules/cjs/loader:1272:10)
                    <br />
                    &emsp;&emsp;at Module.load (node:internal/modules/cjs/loader:1081:32)
                    <br />
                    &emsp;&emsp;at Module._load (node:internal/modules/cjs/loader:922:12)
                    <br />
                    &emsp;&emsp;at Function.executeUserEntryPoint [as runMain]
                    (node:internal/modules/run_main:81:12) {'{'}
                    <br />
                    &emsp;code: 'MODULE_NOT_FOUND',
                    <br />
                    &emsp;requireStack: [ '/usr/src/app/dist/main.js' ]<br />
                    {'}'}
                </BlockSnippet>
                <p>
                    To fix this problem we will need to explicitly provision the shared code npm
                    project, independently from the external dependencies installation. For
                    Dockerizied apps, one way to do so consists in including the npm project in the
                    Docker image of the projects that import it, using the same relative path.
                </p>
                <p>
                    In our example, this means changing the Docker build command to start from the
                    parent directory (as it will now need access to both the server and shared
                    projects' directory) and turning the Dockerfile (simplified) from
                </p>
                <BlockSnippet>
                    FROM node:18.13.0-alpine
                    <br />
                    <br />
                    WORKDIR /usr/src/app
                    <br />
                    COPY . .<br />
                    RUN npm ci --omit=dev
                    <br />
                    <br />
                    EXPOSE 3000
                    <br />
                    CMD npm start
                    <br />
                </BlockSnippet>
                to
                <BlockSnippet>
                    FROM node:18.13.0-alpine
                    <br />
                    <br />
                    # Copy shared code and install its dependencies
                    <br />
                    WORKDIR /usr/src/shared
                    <br />
                    COPY ./shared .
                    <br />
                    RUN npm ci --omit=dev
                    <br />
                    <br />
                    WORKDIR /usr/src/app
                    <br />
                    COPY ./server . # The path must now be relative to the parent directory
                    <br />
                    RUN npm ci --omit=dev
                    <br />
                    <br />
                    EXPOSE 3000
                    <br />
                    CMD npm start
                    <br />
                </BlockSnippet>
                <p>Summary:</p>
                <ul>
                    <li>
                        👍 The shared code dependencies are managed in a single package.json file.
                    </li>
                    <li>👎 Additional effort required to distribute the shared code.</li>
                </ul>
                <p>
                    Changes:{' '}
                    <Anchor url="https://github.com/capelski/typescript-monorepo/compare/main...npm-dependencies">
                        https://github.com/capelski/typescript-monorepo/compare/main...npm-dependencies
                    </Anchor>
                </p>
                <ReactGist id="92a4a8fa35cdca982458385a8ec87986" />
                <ReactGist id="7252ebbb9c5885506bcf51191fe33ae5" />
                {/*
                - Extract code into a separate directory
                - Add a package.json file, with "main" and "types" properties
                - Install any necessary dependencies (generating a package-lock)
                - Add a tsconfig.json file, setting the "declaration" property to true
                - Install typescript and @types/node as devDependencies
                - Add a compilation script to package.json
                - Build the shared directory
                - Install the local dependency on projects that need the shared code
                - Import the shared code from projects by using the local dependency name
                */}
            </React.Fragment>
        );
    }
};
