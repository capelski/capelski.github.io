import React from 'react';
import ReactGist from 'react-gist';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { BlockSnippet } from '../block-snippet';
import { InlineSnippet } from '../inline-snippet';

export const english: ArticleContent = {
    title: 'Supporting offline data on ever-changing database schemas',
    description: 'TODO',
    shareSentence:
        'This is how Trello-like apps support offline data on ever-changing database schemas',
    introduction: (
        <p>
            Apps that allow users to generate data while being offline (Trello, for example)
            generally provide a better user experience. They must resolve a challenge however:
            because the database schema naturally changes as the app evolves, the server must
            support incoming data generated on an old schema version. How? Here is my take on it.
        </p>
    ),
    body: () => {
        return (
            <React.Fragment>
                <ArticleImage
                    alt="Hard disk drive"
                    articleId={ArticleId.otfMigrations}
                    filename="hard-drive.jpg"
                />
                <h3>The challenge</h3>
                <p>
                    At the company I work for,{' '}
                    <Anchor url="https://peekvision.org/">Peek Vision</Anchor>, we collect eye
                    health data from patients in rural areas with little or no connectivity. This
                    means that devices must be able to collect data while being offline. And devices
                    stay offline for surprisingly long periods of time: usually several days, often
                    a couple weeks and sometimes even months.
                </p>
                <p>
                    When devices finally go online they send the data they have collected to the
                    server. Which, like most web APIs, performs validations on it: if the incoming
                    data doesn't have the expected format it will be rejected. Nothing unusual. But
                    turns out that, as the app evolves and new software is released, the expected
                    formats can change, potentially rendering invalid data collected on offline
                    devices running on a previous software release.
                </p>
                <p>
                    Having hundreds of active users there will hardly be any moments where all
                    devices have synced their data. Therefore we needed a mechanism to allow data
                    generated on a previous release to be accepted by the server running on a newer
                    release. We called that mechanism on-the-fly migrations, or OTF migrations for
                    short.
                </p>
                <p>
                    The idea behind OTF migrations is quite straightforward: intercepting arriving
                    data before validating it and applying required migrations if necessary. OTF
                    migrations can be implemented at either global level or endpoint level.
                    Personally, I find it cleaner to go for the endpoint level, but both approaches
                    are equally valid:
                </p>
                <ul>
                    <li>
                        A global interceptor defines a single entry point for migrations, making
                        endpoints migrations agnostic, but it requires checking the request method
                        (we will only want to migrate request that have a body) and evaluating the
                        requests' URL to decide which migrations need to run on a given payload.
                    </li>
                    <li>
                        Endpoint-level interceptors split the migrations into several entry points,
                        making endpoints migrations aware, but it produces simpler interceptors
                        code.
                    </li>
                </ul>
                <h3>Hands on</h3>
                <p>
                    Consider a Trello-like app that allows creating notes in offline devices. The
                    notes contains just a text field and the server has an endpoint that receives
                    one note at a time, to which offline notes are posted when devices go online.
                    This is what a NestJS implementation could look like, plus a sample client call:
                </p>
                <ReactGist id="989f37b845ea0ee16907b021c5413eb3" />
                <p>
                    <i>
                        The implementation will obviously vary depending on the server framework.
                        Here I'm using NestJS but the core idea is applicable to any framework.
                    </i>
                </p>
                <BlockSnippet>
                    $ curl \
                    <br />
                    &emsp;--header "Content-Type: application/json" \
                    <br />
                    &emsp;--request POST \
                    <br />
                    &emsp;--data "{'{'}\"text\": \"Write that medium article I've been postponing\"
                    {'}'}" \
                    <br />
                    &emsp;http://localhost:3000/notes
                    <br />
                    <br />
                    {'{'}"text":"Write that medium article I've been postponing"{'}'}
                </BlockSnippet>
                <p>
                    So far so good. Now it's time to introduce some breaking changes 💣 Let's assume
                    that, at some point, we decide the notes will have a title and a description
                    instead of a single text field.
                </p>
                <p>
                    We will change the database schema accordingly and write a script to migrate the
                    existing data in the database. We will update the app as well to post the notes
                    with a title and an optional description. Not a trivial change, but simple
                    enough:
                </p>
                <ReactGist id="e7ea8df7d127fceccd36c7bff9f56899" />
                <BlockSnippet>
                    $ curl \
                    <br />
                    &emsp;--header "Content-Type: application/json" \
                    <br />
                    &emsp;--request POST \
                    <br />
                    &emsp;--data "{'{'}\"title\": \"Enough excuses\", \"description\": \"Write that
                    medium article I've been postponing\"{'}'}" \
                    <br />
                    &emsp;http://localhost:3000/notes
                    <br />
                    <br />
                    {'{'}"title": "Enough excuses", "description": "Write that medium article I've
                    been postponing"{'}'}
                </BlockSnippet>
                <p>
                    Note however that some devices might have generated offline data using the old
                    schema (i.e. a note with a single text field), and they might not have synced
                    the data by the time we deploy the changes to the live environment. In those
                    cases the incoming notes will result in a validation error:
                </p>
                <BlockSnippet>
                    $ curl \
                    <br />
                    &emsp;--header "Content-Type: application/json" \
                    <br />
                    &emsp;--request POST \
                    <br />
                    &emsp;--data "{'{'}\"text\": \"Write that medium article I've been postponing\"
                    {'}'}" \
                    <br />
                    &emsp;http://localhost:3000/notes
                    <br />
                    <br />
                    {'{'}"message":["title must be a string"],"error":"Bad Request","statusCode":400
                    {'}'}
                </BlockSnippet>
                <p>
                    Here is where OTF migrations will come handy. In a nutshell, we want to
                    manipulate the request body before the{' '}
                    <InlineSnippet>class-validator</InlineSnippet> logic kicks in. There are several
                    ways to achieve this in NestJS and here I'll use interceptors.
                </p>
                <p>
                    <i>
                        We could use middleware as well, but I find that slightly more obscure for
                        this use case, as the Nest middleware must be applied to modules, whereas
                        interceptors can be applied to specific endpoints.
                    </i>
                </p>
                <p>
                    An interceptor class must implement the{' '}
                    <InlineSnippet>NestInterceptor</InlineSnippet> interface, and it can then be
                    applied to any endpoint via the <InlineSnippet>UseInterceptors</InlineSnippet>{' '}
                    decorator. Here is what our interceptor could look like and how to use it in the
                    note creation endpoint:
                </p>
                <ReactGist id="e3620e90cc699cb82fc6a5e89b8c76a9" />
                <BlockSnippet>
                    $ curl \
                    <br />
                    &emsp;--header "Content-Type: application/json" \
                    <br />
                    &emsp;--request POST \
                    <br />
                    &emsp;--data "{'{'}\"text\": \"Write that medium article I've been postponing\"
                    {'}'}" \
                    <br />
                    &emsp;http://localhost:3000/notes
                    <br />
                    <br />
                    {'{'}"title":"Write that medium article I've been postponing"{'}'}
                </BlockSnippet>
                <p>
                    Simple yet effective: the notes generated in the old schema version will now be
                    automatically migrated and accepted by the class validators 💃
                </p>
                <p>
                    This implementation is not very scalable however. Chances are that we will need
                    more OTF migrations as the app evolves, having to add more{' '}
                    <InlineSnippet>UseInterceptors</InlineSnippet> decorators, in the correct order,
                    to each endpoint that requires OTF migrations.
                </p>
                <p>
                    To prevent that we can group the different OTF migrations that must be applied
                    to each model in a single interceptor. An elegant way of doing so is to split
                    the interceptor from the migrations themselves, turning each migration into a
                    simple function that will be invoked from the interceptor. Beautiful 💘
                </p>
                <ReactGist id="f4cc6682e06b1f139c1f5d23d2b241f9" />
                <p>
                    Another challenge of this implementation is that migrations will always run,
                    even for data generated in the current schema version. This might backfire at
                    us. Imagine we decide to add a boolean <InlineSnippet>text</InlineSnippet>{' '}
                    property; the OTF migration will incorrectly replace the notes title. We need to
                    prevent that from happening. We can determine which OTF migrations need to be
                    applied to an incoming piece of data by:
                </p>
                <ul>
                    <li>
                        Including the current schema version to each entity generated on the app.
                        The schema can be sent either as a separate parameter or as part of the
                        entity itself. In this article, I'll use the latter.
                    </li>
                    <li>Specifying a target schema version for each migration.</li>
                    <li>
                        Comparing the schema version of the incoming data with the target schema of
                        each migration.
                    </li>
                </ul>
                <ReactGist id="9b62e3a409158d3896d48fe81b704265" />
                <p>
                    <i>
                        Note that now we no longer need to check whether{' '}
                        <InlineSnippet>body.text</InlineSnippet> exists; the schema condition
                        ensures the incoming data will have a text property.
                    </i>
                </p>
                <p>
                    From now on the schema property included in the data will determine which OTF
                    migrations are executed. Once the migrations have been applied, technically, we
                    no longer need the schema property. We can either:
                </p>
                <ul>
                    <li>
                        Delete the property, so it doesn't end up in the database. Note we need to
                        delete the property once all the potential OTF migrations have been applied.
                    </li>
                    <li>
                        Keep the property, as it might be useful to migrate existing data in the
                        database. In this case we need each migration to set the schema property on
                        the entity to the migration's target schema.
                    </li>
                </ul>
                <p>
                    Adding the aforementioned <InlineSnippet>text</InlineSnippet> property no longer
                    messes with the incoming data:
                </p>
                <ReactGist id="c4a2f69ab305139b08393313d9b6442b" />
                <BlockSnippet>
                    $ curl \
                    <br />
                    &emsp;--header "Content-Type: application/json" \
                    <br />
                    &emsp;--request POST \
                    <br />
                    &emsp;--data "{'{'}\"text\": \"Write that medium article I've been postponing\"
                    {'}'}" \
                    <br />
                    &emsp;http://localhost:3000/notes
                    <br />
                    <br />
                    {'{'}"title":"Write that medium article I've been postponing", "schema": 2,
                    "text": true{'}'}
                </BlockSnippet>
                <BlockSnippet>
                    $ curl \
                    <br />
                    &emsp;--header "Content-Type: application/json" \
                    <br />
                    &emsp;--request POST \
                    <br />
                    &emsp;--data "{'{'}\"title\": \"Enough excuses\", \"description\": \"Write that
                    medium article I've been postponing\", \"schema\": 1{'}'}" \
                    <br />
                    &emsp;http://localhost:3000/notes
                    <br />
                    <br />
                    {'{'}"title": "Enough excuses", "description": "Write that medium article I've
                    been postponing", "schema": 2, "text": true{'}'}
                </BlockSnippet>
                <BlockSnippet>
                    $ curl \
                    <br />
                    &emsp;--header "Content-Type: application/json" \
                    <br />
                    &emsp;--request POST \
                    <br />
                    &emsp;--data "{'{'}\"title\": \"Enough excuses\", \"description\": \"Write that
                    medium article I've been postponing\", "text": false, \"schema\": 2{'}'}" \
                    <br />
                    &emsp;http://localhost:3000/notes
                    <br />
                    <br />
                    {'{'}"title": "Enough excuses", "description": "Write that medium article I've
                    been postponing", "text": false, "schema": 2{'}'}
                </BlockSnippet>
                <p>
                    Finally we can slightly improve the interceptors by automatically sorting the
                    migrations based on the target schema and extracting the common behavior to a
                    base class. This is not really necessary but, hey, we developers cannot help
                    ourselves from refactoring, can we?
                </p>
                <ReactGist id="8acb318477b5758996a971870465f351" />
                <p>
                    And that's it. A well tested OTF migrations architecture for NestJS/express
                    servers. See this{' '}
                    <Anchor url="https://github.com/capelski/otf-migrations">
                        working demo repository
                    </Anchor>{' '}
                    for more details. Credit goes to Richard Evans, our lead developer, who will
                    retire in September but whose contributions will remain in the company's legacy
                    for years to come 🍻
                </p>
            </React.Fragment>
        );
    }
};
