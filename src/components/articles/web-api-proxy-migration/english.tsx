import React from 'react';
import ReactGist from 'react-gist';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { BlockSnippet } from '../block-snippet';
import { InlineSnippet } from '../inline-snippet';

export const english: ArticleContent = {
    title: 'Gradual replacement of legacy web APIs using 404 responses and http-proxy',
    description: 'How to gradually replace a legacy web API with 404 responses and http-proxy',
    shareSentence:
        'Start migrating your legacy web API today! 404 responses and http-proxy will let you do it gradually',
    introduction: (
        <p>
            Re-writing a legacy web API takes time and the exercise will probably span across
            several releases. We will most likely be facing a scenario were both APIs run in
            parallel, having the old system servicing endpoints that haven't been migrated yet. But
            it turns out such an scenario can be achieved painlessly by using the good old
            http-proxy library and 404 responses! Here is how.
        </p>
    ),
    body: (
        <React.Fragment>
            <ArticleImage
                articleId={ArticleId.webApiProxyMigration}
                alt="Abstract representation of a web proxy"
                filename="web-proxy.png"
            />
            <h3>Personal statement</h3>
            <p>
                Legacy web APIs can feel excessively complex, are often built on top of discontinued
                technologies and are sometimes based on design principles that are not aligned with
                the evolution of the underlying programming language (e.g. callback hell vs
                promises). We developers dream of re-building such web APIs from scratch, using
                modern frameworks, with simplicity in mind and addressing all the blind spots that
                previous software engineers failed to perceive back in day. Oh boy, what a brilliant
                job we would do!
            </p>
            <p>
                And, if we stick to a company for long enough, if we mention in the appropriate
                meetings how concerned we are for the security risks of relying on a discontinued
                framework, if we are lucky, we might witness a rare miracle: management giving the
                green light for a platform re-write.
            </p>
            <p>
                Wonderful news! Let's assemble the engineers, pick the latest and most promising web
                framework, start drawing architecture diagrams, set overconfident time estimates and
                maybe even hire a new person or two. This re-write will be finalized in a matter of
                months 👏
            </p>
            <p>
                But then, even if we could re-write the system that fast, would we dare to execute a
                full transition to the new infrastructure? The legacy system might have its flaws
                but it works and it's well tested. It has matured over the years. Can we guarantee
                that the new platform dots all the i's and crosses all the t's?
            </p>
            <p>
                Let's be cautious for once. Finding a way to integrate the new platform with the old
                one would allow us to transition to the new platform gradually, validating the new
                software progressively and not losing any features along the way. Here is a
                transparent way of introducing a new server to the equation while keeping the old
                server fully functional.
            </p>
            <h3>The meat on the bone</h3>
            <p>
                Let's take the following sample Express web API. For the sake of simplicity it only
                has two endpoints; a POST endpoint that consumes a JSON body and a GET endpoint that
                can return 404.
            </p>
            <ReactGist id="87c4858cb7c46ac3a6db8407884f2744" />
            <p>
                Let's now assume the time has arrived to migrate the server to a newer platform 💃
                Express is a perfectly solid framework but there are other frameworks out there
                which add other functionality on top of it and which happen to support Typescript
                out of the box. Frameworks such as <Anchor url="https://nestjs.com/">NestJS</Anchor>
                . Here is what an empty NestJS server would look like.
            </p>
            <ReactGist id="39fb1b2f7baa6ab09959046f34036ab6" />
            <p>
                From now on the NestJS server will be the new front door and it will forward
                requests to endpoints that haven't been migrated yet to the express server. Let's
                use docker-compose to launch the new infrastructure and then fire a sample request
                via curl:
            </p>
            <ReactGist id="6f95b7fe0012f86f8349de0e08e718df" />
            <BlockSnippet>
                curl http://localhost:3000/get-endpoint/valid-id
                <br />
                <br />
                {'{'}"message":"Cannot GET /get-endpoint/id","error":"Not Found","statusCode":404
                {'}'}
            </BlockSnippet>
            <p>
                At this point all requests result in 404. What we need to do next is implementing
                the forwarding to the express server on the NestJS server. We can do so using a
                NestJS mechanism called Filter (to intercept NotFoundException errors) and the{' '}
                <InlineSnippet>http-proxy</InlineSnippet> library (to forward the corresponding
                requests to the express server):
            </p>
            <BlockSnippet>npm install --save http-proxy</BlockSnippet>
            <br />
            <ReactGist id="9075c1a675366cf20690e47efe51b0f4" />
            <BlockSnippet>
                curl http://localhost:3000/get-endpoint/valid-id
                <br />
                <br />
                Hello world
            </BlockSnippet>
            <p>
                Before moving on pay attention to the change in the creation of the Nest
                application; we need to explicitly disable the parsing of the requests body (i.e.{' '}
                <InlineSnippet>
                    {'{'} bodyParser: false {'}'}
                </InlineSnippet>
                ). This is necessary because we need the original raw body when forwarding requests
                to the express server; otherwise express will error out when trying to parse it
                again. We will need to remember this when adding endpoints that need to parse the
                body, and add explicit parsing for each endpoint/controller.
            </p>
            <BlockSnippet>
                curl -X POST -H 'content-type:application/json' -d '{'{'} "property": "value" {'}'}'
                http://localhost:3000/post-endpoint
                <br />
                <br />
                Something broke
            </BlockSnippet>
            <p>
                Ok then! We have a new server in place that forwards requests to the already
                existing server. This can safely be deployed to production and all web API calls
                should continue to work correctly (ignoring SSL and IP addresses configurations
                here). From this point onwards it's all about gradually migrating the old endpoints
                to the new platform.
            </p>
            <p>
                Let's start by migrating the POST endpoint. Should be simple enough. Remember we
                disabled the default body parsing earlier so the requests' body will be empty by
                default. We will need to install the <InlineSnippet>body-parser</InlineSnippet>{' '}
                library and configure the corresponding Nest module to use it:
            </p>
            <BlockSnippet>npm install --save body-parser</BlockSnippet>
            <br />
            <ReactGist id="7efae40b439e8d502c22c2a796aecb61" />
            <BlockSnippet>
                curl -X POST -H 'content-type:application/json' -d '{'{'} "property": "value" {'}'}'
                http://localhost:3000/post-endpoint
                <br />
                <br />
                Hello world. {'{'}"property":"value"{'}'}
            </BlockSnippet>
            <p>
                And let's finally migrate the GET endpoint. It is a simple endpoint too and it can
                implemented in a variety of ways:
            </p>
            <ReactGist id="89d9e6ec99832f9bbf05c23116989a23" />
            <BlockSnippet>
                curl http://localhost:3000/get-endpoint/valid-id
                <br />
                <br />
                Hello world
            </BlockSnippet>
            <BlockSnippet>
                curl http://localhost:3000/get-endpoint/invalid-id
                <br />
                <br />
                {'{'}"statusCode":404,"message":"Not Found"{'}'}
            </BlockSnippet>
            <p>
                Another common way of implementing the endpoint in NestJS would be to use the{' '}
                <InlineSnippet>NotFoundException</InlineSnippet>. Note however that using such class
                would have an unintended consequence. Because the{' '}
                <InlineSnippet>NotFoundFilter</InlineSnippet> we implemented earlier catches
                NotFoundException and proxies them to the express server, the 404 returned by the
                NestJS endpoint would be treated as a not implemented endpoint. This would make the
                request slower and increase the CPU usage for no good reason.
            </p>
            <ReactGist id="5a8c4ea64c5508149f1a9f8cd046b7cd" />
            <BlockSnippet>
                curl http://localhost:3000/get-endpoint/invalid-id
                <br />
                <br />
                Not Found
            </BlockSnippet>
            <BlockSnippet>
                nestjs-server-1 | [Nest] 22 - 11/05/2024, 11:00:57 PM LOG [NotFoundException]
                Proxying GET /get-endpoint/invalid-id...
            </BlockSnippet>
            <p>
                Fantastic! We have completed the migration and the express server can now be safely
                decommissioned 🎉 I wish all web API migrations were this simple. Before you go here
                is a{' '}
                <Anchor url="https://github.com/capelski/web-api-proxy-migration">
                    Git repository
                </Anchor>{' '}
                with the code above and one suggestion learned from experience; adding a custom
                response header on each server will help you identifying which server is servicing
                each request.
            </p>
        </React.Fragment>
    )
};
