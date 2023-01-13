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
    title: "@express-typed-api: inferring the fetch requests' return type",
    description:
        "How to use @express-typed-api to declare a type for an express API and automatically infer the corresponding fetch requests' return type",
    shareSentence:
        "Automatically infer your fetch requests' return type through @express-typed-api",
    introduction: (
        <p>
            Event though choosing Typescript to develop an express web app provides type safety in
            both client and server, the fetch requests data remains untyped on both ends,
            complicating our attempts to keep a consistent code base 🤬 With that idea in mind I
            wrote <InlineSnippet>@express-typed-api</InlineSnippet>, a library to help creating a
            type declaration for an express API so that it can be used to automatically infer the
            fetch requests' return type from the client side. Here is how to use it.
        </p>
    ),
    body: (
        <React.Fragment>
            <h3>The problem</h3>
            <p>
                Usually, when calling a Web API via <InlineSnippet>fetch</InlineSnippet>, we either
                settle with the <InlineSnippet>any</InlineSnippet> type of the response payload or
                we explicitly cast it to the type we expect it to be.
            </p>
            <ReactGist id="2be8474970323e3c4814e6ee13a629c2" />
            <p>
                Explicitly casting the payload's type does provide type safety but it's not ideal:
                it must be done for each different fetch call and, more importantly, it is not
                linked to the actual endpoint's return type. When we change an endpoint's return
                type, we also need to change the explicit casts accordingly for all of the
                endpoint's fetch calls.
            </p>
            <p>
                The idea behind <InlineSnippet>@express-typed-api</InlineSnippet> is generating a
                type declaration for the express API, with no dependencies on the server side, and
                in a way that Typescript can tell the return type of the API endpoints based on
                their path and method. That API type declaration is then provided to a fetch wrapper
                function, which uses the request URL and method to automatically infer the function
                return type. Let's get on with it!
            </p>
            <h3>Sample code</h3>
            <p>
                To better illustrate the explanations in this article I'll be applying the steps on
                a simple express API with a single get endpoint (i.e.{' '}
                <InlineSnippet>/api/weather</InlineSnippet>), that receives a city name via query
                string parameter and returns weather data for the specified city, and the
                corresponding client side fetch call. A fairly simple example, yet it involves all
                the necessary aspects to get automatic inferring going in any other express API.
            </p>
            <ReactGist id="2b1c6f55f38d1769cb2b4bb2c773e3af" />
            <ReactGist id="2c766ae92d278b2d284a25610e287b29" />
            <h3>1. API's type declaration</h3>
            <p>
                The first and obvious step is to define a type for our API, including each
                endpoint's path and method. A convenient way to generate such type consists in{' '}
                <b>declaring a type</b> containing the endpoints' return type as properties and
                using the endpoints' path/method as keys. This is what we are talking about:
            </p>
            <ReactGist id="8c63fc889423183f60c0ee9002e5f4c5" />
            <p>
                When using <InlineSnippet>@express-typed-api</InlineSnippet> we will declare our
                endpoints using the <InlineSnippet>EndpointHandler</InlineSnippet> generic type like
                so. <InlineSnippet>EndpointHandler</InlineSnippet> is meant to enforce the return
                type of the endpoints' handler and provides explicit typing for the handlers'
                express arguments (i.e. <InlineSnippet>req</InlineSnippet>,{' '}
                <InlineSnippet>res</InlineSnippet> and <InlineSnippet>next</InlineSnippet>).
            </p>
            <ReactGist id="6eb2b491b2af0ff8ea0eb02122833bbe" />
            <p>
                Make sure you create the API type declaration in a{' '}
                <NavLink to={articleRoute.path.replace(':articleId', ArticleId.typescriptMonorepo)}>
                    package/folder that can be imported from both client and server side
                </NavLink>
                , with <InlineSnippet>@express-typed-api/common</InlineSnippet> installed as a
                dependency.
            </p>
            <h3>2. Handlers' return type</h3>
            <p>
                The second step consists in making Typescript aware of the handlers' return type.
                Because express handlers send the response data by calling methods on the response
                object (e.g. <InlineSnippet>res.json</InlineSnippet>), Typescript is not aware of
                the handlers' return type (which is usually void). We will need to slightly change
                the implementation of each handler so that the data is returned as the function
                result instead.
            </p>
            <p>
                A simple way to do so consists in splitting the handler's actual logic and the
                response object manipulation into two separate functions. One will run the
                corresponding business logic and return the appropriate data while the other will
                just call the corresponding response method. This is what it looks like for our
                sample express API:
            </p>
            <ReactGist id="31d7557f3e8a32ce0a3b545de2eb706c" />
            <p>
                <i>
                    Note that, even though the express response object offers several methods to
                    return data (e.g. <InlineSnippet>res.send</InlineSnippet>),{' '}
                    <InlineSnippet>@express-typed-api</InlineSnippet> only works with{' '}
                    <InlineSnippet>res.json</InlineSnippet>.
                </i>
            </p>
            <ArticleImage
                articleId={ArticleId.expressTypedApi}
                filename="handler-payload-return-type.png"
                footer="Payload part of the endpoint handler's return type"
            />
            <p>
                Now Typescript gets access to the handler's return type 👌 When using{' '}
                <InlineSnippet>@express-typed-api</InlineSnippet> it's a good practice to type the
                endpoints' handler implementation with the types we created for the API type
                declaration, so we keep the handlers consistent with the type declaration.
            </p>
            <p>
                Note that, because we sometimes want to set the response's HTTP status code before
                sending the payload, we will need our handlers to return an object with two
                properties: <InlineSnippet>payload</InlineSnippet> (the type we are actually
                interested in) and <InlineSnippet>status</InlineSnippet> (an optional HTTP status
                code). You can optionally use the <InlineSnippet>EndpointResponse</InlineSnippet>{' '}
                class to simplify the handlers' return statement.
            </p>
            <ReactGist id="f8303dcb64189f7b808b4bb0b0ffb877" />
            <h3>3. Consistent API's implementation</h3>
            <p>
                The third step consists in validating that the endpoints' path and method used in
                the API's implementation match the values used in the API's type declaration. So far
                we have a type declaration for our API and we are using it in the handler's return
                type, but we would still run into trouble if we would change the path or method of
                an endpoint's handler but we forgot to update the corresponding part of the API's
                type declaration.
            </p>
            <p>
                To prevent that from happening we will need to extract the{' '}
                <InlineSnippet>path</InlineSnippet> and <InlineSnippet>method</InlineSnippet> values
                from the express{' '}
                <InlineSnippet>
                    app.{'<'}method{'>'}(path, handler)
                </InlineSnippet>{' '}
                calls and associate them with the corresponding{' '}
                <InlineSnippet>handler</InlineSnippet> so that Typescript can tell whether the
                values match the API's type declaration. A convenient way of doing so consists in
                mimicking the approach we used when declaring the API's type:{' '}
                <b>creating an object</b> containing the endpoints' handlers as properties and using
                the endpoints' path/method as keys.
            </p>
            <ReactGist id="548b3e036f8c4cd62a3991694339507c" />
            <p>
                Because we are typing such object with the API's type declaration, we make sure that
                the API's implementation will always be compliant with its type declaration. Now we
                only need to use the API representation object to replace the{' '}
                <InlineSnippet>
                    app.{'<'}method{'>'}
                </InlineSnippet>{' '}
                calls: <InlineSnippet>@express-typed-api/server</InlineSnippet> exports a{' '}
                <InlineSnippet>publishApi</InlineSnippet> function for that purpose.
            </p>
            <p>
                It receives an express app and an API representation object as parameters and it
                traverses the representation object properties, calling the necessary methods on the
                express app with the corresponding method, path and handler. This is what it looks
                like when used in our sample express API:
            </p>
            <ReactGist id="c8d6220e71e27430a2d4e21d8eda6168" />
            <i>
                <p>
                    Heads up! Having both the API's type declaration and API representation object
                    might feel like an unnecessary code duplication but it is indeed necessary. A
                    couple remarks worth mentioning:
                </p>
                <ul>
                    <li>
                        <p>
                            It would be possible to remove the API's type declaration and infer the
                            type from the API representation object instead, but we would then be
                            introducing dependencies on the server side code. Since we want to use
                            the API's type declaration on the client side, that is not an option.
                        </p>
                        <ArticleImage
                            articleId={ArticleId.expressTypedApi}
                            filename="inferred-api-type-declaration.png"
                            footer="API's type declaration inferred from the API representation object"
                        />
                    </li>
                    <li>
                        <p>
                            <InlineSnippet>@express-typed-api</InlineSnippet> exports an{' '}
                            <InlineSnippet>ApiEndpoints</InlineSnippet> helper type to validate the
                            API representation objects. Using it to type the API representation
                            object results in obstructing the Typescript inferring:
                        </p>
                        <ArticleImage
                            articleId={ArticleId.expressTypedApi}
                            filename="obstructed-return-type.png"
                            footer="Typescript inferring obstruction"
                        />
                    </li>
                </ul>
            </i>

            <h3>4. Fetch requests' return type inferring</h3>
            <p>
                With the API's type declaration available on the client side the final step is using
                it to infer the return type of the fetch calls.{' '}
                <InlineSnippet>@express-typed-api</InlineSnippet> contains a{' '}
                <InlineSnippet>typedFetch</InlineSnippet> function, a{' '}
                <InlineSnippet>fetch</InlineSnippet> wrapper that receives the endpoints' path and
                method as parameters and, apart from passing them to the actual fetch call, uses
                them to cast the response's json payload.
            </p>
            <ArticleImage
                articleId={ArticleId.expressTypedApi}
                filename="typed-fetch-usage.png"
                footer="typedFetch usage"
            />
            <p>
                <InlineSnippet>typedFetch</InlineSnippet> is exported in the{' '}
                <InlineSnippet>@express-typed-api/client</InlineSnippet> package via a getter
                function called <InlineSnippet>getTypedFetch</InlineSnippet>, that takes the API's
                type declaration as the type parameter and returns the corresponding instance of{' '}
                <InlineSnippet>typedFetch</InlineSnippet>. It can be called any number of times but
                the best practice is to call it once and use the returned function all across the
                client side code.
            </p>
            <p>
                Note also that using query string parameters (and/or express URL parameters) in the
                request's URL will result in a Typescript error when using{' '}
                <InlineSnippet>typedFetch</InlineSnippet>. Because the API's type declaration is
                defined with the endpoints' path instead of the actual requests' URL, i.e.{' '}
                <InlineSnippet>/api/weather</InlineSnippet> instead of{' '}
                <InlineSnippet>/api/weather?cityName=xyz</InlineSnippet> (or{' '}
                <InlineSnippet>/api/weather/:cityName</InlineSnippet> instead of{' '}
                <InlineSnippet>/api/weather/xyz</InlineSnippet>), Typescript will only accept path
                arguments that match one of the paths in the API's type declaration.
            </p>
            <ArticleImage
                articleId={ArticleId.expressTypedApi}
                filename="typed-fetch-invalid-query-string.png"
                footer="Invalid query string URL parameter"
            />
            <p>
                <InlineSnippet>typedFetch</InlineSnippet> resolves this issue by taking the query
                string parameters (or URL parameters) in a separate{' '}
                <InlineSnippet>query</InlineSnippet> property (or{' '}
                <InlineSnippet>params</InlineSnippet>) and then building the actual request's URL
                before passing it down to the underlying <InlineSnippet>fetch</InlineSnippet> call.
                Applied to our sample express API fetch request:
            </p>
            <ReactGist id="4f25d48d4fe7952395430cb6bc026a9b" />
            <ArticleImage
                articleId={ArticleId.expressTypedApi}
                filename="typed-fetch-query-string.png"
                footer="typedFetch usage with query string parameters"
            />
            <p>
                <i>
                    The existence of <InlineSnippet>getTypedFetch</InlineSnippet> is meant to
                    prevent code duplication in the <InlineSnippet>typedFetch</InlineSnippet> calls,
                    as using <InlineSnippet>typedFetch</InlineSnippet> directly would require each
                    call to provide type parameters, duplicating the function's arguments in the
                    function's type parameters.
                </i>
            </p>
            <ArticleImage
                articleId={ArticleId.expressTypedApi}
                filename="typed-fetch-explicit-parameters.png"
                footer="Possible implementation of typedFetch with explicit type parameters"
            />
            <h3>Additional features</h3>
            <p>
                Finally here are a couple other features that are likely to be needed in modern
                express APIs and <InlineSnippet>@express-typed-api</InlineSnippet> does support but,
                for the sake of simplicity, are not included in the sample express API. Plus a bonus
                feature to bring type safety to the request's payload as well 💪
            </p>
            <ul>
                <li>
                    <p>
                        <b>express middleware</b>. Sometimes we need to run additional middleware
                        before executing an endpoint's handler (e.g. authentication, request
                        parsing, etc.). Let's take the following POST endpoint, for which we want to
                        execute <InlineSnippet>express.json()</InlineSnippet> before running the
                        actual endpoint handler.
                    </p>
                    <ReactGist id="5709a982dd41b627368a156dc7692382" />
                    <p>
                        <InlineSnippet>@express-typed-api</InlineSnippet> exports a{' '}
                        <InlineSnippet>EndpointHandlerWithMiddleware</InlineSnippet> type for such
                        cases. When declaring an endpoint with this type its implementation will
                        expect an object with two properties: the actual{' '}
                        <InlineSnippet>handler</InlineSnippet> and{' '}
                        <InlineSnippet>middleware</InlineSnippet>, a function that receives the
                        endpoint handler and returns an array with any number of handlers that will
                        be executed in that order.
                    </p>
                    <ReactGist id="3087226f4539e35425e1aee3f43e695b" />
                    <ReactGist id="0fc0e9513dff375d0227d4ce7327777f" />
                </li>
                <li>
                    <p>
                        <b>baseUrl</b>. The API's type declaration does not contain the endpoints'
                        full URL but only relative paths. The{' '}
                        <InlineSnippet>getTypedFetch</InlineSnippet> function accepts an optional{' '}
                        <InlineSnippet>baseUrl</InlineSnippet> parameter that will prepend the
                        provided value to all the <InlineSnippet>typedFetch</InlineSnippet>{' '}
                        requests' URL. Note it can contain any value, not necessarily an absolute
                        URL.
                    </p>
                    <ReactGist id="88fe3f3b9ae0f5b95a201b61d9ec44be" />
                    <p>
                        <i>
                            In a similar fashion the server{' '}
                            <InlineSnippet>publishApi</InlineSnippet> method accepts a{' '}
                            <InlineSnippet>pathsPrefix</InlineSnippet> parameter that can be used to
                            remove a common prefix from the API's type declaration, while keeping it
                            in the endpoints' actual path.
                        </i>
                    </p>
                </li>
                <li>
                    <p>
                        <b>Typed request payload</b>.{' '}
                        <InlineSnippet>@express-typed-api</InlineSnippet> allows specifying the type
                        of the requests' payload (i.e. <InlineSnippet>body</InlineSnippet>,{' '}
                        <InlineSnippet>params</InlineSnippet> and{' '}
                        <InlineSnippet>query</InlineSnippet>) by providing an optional second type
                        parameter to <InlineSnippet>EndpointHandler</InlineSnippet>, containing any
                        combination of <InlineSnippet>jsonBody</InlineSnippet>,{' '}
                        <InlineSnippet>params</InlineSnippet> and/or{' '}
                        <InlineSnippet>query</InlineSnippet> types. The types will then be enforced
                        on both client requests and server endpoint handlers.
                    </p>
                    <ReactGist id="4f2bd5cb87b3250730c97b906fd10ffe" />
                    <ArticleImage
                        articleId={ArticleId.expressTypedApi}
                        filename="typed-request-payload-server.png"
                        footer="Request query type inferring on the server side"
                    />
                    <ArticleImage
                        articleId={ArticleId.expressTypedApi}
                        filename="typed-request-payload-client.png"
                        footer="Request query type inferring on the client side"
                    />
                </li>
            </ul>
            <p>
                And that's pretty much it. There are some more examples in the{' '}
                <Anchor url="https://github.com/capelski/express-typed-api/tree/main/projects/%40sample-express-app">
                    sample repository
                </Anchor>
                , and both{' '}
                <Anchor url="https://www.npmjs.com/package/@express-typed-api/server">
                    server
                </Anchor>{' '}
                and{' '}
                <Anchor url="https://www.npmjs.com/package/@express-typed-api/client">
                    client
                </Anchor>{' '}
                packages are available on npm, containing the API documentation in the README. Give
                it a try and, hopefully, it will turn out to be useful for you too. Happy coding!
            </p>
        </React.Fragment>
    )
};
