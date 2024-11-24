import React from 'react';
import ReactGist from 'react-gist';
import { NavLink } from 'react-router-dom';
import { articleRoute } from '../../routes';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { InlineSnippet } from '../inline-snippet';

export const english: ArticleContent = {
    title: '@typed-web-api: type safety for fetch requests',
    description:
        "How to use @express-typed-api to declare a type for an express API and automatically infer the corresponding network requests' return type",
    shareSentence: "Automatically infer network requests' return type through @express-typed-api",
    introduction: (
        <p>
            Writing a web app in Typescript provides type safety in both the client and the server
            but, what about the communication between the two sides? The payload of network requests
            remains untyped by default, boycotting our attempts to keep a consistent code base. With
            that idea in mind I wrote <InlineSnippet>@typed-web-api</InlineSnippet>, a minimalist
            approach to adding type safety to fetch requests. Here is how to use it.
        </p>
    ),
    body: (
        <React.Fragment>
            <ArticleImage
                alt="Telecommunications antenna"
                articleId={ArticleId.typedWebApi}
                className="image-600"
                filename="antenna.jpg"
            />
            <p>
                typed-web-api comes in three parts. First we must create a type definition for the
                web API via{' '}
                <Anchor url="https://www.npmjs.com/package/@typed-web-api/common">
                    <InlineSnippet>@typed-web-api/common</InlineSnippet>
                </Anchor>
                . The type definition is a description of all the endpoints, including their path,
                method and response type. Optionally we can specify their request payload type too.
            </p>
            <p>
                This is what the type declaration would look like for a sample web API with three
                endpoints: <InlineSnippet>POST /users/login</InlineSnippet>,{' '}
                <InlineSnippet>GET /users</InlineSnippet>,{' '}
                <InlineSnippet>GET /users/:userId</InlineSnippet>.
            </p>
            <ReactGist id="865f920a3af0ea5125770ff5db898940" />
            <ul>
                <li>
                    Each endpoint must be listed using the{' '}
                    <InlineSnippet>/path_method</InlineSnippet> format. This opinionated format is a
                    simple convention that allows the library for validating the payload request
                    type depending on the method.
                </li>
                <li>
                    Splitting the type declarations into subtypes is not necessary, but doing so
                    will make it easier to implement the server endpoints in different controllers
                    (a common practice on the server side).
                </li>
            </ul>
            <p>
                Next we can start adding type safety to the client side network requests using{' '}
                <Anchor url="https://www.npmjs.com/package/@typed-web-api/client">
                    <InlineSnippet>@typed-web-api/client</InlineSnippet>
                </Anchor>
                . For that we will need to obtain a typed instance of the browser-native{' '}
                <InlineSnippet>fetch</InlineSnippet> function, by passing the previously created
                type definition to the <InlineSnippet>getTypedFetch</InlineSnippet> method. Using
                the typed fetch function the return type of the network requests will be inferred by
                Typescript automatically. Using <InlineSnippet>@typed-web-api/client</InlineSnippet>{' '}
                requires a few minor changes:
            </p>
            <ReactGist id="894bee8b6839e70dbeca64107003d88e" />
            <ul>
                <li>
                    We must obtain the typed fetch function by calling{' '}
                    <InlineSnippet>getTypedFetch</InlineSnippet>, passing the API type declaration
                    as a type parameter. The returned function can be used everywhere in the client
                    app.
                </li>
                <li>
                    All calls to typed fetch must provide the method along with the path, following
                    the <InlineSnippet>/path_method</InlineSnippet> format used in the API type
                    definition.
                </li>
                <li>
                    Additional parameters of fetch calls must be passed to the typed fetch function
                    via the <InlineSnippet>init</InlineSnippet> parameter.
                    <ReactGist id="7a974fc01a979ed0fb95e835f8600799" />
                </li>
                <li>
                    When using query string parameters (i.e.{' '}
                    <InlineSnippet>/users?limit=25</InlineSnippet>) or URL parameters (i.e.{' '}
                    <InlineSnippet>/users/xyz</InlineSnippet>) the values must be passed via the{' '}
                    <InlineSnippet>queryString</InlineSnippet> or{' '}
                    <InlineSnippet>urlParams</InlineSnippet> properties:
                    <ReactGist id="206c5fbbcff14d23a5b9ebab7ac74b0b" />
                </li>
                <li>
                    When using typed request payloads, the typed fetch function will expect the
                    request payload to be provided via the corresponding properties.
                    <ArticleImage
                        articleId={ArticleId.typedWebApi}
                        filename="request-payload-validation.png"
                        footer="Typescript validation of the request payload in VSCode"
                    />
                </li>
            </ul>
            <p>
                Finally, the server side. Here we need to make sure that the web API implementation
                satisfies the type definition we have generated earlier. This will vary depending on
                the framework the web API is built with.{' '}
                <InlineSnippet>@typed-web-api</InlineSnippet> supports two popular frameworks:
                express and NestJS.
            </p>
            <p>
                Consider the following implementation of the sample endpoints described above (I'm
                using NestJS here but there are examples for both platforms in the{' '}
                <Anchor url="https://github.com/capelski/typed-web-api">official repository</Anchor>
                ). In this code the return type of each endpoint is determined by the type the
                returned payload happens to have.
            </p>
            <ReactGist id="08985890a45287f2f90a3d632cf1ca36" />
            <p>
                Using{' '}
                <Anchor url="https://www.npmjs.com/package/@typed-web-api/nestjs">
                    <InlineSnippet>@typed-web-api/nestjs</InlineSnippet>
                </Anchor>{' '}
                we can guarantee the return types are consistent with the web API type definition
                just by applying a couple tweaks:
            </p>
            <ReactGist id="8a247474814c16c7bf34a9697f5539a0" />
            <ul>
                <li>
                    Make the controller implement the type definition. By using the generic{' '}
                    <InlineSnippet>ServerEndpoints</InlineSnippet> interface we enforce the
                    controller to implement the endpoints passed in the type parameter, with the
                    appropriate return type. Note that{' '}
                    <InlineSnippet>ServerEndpoints</InlineSnippet> requires the methods' name to
                    contain the full pathname; controller prefixes must be removed (e.g.{' '}
                    <InlineSnippet>'/users'</InlineSnippet>).
                </li>
                <li>
                    Replace the NestJS method decorators with the almighty{' '}
                    <InlineSnippet>HttpMethod</InlineSnippet> decorator. This decorator is a simple
                    wrapper that calls the corresponding NestJS method decorators based on the
                    method included in function name, passing the pathname as parameter.
                </li>
            </ul>
            <p>
                And that's about it. This library is my second attempt at brining type safety to
                network requests and it benefits from my previous learnings (i.e.{' '}
                <NavLink to={articleRoute.path.replace(':articleId', ArticleId.typescriptMonorepo)}>
                    express-web-api
                </NavLink>
                ). It is meant to be generic, framework agnostic on the client side, and impose as
                little changes as possible in both sides of the code. I'm pretty confident with the
                result but, hey, one always thinks to have done an outstanding job in their limited
                understanding of the world. Let me know what you think about it if you have a go.
            </p>
        </React.Fragment>
    )
};
