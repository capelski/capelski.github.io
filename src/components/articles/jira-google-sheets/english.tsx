import React from 'react';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { InlineSnippet } from '../inline-snippet';

export const english: ArticleContent = {
    title: 'Supercharged JIRA reporting using Google Sheets',
    description: 'How to fetch JIRA issues from Google Sheets and customize the results list',
    shareSentence: 'Supercharge your JIRA reporting using Google Sheets',
    introduction: (
        <p>
            JIRA has a powerful builtin{' '}
            <Anchor url="https://www.atlassian.com/blog/jira/jql-the-most-flexible-way-to-search-jira-14">
                querying language
            </Anchor>
            , a reasonable Issues list view and useful export functions. It does however lack the
            flexibility of aggregating fields in queries, customizing the list view or formatting
            the exported files. Features that we could easily implement in spreadsheet tools. If the
            mountain will not come to Muhammad... let the JIRA issues come to Google Sheets!
        </p>
    ),
    body: (
        <React.Fragment>
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Screenshot of the Jira Cloud for Sheets Chrome extension"
                filename="jira-cloud-extension.png"
                className="image-600"
            />
            <p>
                Let's start with a simple use case. Say we want to calculate how many story points
                will be included in a certain release for a Kanban project. Imagine we use epics to
                group all the issues that go into a release; we can easily obtain the list of issues
                for a release using the JIRA UI, filtering by Parent and selecting the corresponding
                epic.
            </p>
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Sample filter in JIRA Issues view"
                filename="jira-release-filter.png"
                className="image-600"
            />
            <p>
                Summing the <InlineSnippet>Story point estimate</InlineSnippet> values cannot be
                done from the JIRA UI however. We could certainly exporting the issues to Excel/CSV
                from JIRA and use some spreadsheet tool to perform operations on the data. It does
                the trick but it creates a one time file that will not stay up to date if the list
                of issues changes.
            </p>
            <p>
                If we are interested in refreshing the data over time it is more convenient to go
                the other way around: dynamically importing the JIRA issues from the spreadsheet
                tool. For such purpose Atlassian created a Google Sheets extension that allows
                fetching issues directly into Google Sheets:{' '}
                <Anchor url="https://workspace.google.com/u/0/marketplace/app/jira_cloud_for_sheets/1065669263016">
                    JIRA Cloud for Sheets
                </Anchor>
                .
            </p>
            <h3>Setup</h3>
            <p>
                The app requires a JIRA account and is free to install and use. You can install it
                from the Extensions menu in Google Sheets and you will need to give it access to
                your Google Account. Technically, we will be allowing Atlassian to potentially
                remove all your spreadsheets on Google Sheets but, hey, who reads the small print,
                right? Once installed you will need to sign in to your JIRA account as well.
            </p>
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Installing the Jira Cloud for Sheets extension"
                filename="jira-cloud-install.png"
                className="image-600"
            />
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Allowing Jira Cloud for Sheets access to the Google account"
                filename="jira-cloud-google-sign-in.png"
                className="image-600"
            />
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Allowing Jira Cloud for Sheets access to the Google account"
                filename="jira-cloud-google-permissions.png"
                className="image-600"
            />
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Allowing Jira Cloud for Sheets access to the Google account"
                filename="jira-cloud-atlassian-sign-in.png"
                className="image-600"
            />
            <h3>Features</h3>
            <p>
                The extension adds the following window to your Google Sheets and it offers
                different mechanisms to import data. You can, for example, use the extension's
                window to define the list of issues you want to fetch: which Projects to import
                from, some basic filtering (i.e. Status, Issue type, etc.), the sorting criteria and
                which fields to retrieve (it offers a complete list of the fields in your project
                💪).
            </p>
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Opening the Jira Cloud for Sheets extension"
                filename="jira-cloud-open.png"
                className="image-600"
            />
            <p>
                The extension also supports JQL queries, which allows filtering by custom fields or
                fields that are not present in the extension's window. If, like me, you are lazy
                about writing JQL, you can obtain the corresponding JQL query from the JIRA Issues
                view and paste it in the extension window. The set of fields to retrieve is still
                selected from the extension's window.
            </p>
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Sample JQL query through JIRA Issues view"
                filename="jira-release-jql.png"
                className="image-600"
            />
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Sample JQL query through Jira Cloud for Sheets"
                filename="jira-cloud-jql-query.png"
                className="image-600"
            />
            <p>
                Note however that using JQL queries will wipe out the entire page every time we
                fetch the issues. Since we want to have formulas in certain cells in order to
                perform operations on the data, this is a deal breaker. Fortunately, there's another
                way of fetching the issues: the <b>JIRA</b> function.
            </p>
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="JIRA function description"
                filename="jira-cloud-function-description.png"
                className="image-600"
            />
            <p>
                It can be used on any cell of the spreadsheet and it takes three parameters: a JQL
                query, the set of fields to retrieve and the maximum number of elements to fetch. It
                is the most flexible mechanism of the three, as it allows defining the JQL as a
                dynamic expression. Because the formula is defined within the spreadsheet, we can
                use string concatenation and references to other cells:
            </p>
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Simple usage of the JIRA function"
                filename="jira-cloud-function-example.png"
                className="image-600"
            />
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Usage of the JIRA function with cell references"
                filename="jira-cloud-function-dynamic.png"
                className="image-600"
            />
            <p>
                <i>
                    Note that the JIRA function needs to be explicitly enabled from the extension's
                    window for each spreadsheet and, once you do so, it will bind to your JIRA
                    account for that spreadsheet (probably the reason why it is disabled by
                    default). This means that anyone who can edit the spreadsheet will be able to
                    import JIRA issues using YOUR account.
                </i>
            </p>
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Enabling the JIRA function"
                filename="jira-cloud-function-enable.png"
                className="image-600"
            />
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="JIRA function account warning"
                filename="jira-cloud-function-warning.png"
                className="image-300"
            />
            <p>
                The list of issues can be refreshed from the extension's window and, upon refresh,
                it will only modify the cells below the row and column where the function is used.
                We can therefore insert rows above and use them to perform operations on the data.
                For example, a simple SUM function on the{' '}
                <InlineSnippet>Story point estimate</InlineSnippet> column. Future refreshes will
                update the list while maintaining our calculations up to date 👌
            </p>
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Sum of a numeric column coming from JIRA"
                filename="jira-cloud-function-aggregation.png"
                className="image-600"
            />
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Refreshing the issues list"
                filename="jira-cloud-function-refresh.png"
                className="image-600"
            />
            <p>
                Additional advantages of the JIRA function is that we can turn the spreadsheet
                columns into a filter (i.e. Data {'>'} Create a filter) for easier sorting and
                filtering. We can also customize the view by insert new columns with transformed
                values coming from the JIRA query. For example, we can turn each issue key into a
                link to the issue by adding a new column and hiding the original one.
            </p>
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Prepending a new column with a link to each JIRA issue"
                filename="jira-link-column-1.png"
                className="image-600"
            />
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Hiding the issue Key column"
                filename="jira-link-column-2.png"
                className="image-600"
            />
            <p>
                One final hack before you go. The list of issues will be refreshed every time there
                is a change in the function parameters. We can use that to refresh the list without
                having to open the extension's window. For example, by manually changing the limit
                value. Or, if we want to get fancier, by adding an Apps Script that toggles the
                limit value every time we click on a drawing.
            </p>
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Inserting a drawing to Google Sheets"
                filename="google-sheets-drawing.png"
                className="image-600"
            />
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Opening Apps Script from Google Sheets"
                filename="google-sheets-apps-script.png"
                className="image-600"
            />
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Creating a refresh function in Apps Script"
                filename="apps-script-refresh-function.png"
                className="image-600"
            />
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Assigning an Apps Script to a Google Sheets drawing"
                filename="google-sheets-assign-script.png"
                className="image-600"
            />
            <ArticleImage
                articleId={ArticleId.jiraGoogleSheets}
                alt="Authorizing Apps Script to access Google Sheets"
                filename="apps-script-authorization.png"
                className="image-600"
            />
        </React.Fragment>
    )
};
