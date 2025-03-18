import React from 'react';
import ReactGist from 'react-gist';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { BlockSnippet } from '../block-snippet';
import { DirectoryView } from '../directory-view';
import { InlineSnippet } from '../inline-snippet';

export const english: ArticleContent = {
    title: 'React server side rendering powered by Webpack',
    description:
        'How to generate a Node.js compatible webpack bundle to render a React app on the server',
    shareSentence: 'Render React on your Node.js server with just a few Webpack tweaks ⚙️',
    introduction: (
        <p>
            Sooner or later you will need to support Search Engine Optimization in your React app.
            Fortunately, React uses a virtual DOM and it can easily be rendered on Node.js servers.
            We just need to generate a Node.js compatible assets bundle, make the server aware of
            the client side routing and adapt asynchronous data fetching. Let's get started.
        </p>
    ),
    body: (
        <React.Fragment>
            <ArticleImage
                articleId={ArticleId.reactSsr}
                alt="Abstract representation of server rendering"
                filename="server-rendering.jpg"
                className="image-600"
            />
            <h3>Starting point</h3>
            <p>
                We will start with the simplest Typescript stack possible: an express server that
                serves static files and a "Hello World" React app. We will later be adding client
                routing and asynchronous data fetching but let's set the basics straight first. Here
                is the repository structure (more on{' '}
                <Anchor url="https://github.com/capelski/react-ssr/tree/starting-point">
                    this git branch
                </Anchor>
                ).
            </p>
            <BlockSnippet>
                <DirectoryView
                    directoryName="repository"
                    structure={{
                        client: {
                            source: {
                                'app.tsx\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0# React app': true,
                                'index.html': true,
                                'index.tsx\u00A0\u00A0\u00A0\u00A0# Webpack entry point': true
                            },
                            webpack: {},
                            'package.json': true,
                            'tsconfig.json': true
                        },
                        server: {
                            source: {
                                'server.ts\u00A0\u00A0\u00A0\u00A0# express static server': true
                            },
                            static: {},
                            'package.json': true,
                            'tsconfig.json': true
                        }
                    }}
                />
            </BlockSnippet>
            <ReactGist id="12f99ea748aeadf5224ac92635bc62a1" />
            <ReactGist id="3181f618e32032e294af6c1d3d01b421" />
            <p>
                As per usual, the server returns the static HTML file and the application renders
                the app on the client side. Let's get the server rendering 🛠️
            </p>
            <ArticleImage
                articleId={ArticleId.reactSsr}
                filename="static-html.png"
                footer="Static HTML sent by the server"
                className="image-600"
            />
            <h3>Server SSR setup</h3>
            <p>
                First things first: the server can no longer return the static files straightaway.
                We will need to intercept requests to the index.html file, render the React app on
                the server (via the <InlineSnippet>renderToString</InlineSnippet> function from{' '}
                <InlineSnippet>react-dom/server</InlineSnippet>) and return the corresponding HTML
                to the client. There are a few things we need to pay attention to:
            </p>
            <ReactGist id="c796bbff8774fe445bf8c19a61ca8a0b" />
            <ul>
                <li>
                    <InlineSnippet>react</InlineSnippet> and{' '}
                    <InlineSnippet>react-dom</InlineSnippet> become dependencies of the server app.
                    We will need to install them so Node.js can import them via require.
                    <BlockSnippet>
                        npm i -S react react-dom
                        <br />
                        npm i -D @types/react @types/react-dom
                    </BlockSnippet>
                </li>
                <li>
                    We need to import the React app from a Node.js compatible bundle. This bundle
                    will be generated from the client project with different Webpack configuration
                    and it needs to be available to the server. In this example, it will be located
                    in a <InlineSnippet>ssr</InlineSnippet> directory (i.e.{' '}
                    <InlineSnippet>require('../ssr/app.js')</InlineSnippet>).
                </li>
                <li>
                    The <InlineSnippet>renderToString</InlineSnippet> function expects a React node,
                    not a React component. We need to wrap the function component in a{' '}
                    <InlineSnippet>React.createElement</InlineSnippet> call.
                </li>
                <li>
                    The <InlineSnippet>renderToString</InlineSnippet> function produces the
                    following HTML, but we need to send a full HTML document to the client. Note
                    that we also need that document to load the client Javascript bundle. A simple
                    way of creating the HTML document is by reading the static file we were
                    previously serving and appending the server rendered HTML into the{' '}
                    <InlineSnippet>app-placeholder</InlineSnippet> element.
                    <BlockSnippet>
                        {'<'}h1{'>'}Hello World!{'<'}/h1{'>'}
                    </BlockSnippet>
                </li>
            </ul>
            <h3>Webpack SSR setup</h3>
            <p>
                The main issue with the client Webpack bundle is that it is built to run on a
                browser. Importing it from the Node.js server will raise all sort of errors. On one
                hand, the client bundle tries to mount the React app to the browser document. Since
                in Node.js there is no document we will need to skip the mount.
            </p>
            <p>
                For that we will need a separate webpack file that specifies{' '}
                <InlineSnippet>app.tsx</InlineSnippet> as the entry point and extracts the output to
                some directory in the server project (in this example, I'm calling the directory{' '}
                <InlineSnippet>ssr</InlineSnippet>). We will also add an npm script to package.json
                to build the Node.js bundle (i.e. <InlineSnippet>build:ssr</InlineSnippet>).
            </p>
            <BlockSnippet>
                "build:ssr": "rm -rf ../server/ssr && webpack --config webpack/ssr.config.js",
            </BlockSnippet>
            <p>
                On the other hand, webpack replaces the export statements and includes the client
                side dependencies. We need to keep the exports so Node.js can require the React app.
                And, if some of our dependencies relay on running in the browser, they might raise
                exceptions when required from the server side. Let's add a couple tweaks to the SSR
                webpack configuration.
            </p>
            <ReactGist id="eb61d26dc971f8035a005b3e488078d0" />
            <ul>
                <li>
                    <p>
                        <b>output.libraryTarget / target</b>. Setting this properties to{' '}
                        <InlineSnippet>umd</InlineSnippet> and <InlineSnippet>node</InlineSnippet>{' '}
                        will make the bundle exports compatible with Node.js.
                    </p>
                    <ArticleImage
                        articleId={ArticleId.reactSsr}
                        filename="node-targeted-bundle-diff.png"
                        footer="Change in the webpack generated bundle"
                        className="image-600"
                    />
                </li>
                <li>
                    <p>
                        <b>externals</b>.{' '}
                        <Anchor url="https://webpack.js.org/configuration/externals/">
                            this configuration option
                        </Anchor>{' '}
                        provides a way of excluding dependencies from the output bundles, assuming
                        they will be made available by the consumer of the bundle instead. Used
                        along with{' '}
                        <Anchor url="https://www.npmjs.com/package/webpack-node-externals">
                            webpack-node-externals
                        </Anchor>{' '}
                        it will exclude all modules from the{' '}
                        <InlineSnippet>node_modules</InlineSnippet> directory.
                    </p>
                    <ArticleImage
                        articleId={ArticleId.reactSsr}
                        filename="webpack-default-build.png"
                        footer="Size of the client webpack bundle"
                        className="image-600"
                    />
                    <ArticleImage
                        articleId={ArticleId.reactSsr}
                        filename="webpack-node-build.png"
                        footer="Size of the Node.js webpack bundle"
                        className="image-600"
                    />
                </li>
            </ul>
            <p>
                The generated bundle is now compatible with Node.js, so it can be rendered on the
                server side 🎉 See{' '}
                <Anchor url="https://github.com/capelski/react-ssr/compare/starting-point...basic-ssr">
                    this change set
                </Anchor>{' '}
                for more details.
            </p>
            <ArticleImage
                articleId={ArticleId.reactSsr}
                filename="server-rendered-html.png"
                footer="HTML rendered by the server"
                className="image-600"
            />
            <h3>Routing</h3>
            <p>
                Most modern apps use client side routing. Let's make our React app a bit more
                relevant by adding <InlineSnippet>react-router</InlineSnippet> and a couple of
                different routes. Note that the <InlineSnippet>BrowserRouter</InlineSnippet> must be
                provided in the <InlineSnippet>index.tsx</InlineSnippet> file; doing so on{' '}
                <InlineSnippet>app.tsx</InlineSnippet> would cause errors on the server side, as the
                router references the window document.
            </p>
            <BlockSnippet>cd client && npm i -S react-router</BlockSnippet>
            <ReactGist id="72cc7be9f5179130b5680ec9cd82f6a4" />
            <p>
                Now we need to adapt the server rendering to support the in-app routing. We need to
                install <InlineSnippet>react-router</InlineSnippet> as a dependency of the server
                and then render the app within a router component. Because{' '}
                <InlineSnippet>BrowserRouter</InlineSnippet> is not supported on the server side, we
                will use <InlineSnippet>StaticRouter</InlineSnippet> instead. Passing the URL of the
                http request to the router via the location parameter is enough for it to know which
                component to render.
            </p>
            <ReactGist id="2e7b86df2bb51da25f99488be2f91756" />
            <p>
                Lastly we need to modify the express middleware to intercept requests to the new
                route (i.e. "/login") and render the app at that path. We now support deep links
                server rendering 🍻 See{' '}
                <Anchor url="https://github.com/capelski/react-ssr/compare/basic-ssr...routing">
                    this change set
                </Anchor>{' '}
                for more details .
            </p>
            <ArticleImage
                articleId={ArticleId.reactSsr}
                filename="deep-links-server-rendering.png"
                footer="HTML rendered by the server at the corresponding route"
                className="image-600"
            />
            <h3>Fetching data on app start</h3>
            <p>
                Finally let's fetch some data asynchronously during the app initialization. Let's
                say we want to fetch a list of user names from the server and display them in the
                home page (simple use case for demonstration purposes). We will add a new endpoint
                (e.g. <InlineSnippet>/api/user-names</InlineSnippet>) that retrieves the user names
                and we will query it during the Home page initialization. In function components
                this is usually done via <InlineSnippet>useEffect</InlineSnippet> hooks.
            </p>
            <ReactGist id="65ba7f90b2a8b24f749f0b1cb0a3b4c6" />
            <ReactGist id="2c3fe8b74db07d93499b95e212113c30" />
            <ArticleImage
                articleId={ArticleId.reactSsr}
                filename="server-rendered-html-loading.png"
                footer="List of user names in the client app"
                className="image-600"
            />
            <p>
                While the client version works, it turns out the server rendered HTML doesn't
                contain the list of user names. This happens because React doesn't trigger
                <InlineSnippet>useEffect</InlineSnippet> hooks outside of the browser. Since we want
                the server rendered HTML to include the list of user names, we will need to fetch
                them outside of the hooks.
            </p>
            <p>
                One way to do it is modifying the React app so it can receive the list of user names
                via props. We can then fetch the list of user names outside of the React lifecycle
                and render the app once the data is ready, passing the data via props. With this
                change the resulting server rendered HTML will now contain the list of user names 👍
            </p>
            <ReactGist id="c955c94e24a85eccbff4bc140e7848aa" />
            <ReactGist id="1995b1b8c19b2278188025c97904f099" />
            <ArticleImage
                articleId={ArticleId.reactSsr}
                filename="server-rendered-html-list.png"
                footer="HTML rendered by the server including the list of user names"
                className="image-600"
            />
            <p>
                Note however that, when running in the browser, the React app doesn't recognize it
                had already been rendered in the server; it displays the loader and fetches the list
                of user names again. If we can prevent the redundant fetch request we will consume
                less resources and will improve the user experience as well.
            </p>
            <ArticleImage
                articleId={ArticleId.reactSsr}
                filename="redundant-fetch-request.png"
                footer="Redundant fetch request triggered by the client app rendering"
                className="image-600"
            />
            <p>
                Fortunately it is not complicated. We just need to make the initial state we used on
                the server side available to the client side, and inject them to React when
                initializing the app. Note that the <InlineSnippet>useEffect</InlineSnippet> will
                still run in the browser. We cannot remove it if we want the list to be refreshed
                upon back and forth navigation, and it is convenient to keep it for development mode
                as well (the app will not have been rendered in the server). What we can do is
                preventing the fetch request when we already have a list of user names.
            </p>
            <ReactGist id="0bc99e1b52cfd4c8a4cc38d912177742" />
            <p>
                <i>
                    According to the{' '}
                    <Anchor url="https://react.dev/reference/react-dom/client/hydrateRoot#hydrateroot">
                        React docs
                    </Anchor>
                    , the <InlineSnippet>hydrateRoot</InlineSnippet> function can be used to “attach
                    React to existing HTML that was already rendered by React in a server
                    environment". At practice though I couldn't observe any different behavior
                    between{' '}
                    <InlineSnippet>
                        hydrateRoot(container, {'<'}AppWithRouter {'{'}...initialState{'}'} /{'>'})
                    </InlineSnippet>{' '}
                    and{' '}
                    <InlineSnippet>
                        createRoot(container).render({'<'}AppWithRouter {'{'}...initialState{'}'} /
                        {'>'})
                    </InlineSnippet>
                    .
                </i>
            </p>
            <ArticleImage
                articleId={ArticleId.reactSsr}
                filename="rehydrated-state.png"
                footer="Client rendered app without redundant fetch request"
                className="image-600"
            />
            <p>
                That's it! React SSR with support for deep links and asynchronous data fetching 💃
                See{' '}
                <Anchor url="https://github.com/capelski/react-ssr/compare/routing...data-fetching">
                    this change set
                </Anchor>{' '}
                for more details and star the{' '}
                <Anchor url="https://github.com/capelski/react-ssr">entire repository</Anchor> for
                future reference. Happy coding!
            </p>
            <h3>Troubleshooting</h3>
            <ul>
                <li>
                    <p>
                        A dependency of the client bundle has not been installed on the server (e.g.
                        react, react-dom, react-router, etc.).
                    </p>
                    <BlockSnippet>
                        [nodemon] starting `ts-node source/server.ts`
                        <br />
                        Error: Cannot find module 'react'
                        <br />
                        Require stack:
                        <br />
                        &emsp;- react-ssr/server/source/server.ts
                    </BlockSnippet>
                </li>
                <li>
                    <p>
                        The server assets bundle contains references to{' '}
                        <InlineSnippet>document</InlineSnippet> or dependencies that relay on it.
                    </p>
                    <BlockSnippet>
                        ReferenceError: document is not defined
                        <br />
                        &emsp;at Object.596 (react-ssr/server/static/main.js:2:139274)
                        <br />
                        &emsp;at t (react-ssr/server/static/main.js:2:139761)
                        <br />
                        &emsp;at react-ssr/server/static/main.js:2:139801
                        <br />
                        &emsp;at Object.{'<'}anonymous{'>'}{' '}
                        (react-ssr/server/static/main.js:2:139808)
                        <br />
                    </BlockSnippet>
                </li>
                <li>
                    <p>
                        The server assets bundle is not exporting the React app via Node.js exports.
                        Most likely Webpack is not specifying the right target/libraryTarget.
                    </p>
                    <BlockSnippet>
                        TypeError: App is not a function
                        <br />
                        &emsp;at react-ssr/server/source/server.ts:11:34
                        <br />
                        &emsp;at Generator.next ({'<'}anonymous{'>'})<br />
                        &emsp;at react-ssr/server/source/server.ts:8:71
                        <br />
                    </BlockSnippet>
                </li>
                <li>
                    <p>
                        <InlineSnippet>renderToString</InlineSnippet> is receiving a React component
                        (i.e. <InlineSnippet>renderToString(App)</InlineSnippet>) instead of a React
                        node (i.e. <InlineSnippet>renderToString(createElement(App))</InlineSnippet>
                        ).
                    </p>
                    <BlockSnippet>
                        Warning: Functions are not valid as a React child. This may happen if you
                        return a Component instead of {'<'}Component /{'>'} from render. Or maybe
                        you meant to call this function rather than return it.
                    </BlockSnippet>
                </li>
                <li>
                    <p>
                        The React app includes a browser based router (e.g.{' '}
                        <InlineSnippet>BrowserRouter</InlineSnippet> or{' '}
                        <InlineSnippet>HashRouter</InlineSnippet>) which ends up in the server
                        assets. The server version must use a compatible version instead (e.g.{' '}
                        <InlineSnippet>StaticRouter</InlineSnippet>).
                    </p>
                    <BlockSnippet>
                        react-ssr/server/node_modules/react-router/dist/development/index.js:404
                        <br />
                        let {'{'} window: window2 = document.defaultView, v5Compat = false {'}'} =
                        options;
                        <br />
                        <br />
                        ReferenceError: document is not defined
                        <br />
                        &emsp;at getUrlBasedHistory
                        (react-ssr/server/node_modules/react-router/dist/development/index.js:404:27)
                    </BlockSnippet>
                </li>
                <li>
                    <p>The server is not providing a router component when rendering the App.</p>
                    <BlockSnippet>
                        react-ssr/server/node_modules/react-router/dist/development/index.js:336
                        <br />
                        throw new Error(message);
                        <br />
                        <br />
                        Error: useLocation() may be used only in the context of a {'<'}Router{'>'}{' '}
                        component.
                        <br />
                        &emsp;at invariant
                        (react-ssr/server/node_modules/react-router/dist/development/index.js:336:11)
                    </BlockSnippet>
                </li>
                <li>
                    <p>
                        The server is calling the React app function directly (i.e.{' '}
                        <InlineSnippet>renderToString(App)</InlineSnippet>), instead of rendering it
                        within the React lifecycle (i.e.{' '}
                        <InlineSnippet>renderToString(createElement(App))</InlineSnippet>).
                    </p>
                    <BlockSnippet>
                        Warning: Invalid hook call. Hooks can only be called inside of the body of a
                        function component. This could happen for one of the following reasons:
                        <br />
                        1. You might have mismatching versions of React and the renderer (such as
                        React DOM)
                        <br />
                        2. You might be breaking the Rules of Hooks
                        <br />
                        3. You might have more than one copy of React in the same app
                        <br />
                        See https://reactjs.org/link/invalid-hook-call for tips about how to debug
                        and fix this problem.
                        <br />
                        react-ssr/server/node_modules/react/cjs/react.development.js:1622
                        <br />
                        return dispatcher.useState(initialState);
                        <br />
                        <br />
                        TypeError: Cannot read properties of null (reading 'useState')
                        <br />
                        &emsp;at useState
                        (react-ssr/server/node_modules/react/cjs/react.development.js:1622:21){' '}
                        <br />
                    </BlockSnippet>
                </li>
                <li>
                    <p>
                        The server assets bundle includes dependencies that are not supported on the
                        server. Most likely Webpack is not specifying the right externals property.
                    </p>
                    <BlockSnippet>
                        TypeError: Cannot read properties of null (reading 'useContext')
                        <br />
                        &emsp;at Object.t.useContext (react-ssr/server/ssr/app.js:2:9370)
                        <br />
                        &emsp;at zt (react-ssr/server/ssr/app.js:2:78603)
                        <br />
                        &emsp;at react-ssr/server/ssr/app.js:2:126961
                        <br />
                        &emsp;at renderWithHooks
                        (react-ssr/server/node_modules/react-dom/cjs/react-dom-server-legacy.node.development.js:5662:16)
                    </BlockSnippet>
                </li>
            </ul>
        </React.Fragment>
    )
};
