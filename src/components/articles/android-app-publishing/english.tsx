import React from 'react';
import { NavLink } from 'react-router-dom';
import { articleRoute } from '../../routes';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';

export const english: ArticleContent = {
    title: 'Publishing an Android app to Play Store',
    description: 'Detailed explanation on how to publish an Android app to Play Store',
    shareSentence:
        'Want to publish an Android app to Play Store? This is what it looks like in 2021',
    introduction: (
        <p>
            So you just had that amazing idea for a killer mobile app. You know how to develop it
            and you have the motivation but you are not sure how hard it’s gonna be to get it
            published on Play Store. Or maybe you don’t have the idea yet, but still you wonder
            about how publishing a mobile app works. You came to the right article. This is what it
            looks like to upload an Android app to Play Store in January 2021.
        </p>
    ),
    body: (
        <React.Fragment>
            <p>
                <i>
                    Both App Store and Play Store require you to purchase a developer license. While
                    Play Store’s license is cheap ($25) and lasts forever, Apple’s one is more
                    expensive ($100), must be renewed every year and the upload process is more
                    complicated. I recommend starting with Play Store, testing the app with some
                    users in the production environment and once everything is ready,{' '}
                    <NavLink
                        to={articleRoute.path.replace(':articleId', ArticleId.iosAppPublishing)}
                    >
                        move into App Store
                    </NavLink>
                    .
                </i>
            </p>
            <h3>Google Play Console</h3>
            <p>
                First things first. Once your app is ready to be uploaded you will need to create a
                Google Play Console developer account. To do so head to{' '}
                <Anchor url="https://play.google.com/console/about/">Google Play Console</Anchor>,
                click <i>Go to Play Console</i>, sign in with your Google account, fill the form
                (the developer name doesn’t need to be your legal name, you can use whatever you
                like), pay the $25 registration fee and you are good to start.
            </p>
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="Google Play console home"
                filename="play-console-home.png"
            />
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="Google Play console sign up form"
                filename="play-console-sign-up.png"
            />
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="Google Play Console dashboard"
                filename="play-console-dashboard.png"
            />
            <p>
                Once your account is created you will land into the Play Console dashboard. To
                upload your app you will first need to create one. Click on <i>Create app</i> and
                fill the app details: name, language and type (if you select free app, you won’t be
                able to change it after you’ve published the app).
            </p>
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="Play Store app creation form"
                filename="play-console-create-app.png"
            />
            <h3>App content</h3>
            <p>
                After the app is created you will be directed to the app dashboard. There you will
                find a straightforward guide with the steps you need to take in order to setup the
                app. First, Google needs some information about your app content. This is:
            </p>
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="App setup checklist"
                filename="app-setup.png"
            />
            <ul className="numbered">
                <li>
                    <b>App access</b>: If your app requires users to authenticate (e.g. creating an
                    account or using an identity provider such as Facebook), you will need to
                    provide demo credentials. Create a testing account in your app and add the
                    username and password in the App access section.
                </li>
                <li>
                    <b>Ads</b>: Whether your app contains ads or not. This setting is purely
                    informative and won’t change or restrict any aspect of your app. It will only
                    display the Contains ads label on the app Play Store page. E.g:
                    <ArticleImage
                        articleId={ArticleId.androidAppPublishing}
                        alt="Ads label example in Play Store"
                        filename="app-ads-label-example.png"
                    />
                </li>
                <li>
                    <b>Content rating</b>:Questionnaire to receive official content ratings (e.g.
                    PEGI, IARC, USK, etc.) for your app. Contains questions such as{' '}
                    <i>"Does the app contain sexual material or nudity?"</i> and{' '}
                    <i>"Does the app contain any potentially offensive language?"</i>. Play Store
                    won’t ban your app because of the questionnaire answers. It’s all about
                    understanding the content of the app and issuing the corresponding content
                    rating, so stay calmed and be honest. It takes a while to complete it but it
                    only must be done once for each app.
                </li>
                <li>
                    <b>Target audience</b>: In this section you need to specify the age group your
                    app is targeting. If your app is designed for children, you will need to take
                    additional steps (e.g. uploading a Privacy Policy).
                </li>
                <li>
                    <b>News app</b>:Whether your app is a news app or not. If it is you will need to
                    comply with the Google Play News policy.
                </li>
            </ul>
            <p>
                If you need to make changes in any of these sections later, you can access them in
                the <i>App content</i> section, at the end of the left menu:
            </p>
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="App content section"
                filename="app-content-section.png"
            />
            <h3>Store presence</h3>
            <p>
                Now things get more interesting 😁 The store presence is the information that will
                be displayed on your app’s page. You will need to choose a category for the app
                (e.g. productivity, dating, photography, etc.), provide a description for interested
                users to read and upload some app preview images (they can be screenshots or other
                images detailing the app’s functionality) among others.
            </p>
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="App store settings details"
                filename="app-store-settings-1.png"
            />
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="App store settings screenshots"
                filename="app-store-settings-2.png"
            />
            <p>A couple remarks:</p>
            <ul>
                <li>
                    7-inch and 10-inch tablet screenshots are marked as mandatory fields but they
                    are actually not mandatory
                </li>
                <li>
                    An app can have up to five tags and they are meant to help users finding your
                    app. Choose the more relevant tags for your app, the ones that your target
                    audience is probably interested in
                </li>
                <li>
                    A feature graphic image is required in order to publish the app. I still haven’t
                    figured out where this image is displayed but I did learn that they can be
                    easily created with tools like this{' '}
                    <Anchor url="https://www.norio.be/graphic-generator/">graphic generator</Anchor>
                    . Get it done for now and you will worry about it later (if it does become a
                    problem). This is an example from an app of mine:
                    <ArticleImage
                        articleId={ArticleId.androidAppPublishing}
                        alt="Feature graphic example"
                        filename="app-feature-graphic.png"
                    />
                </li>
            </ul>
            <p>
                The store presence is something that evolves as your apps does and that you will be
                allowed to change after your app gets published (with the corresponding review by
                the Play Store team). Don’t worry about getting it perfect from the start: a short
                description and some screenshots will do. Eventually you can refine your description
                and upload nice creativities such as Tinder’s ones. For now, let’s get your app
                released 🚀
            </p>
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="Tinder app store presence"
                filename="tinder-store-presence.png"
            />
            <h3>Release your app</h3>
            <p>
                Once completed all the previous steps you can go back to your app’s dashboard and
                you will find the steps you need to follow to release the app. For the sake of
                simplicity I will skip the testing tracks and release the app straight to
                production. If you instead want to test the app with a small group of users first
                (which is usually a good idea), just follow the same steps for the corresponding
                testing track (and maybe read more about{' '}
                <Anchor url="https://support.google.com/googleplay/android-developer/answer/9845334?hl=en">
                    testing tracks
                </Anchor>
                ).
            </p>
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="App release checklist"
                filename="app-release-steps.png"
            />
            <p>
                Before rolling out the first release we need to choose which countries the app will
                be available in. There are no additional charges or consequences for selecting all
                the countries of the world so go ahead and do so if your app functionality is not
                limited to specific countries. Some countries might ban your app but, again, it has
                no consequences and you will find out as you go.
            </p>
            <p>
                After choosing the available countries we can proceed to create a new release. The
                first time you will need to configure how your app is signed. The recommended way is
                to let Google handle the signing process (is simpler and it enables publishing
                Android App Bundles, .aab files) but you can choose to provide your own key if you
                like.
            </p>
            <p>
                Almost there! We just need to upload the actual application file (.apk or .aab),
                review the release a name (it will be the application version by default),
                optionally provide some release notes and roll it out! The Play Store team will
                review your app and get back to you in a few days 💃
            </p>
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="App's available countries"
                filename="app-release-countries.png"
            />
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="Play Console app signing"
                filename="app-signing.png"
            />
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="App release files"
                filename="app-release-files.png"
            />
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="App release details"
                filename="app-release-details.png"
            />
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="App release final screen"
                filename="app-release-roll-out.png"
            />
            <p>
                <i>
                    In the final release screen Play Store displays errors and warnings found in
                    your application file (.apk or .aab). In my case the warning states that I
                    haven’t uploaded a debug symbol file in order to analyse app errors.
                </i>
            </p>
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="App release being reviewed"
                filename="app-release-in-review.png"
            />
            <h3>Handling rejection</h3>
            <p>
                If the Play Store team doesn’t encounter any issue with your app, they will publish
                it right after finishing the review. If they do encounter issues they will reject
                your app and write back to you with the reasons for the rejection. Don’t panic
                though! The rejection is not permanent. It just means you are not compliant with
                some Google Play policy. You will need to go through the email and fix the reported
                issues.
            </p>
            <p>
                The rejection reasons will vary depending on the nature of your app. For example, if
                your app contains gambling simulation it will be automatically rejected in a number
                of countries.
            </p>
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="App rejection notification due to gambling policies"
                filename="gambling-rejection-reason.png"
            />
            <p>
                A more common issue you might run into is displaying content in your app’s page that
                is not suitable for all age groups. Even if your content rating is already warning
                about such content (which will prevent users below the age group from installing the
                app), the app’s page is still accessible to all users. Therefore, your app’s page
                must be suited for all audiences.
            </p>
            <p>
                For example, let’s say your app has a PEGI 16 content rating because it uses
                potentially offensive language. If you include offensive language in the app’s page
                (e.g. in the description or in the app screenshots), your app will get rejected.
                This is what the Play Store rejection mail looks like:
            </p>
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="App rejection email"
                filename="app-rejection-email.png"
            />
            <p>
                Luckily the rejection reasons are explained in a clear manner, even including an
                image of the app screenshot that doesn’t comply with the metadata if that’s the
                case. In this case (in spanish) the Play Store team even highlighted the offensive
                word:
            </p>
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="Rejected app screenshot"
                filename="app-rejected-screenshot.png"
            />
            <p>
                Don’t lose heart, spend some time fixing the issues and eventually you will get an
                email stating that your app is now published 🍾
            </p>
            <ArticleImage
                articleId={ArticleId.androidAppPublishing}
                alt="App published notification email"
                filename="app-published-email.png"
            />
        </React.Fragment>
    )
};
