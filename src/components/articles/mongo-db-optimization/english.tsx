import React from 'react';
import ReactGist from 'react-gist';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { BlockSnippet } from '../block-snippet';
import { InlineSnippet } from '../inline-snippet';
import { ObjectView } from '../object-view';

export const english: ArticleContent = {
    title: 'Optimizing MongoDB queries with system.profile',
    description: 'How to optimize MongoDB queries using the system.profile collection',
    shareSentence: 'Optimize your MongoDB queries before they bring down your environment',
    introduction: (
        <p>
            Inefficient database queries can get the job done for a while but they are bound to
            impact performance as the dataset grows. At{' '}
            <Anchor url="https://peekvision.org/">PeekVision</Anchor> we recently suffered
            performance degradation in some of our environments due to concurrent inefficient
            queries. At some point even bringing down the whole system. Here is how we identified
            the inefficient queries and optimized them to improve performance.
        </p>
    ),
    body: (
        <React.Fragment>
            <ArticleImage
                alt="Abstract representation of an optimized database"
                articleId={ArticleId.mongoDbOptimization}
                className="image-600"
                filename="database-optimization.jpg"
            />
            <h3>The inefficient queries</h3>
            <p>
                Thanks to the server logs we quickly identified the source of the inefficient
                queries: a dashboard page that displays aggregated activity data. This dashboard
                works acceptably well in most of our environments and, for years, it worked well in
                the environments that were later effected by the performance degradation. Where were
                the performance issues coming from then?
            </p>
            <ArticleImage
                articleId={ArticleId.mongoDbOptimization}
                filename="dashboard.png"
                footer="Dashboard responsible for the inefficient queries"
            />
            <p>
                This dashboard displays several stages which are customizable by the user. Each
                stage displays several dials at its turn and each dial requires one or more queries
                to fetch the necessary data. When the page was designed we assumed that 3 or 4
                stages would be plenty for most users. Some of them however, hungry for insights
                about their activities, started adding more stages to the dashboard. Up to 13 stages
                in the worst case, which elevated the number of queries up to 150.
            </p>
            <ArticleImage
                articleId={ArticleId.mongoDbOptimization}
                filename="parallel-queries.png"
                footer="Parallel queries by the dashboard page"
            />
            <p>
                The big number of queries combined with the growing size of the dataset was the
                perfect storm for performance degradation. The dashboard page was running 150
                queries in parallel, each of them taking more time to complete as the dataset grew.
                This was placing significant stress on the mongoDB server, increasing the memory
                consumption so much, that the rest of the system was struggling to operate.
            </p>
            <h3>Design flaws</h3>
            <p>
                Database aside, the dashboard page had a couple of issues that contributed to the
                bad performance. The degradation episodes brought our attention to them and we had
                to iron them out before digging into the database queries themselves. Here are a few
                issues we identified and fixed:
            </p>
            <ul>
                <li>
                    <b>Duplicate loading</b>. Our dashboard allows filtering the dataset by several
                    criteria and it persists the filters via URL query parameters. We discovered we
                    had a bug in the way we retrieve the filters from the URL query parameters,
                    causing the dashboard to be loaded twice every time the filters were changed.
                    Fixing that 2-line bug alone brought down the number of queries to the half.
                </li>
                <li>
                    <b>Parallel requests</b>. The dashboard was designed to perform all the Http
                    requests in parallel and display the entire dashboard at once when all the data
                    was loaded. We changed the dashboard to stagger the queries, launching all the
                    queries of a given stage in parallel, but waiting for them to complete before
                    launching the next batch. This makes the complete page load slightly slower but
                    it also means displaying the first stage faster. In standard screen sizes, most
                    of the stages are not visible without scrolling anyway, so the staggered loading
                    doesn't impact the user experience. It does however significantly reduce the
                    load on the database server.
                </li>
                <li>
                    <p>
                        <b>Concurrent users</b>. The dashboard was most used during field training
                        sessions, where several users were accessing the dashboard at the same time.
                        This was multiplying the number of concurrent queries and putting even more
                        stress on the database server. To leverage those scenarios, we implemented a
                        queuing mechanism using <InlineSnippet>p-queue</InlineSnippet> to limit the
                        number of concurrent queries (see the snippet below). It can result in users
                        getting 504 errors under stress conditions, but it is better to have some
                        users getting errors than the whole system being down.
                    </p>
                    <ReactGist id="9e6a034ac9c40a4d2ab13c966d7c0d42" />
                </li>
            </ul>
            <p>
                After these improvements, the dashboard page stopped impacting the performance of
                the system. The dashboard was still taking a long time to load in environments with
                large datasets however (e.g. in some environments we have collections with 3 million
                records). At this point we were determined to get to the bottom of it and optimize
                the queries for good.
            </p>
            <h3>Meet the profiler</h3>
            <p>
                Here is where the native MongoDB tooling comes into play. The{' '}
                <Anchor url="https://www.mongodb.com/docs/manual/tutorial/manage-the-database-profiler/">
                    Database Profiler
                </Anchor>{' '}
                collects detailed information about database commands and writes the data it
                collects to the system.profile collection. The profiler is disabled by default and
                enabling it has an effect on database performance and disk use (see{' '}
                <Anchor url="https://www.mongodb.com/docs/manual/reference/method/db.setProfilingLevel/#effects-on-performance-and-disk-use">
                    Database Profiler Overhead
                </Anchor>{' '}
                for more details).
            </p>
            <p>
                We can enable the profiler either from the application code (see the documentation
                for your mongoDB driver) or from the mongo shell:{' '}
                <InlineSnippet>db.setProfilingLevel(level, options)</InlineSnippet>. Depending on
                how the profiler is configured the amount of collected data can be overwhelming. Is
                is worth narrowing down the collected data by using the optional parameters of the
                profiler.
            </p>
            <ul>
                <li>
                    <b>level = 0</b>. The profiler is off and does not collect any data
                </li>
                <li>
                    <b>level = 1</b>. The profiler collects data for operations that exceed the{' '}
                    <InlineSnippet>options.slowms</InlineSnippet> threshold or match a specified{' '}
                    <InlineSnippet>options.filter</InlineSnippet>.
                </li>
                <li>
                    <b>level = 2</b>. The profiler collects data for all operations, ignoring user
                    provided values for <InlineSnippet>options.slowms</InlineSnippet> and{' '}
                    <InlineSnippet>options.filter</InlineSnippet>.
                </li>
            </ul>
            <p>
                If you haven't identified the collection your inefficient queries are targeting you
                can focus on slow operations that exceed a certain number of milliseconds. If you
                have identified the collection your best option is to focus on the operations for
                that specific collection. It is a good idea to clean previous profiling data before
                enabling the profiler by dropping the system.profile collection.
            </p>
            <BlockSnippet>
                db.system.profile.drop();
                <br />
                <br />
                // Profile only slow operations
                <br />
                db.setProfilingLevel(1, {'{'} slowms: {'<'}threshold{'>'} {'}'});
                <br />
                <br />
                // Profile only operations for a specific collection
                <br />
                db.setProfilingLevel(1, {'{'} filter: {'{'} ns: 'yourCollectionName' {'}'} {'}'});
            </BlockSnippet>
            <p>
                Once the profiler is enabled we will execute the queries we are trying to optimize.
                In our case, we reloaded the dashboard page several times. This will create several
                documents in the system.profile collection; see an example below. Once we have
                enough information we will want to stop the profiler to reduce further noise by
                setting the level back to 0.
            </p>
            <BlockSnippet>
                db.setProfilingLevel(0); // stop the profiler
                <br />
                <br />
                db.system.profile.findOne();
                <br />
                <br />
                <ObjectView
                    object={{
                        op: 'command',
                        ns: 'peek.Encounter',
                        command: {
                            aggregate: 'Encounter',
                            pipeline: [
                                {
                                    $match: {
                                        status: 'finished',
                                        stationName: 'School Screening',
                                        regionIds: 'regions',
                                        healthyEyes: { $exists: true }
                                    }
                                },
                                { $group: { '...': '...' } }
                            ]
                        },
                        keysExamined: 145935,
                        docsExamined: 145935,
                        cursorExhausted: true,
                        '...': '...',
                        millis: 169,
                        planSummary:
                            'IXSCAN { regionIds: 1, stationName: 1, status: 1, readyreaderOrderStatus: 1, patientInteractionDate: 1 }'
                    }}
                />
            </BlockSnippet>
            <h3>Optimizing the queries</h3>
            <p>
                From here on optimizing is more an art than a science. What ultimately makes the
                queries slow is having to fetch documents from disk into memory. The{' '}
                <InlineSnippet>docsExamined</InlineSnippet> property tells us how many documents
                were read from disk. To improve performance we will want to reduce this number when
                possible.
            </p>
            <p>
                Conversely, the <InlineSnippet>keysExamined</InlineSnippet> property tells us how
                many index entries were read. The queries that can filter documents by reading only
                the index entries are much faster than the queries that need to load the entire
                document to determine whether it matches the filtering criteria.
            </p>
            <p>
                In the example above both <InlineSnippet>keysExamined</InlineSnippet> and{' '}
                <InlineSnippet>docsExamined</InlineSnippet> have the same value: almost 150k
                documents. This told us that the query used an index (otherwise keysExamined would
                be 0) but it still had to retrieve all the documents that matched the index entries
                to determine whether they matched the filtering criteria or not. This can happen
                when there is no index that covers all the properties we are filtering by or when
                the query planner picks an index that is not the most efficient one. The{' '}
                <InlineSnippet>planSummary</InlineSnippet> property can be useful here. It reveals
                the command's{' '}
                <Anchor url="https://dev.to/devaaai/mongodb-pagination-ixscan-vs-collscan-and-building-efficient-page-bookmarks-2087">
                    scan type
                </Anchor>
                , which has two possible values:
            </p>
            <ul>
                <li>
                    <b>COLLSCAN</b> (Collection Scan). Reads every document in the collection
                    sequentially, examining each one to find matches. It becomes exponentially
                    slower as collection size grows
                </li>
                <li>
                    <b>IXSCAN</b> (Index Scan). Uses indexes to locate documents, reading only
                    relevant index entries and then fetching matching documents
                </li>
            </ul>
            <p>
                <i>
                    If you observe COLLSCAN operations you can probably benefit from adding indexes
                    on the properties your query is filtering or sorting by. Remember that indexes
                    come at a cost: they consume disk space and they can slow down write operations.
                    It is a good practice to start with a minimal set of indexes and add more as the
                    application evolves.
                </i>
            </p>
            <p>
                The plan summary told us the query was indeed using an index (i.e. IXSCAN), but not
                the one we expected. Our collections have several composite indexes, which our
                dashboard was supposed to be using, and the query planner was not picking the one
                that would have covered all the properties we are filtering by. This can be fixed by
                providing the name of the corresponding index via the{' '}
                <InlineSnippet>hint</InlineSnippet> optional parameter.
            </p>
            <p>
                Unfortunately though the number of <InlineSnippet>docsExamined</InlineSnippet>{' '}
                remained unchanged 🤯 This led us to more debugging and a second discovery: the
                usage of <InlineSnippet>$exists</InlineSnippet> in the query filter was preventing
                the query planner from using the index effectively. Note that we don't observe this
                issue on <InlineSnippet>find</InlineSnippet> queries that use the same filter, but
                it turned out to be the case on the <InlineSnippet>aggregate</InlineSnippet> query
                we use in the dashboard. Following a suggestion from Claude Code, we turned the{' '}
                <InlineSnippet>
                    {'{'} healthyEyes: {'{'} $exists: true {'}'} {'}'}
                </InlineSnippet>{' '}
                clause into{' '}
                <InlineSnippet>
                    {'{'} healthyEyes: {'{'} $in: [true, false] {'}'} {'}'}
                </InlineSnippet>
                .
            </p>
            <BlockSnippet>
                db.Encounter.aggregate(
                <ObjectView
                    object={[
                        {
                            $match: {
                                status: 'finished',
                                stationName: 'School Screening',
                                regionIds: 'regions',
                                healthyEyes: { $in: [true, false] }
                            }
                        },
                        { $group: { '...': '...' } }
                    ]}
                />
                ,{' '}
                <ObjectView
                    object={{
                        hint:
                            'regionIds_stationName_status_healthyEyes_patientInteractionDate_index'
                    }}
                />
                );
                <br />
                <br />
                db.system.profile.findOne();
                <br />
                <br />
                <ObjectView
                    object={{
                        op: 'command',
                        ns: 'peek.Encounter',
                        command: {
                            aggregate: 'Encounter',
                            pipeline: [
                                {
                                    $match: {
                                        status: 'finished',
                                        stationName: 'School Screening',
                                        regionIds: 'regions',
                                        healthyEyes: { $in: [true, false] }
                                    }
                                },
                                { $group: { '...': '...' } }
                            ],
                            hint:
                                'regionIds_stationName_status_healthyEyes_patientInteractionDate_index'
                        },
                        keysExamined: 145936,
                        docsExamined: 0,
                        cursorExhausted: true,
                        // ...
                        millis: 72,
                        planSummary:
                            'IXSCAN { regionIds: 1, stationName: 1, status: 1, healthyEyes: 1, patientInteractionDate: 1 }'
                    }}
                />
            </BlockSnippet>
            <p>
                And there we go! The number of documents read from disk dropped to 0 and that led to
                a significant reduction in the query execution time: from 169ms to 72ms. This
                reduction is even more significant when the running against a larger dataset. The
                same approach helped us improve a bunch of other queries that had similar issues. In
                a nutshell:
            </p>
            <ul>
                <li>
                    Make sure there is an index that covers all the properties you are filtering by.
                </li>
                <li>Make sure the query planner is picking that index.</li>
                <li>
                    Make sure the documents don't need to be loaded into memory after examining the
                    corresponding index entry.
                </li>
            </ul>
            <h3>Conclusion and credits</h3>
            <p>
                Optimizing the database queries of an application is a permanent process that
                requires continuous monitoring and adjustment. Knowing the database engine tooling
                is crucial to understand how the queries are executed. The MongoDB native{' '}
                <InlineSnippet>system.profile</InlineSnippet> collection is a powerful tool and it
                helps us achieve just that. I will finish this article crediting Francesco Merletti,
                our technical lead, who led the efforts to optimize the dashboard page and the
                database queries. It is inspiring to work with such skilled and passionate
                colleagues!
            </p>
        </React.Fragment>
    )
};
