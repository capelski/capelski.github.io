import React from 'react';
import { NavLink } from 'react-router-dom';
import { articleRoute } from '../../routes';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';

export const english: ArticleContent = {
    title: 'Publishing an iOS app to App Store',
    description: 'Detailed explanation on how to publish an iOS app to App Store',
    shareSentence: 'Want to publish an iOS app to App Store? This is what it looks like in 2021',
    introduction: (
        <p>
            So you heard that Apple is rather picky when it comes to accepting apps in App Store.
            And indeed, Apple does make it much harder than Google when it comes to publishing apps.
            This doesn't mean it's impossible however. All you will need is patience and, if
            possible, following the advice of somebody who has done it before. This is what it looks
            like to upload an iOS to App Store in January 2021.
        </p>
    ),
    body: (
        <React.Fragment>
            <p>
                <i>
                    Both App Store and Play Store require you to purchase a developer license. While
                    Play Store's license is cheap ($25) and lasts forever, Apple's one is more
                    expensive ($100), must be renewed every year and the upload process is more
                    complicated. I recommend{' '}
                    <NavLink
                        to={articleRoute.path.replace(':articleId', ArticleId.androidAppPublishing)}
                    >
                        starting with Play Store
                    </NavLink>
                    , testing the app with some users in the production environment and once
                    everything is ready, move into App Store.
                </i>
            </p>
            <p>
                <b>Important!</b> You will need a Mac device or virtual machine to upload the app to
                App Store. The only way to upload apps is through XCode or Transporter and they both
                can only be installed in MacOS.
            </p>
            <h3>Apple Developer Portal</h3>
            <p>
                In order to upload an app to App Store you will first need to create an Apple
                Developer account in the{' '}
                <a href="https://developer.apple.com/" target="_blank">
                    Apple Developer Portal
                </a>
                . Sign in with your Apple ID, fill the enrollment form, pay the $100 registration
                fee and let's move on.
            </p>
            <p>
                You will notice you get asked twice for the same details in the Romanized Contact
                Information. "Romanized" stands for latin alphabet here, so I guess this section is
                meant for users who write in non-latin alphabets (e.g. cyrillic, chinese, etc.). In
                your case, enter the same details you filled above.
            </p>
            <ArticleImage
                articleId={ArticleId.iosAppPublishing}
                alt="Apple developer portal landing page"
                filename="apple-developer-portal-1.png"
            />
            <ArticleImage
                articleId={ArticleId.iosAppPublishing}
                alt="Apple developer portal home"
                filename="apple-developer-portal-2.png"
            />
            <ArticleImage
                articleId={ArticleId.iosAppPublishing}
                alt="Apple developer program home"
                filename="apple-developer-portal-3.png"
            />
            <ArticleImage
                articleId={ArticleId.iosAppPublishing}
                alt="Apple developer program personal information"
                filename="apple-developer-portal-4.png"
            />
            <ArticleImage
                articleId={ArticleId.iosAppPublishing}
                alt="Apple developer program romanized information"
                filename="apple-developer-portal-5.png"
            />
            <ArticleImage
                articleId={ArticleId.iosAppPublishing}
                alt="Apple developer program entity type"
                filename="apple-developer-portal-6.png"
            />
            <ArticleImage
                articleId={ArticleId.iosAppPublishing}
                alt="Apple developer program purchase"
                filename="apple-developer-portal-7.png"
            />
            <p>
                After your Developer Program Enrollment finishes you will be able to access
                developer resources from the Apple Developer Portal. Here you will need to create a
                few items:
            </p>
            <ul>
                <li>
                    <b>Distribution certificate</b>: Certificate that identifies your team and
                    allows you to submit apps to the App Store. Here is a great guide on{' '}
                    <a
                        href="https://support.magplus.com/hc/en-us/articles/203808748-iOS-Creating-a-Distribution-Certificate-and-p12-File"
                        target="_blank"
                    >
                        how to create a distribution certificate
                    </a>{' '}
                    manually (you will need to generate the certificate from a Mac).
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="Distribution certificate on Apple Developer Portal"
                        filename="distribution-certificate.png"
                    />
                </li>
                <li>
                    <b>App ID</b>: The identifier of your app. The Bundle ID must be the same as the
                    bundleIdentifier in your app binaries. When creating the App ID manually you
                    will see a list of capabilities your app can add to your app (e.g. Push
                    Notifications, Sign In with Apple, etc.). You can edit those capabilities later,
                    so you don't need to configure them now.
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App ID on Apple Developer Portal"
                        filename="app-id.png"
                    />
                </li>
                <li>
                    <b>Provisioning profile</b>: Only apps signed by Apple can be installed on an
                    iOS device. This becomes an issue when developing, because you will likely want
                    to test the app on a real device before submitting the app for review.
                    Provisioning profiles are the solution to this problem; they are embedded in
                    your app binaries and allow the app to run in certain devices before Apple signs
                    it. A provisioning profile must be created for each app.
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="Provisioning profile on Apple Developer Portal"
                        filename="provisioning-profile.png"
                    />
                </li>
            </ul>
            <p>
                Creating this items is the most confusing and undocumented part of the entire upload
                process. I can't provide much more details about it since I am using{' '}
                <a href="http://expo.io/" target="_blank">
                    Expo
                </a>{' '}
                to develop iOS apps and I relied on their CLI to generate both the distribution
                certificate, the app id and the provisioning profile.
            </p>
            <ArticleImage
                articleId={ArticleId.iosAppPublishing}
                alt="Expo iOS credentials setup"
                filename="expo-ios-build.png"
            />
            <p>
                <i>
                    If you use Expo CLI from Windows and run into Apple Developer Portal
                    authentication issues, consider running the command in an Ubuntu terminal using
                    WSL (Windows Subsystem for Linux). Neither Command Prompt, PowerShell or Git
                    Bash were able to authenticate at the time of writing.
                </i>
            </p>
            <h3>App Store Connect</h3>
            <p>
                After you have successfully created the items described above in the Apple Developer
                Portal, we can move on to{' '}
                <a href="https://appstoreconnect.apple.com/" target="_blank">
                    App Store Connect
                </a>{' '}
                (former Itunes Connect), the platform where application binaries are actually
                uploaded.
            </p>
            <ArticleImage
                articleId={ArticleId.iosAppPublishing}
                alt="App Store Connect login"
                filename="app-store-connect-1.png"
            />
            <ArticleImage
                articleId={ArticleId.iosAppPublishing}
                alt="App Store Connect home"
                filename="app-store-connect-2.png"
            />
            <p>
                Click on <i>My Apps</i> and, once in he Apps page, create a new app by clicking in
                the <i>+</i> button. You will be asked a bunch of details about the app. In the
                Bundle ID field pick the App ID you've just created in the Apple Developer Portal.
                The SKU is a unique ID not visible to app users: you can use the bundle identifier
                or any other relevant text.
            </p>
            <ArticleImage
                articleId={ArticleId.iosAppPublishing}
                alt="App Store Connect create app"
                filename="app-store-connect-3.png"
            />
            <p>
                When the create operation finishes you will then be taken to the app settings page,
                where you will need to provide plenty of information about your app. Filling all the
                required sections is mandatory in order to submit your app for review.
            </p>
            <p>
                The simplest approach to getting your app ready consists in clicking the{' '}
                <i>Submit for Review</i> button, fixing the errors that will be reported and then
                clicking the button again, until no more errors are reported. Here is an overview of
                some of the sections you will find:
            </p>
            <ul>
                <li>
                    <b>
                        iOS App {'>'} Version Information {'>'} App screenshots
                    </b>
                    : You will need to submit screenshots for different device sizes: 6.5 inches
                    iPhones (1242 x 2688px or 1284 x 2778px), 5.5 inches iPhones (1242 x 2208px) and
                    iPads (2048 x 2732px). You can capture those from an emulator / real device or
                    you can generate some images featuring the app look and feel (e.g. the images on
                    Tinder's app store page), as long as you use the required sizes and the app
                    content on the images matches the app appearance. The images you attach here are
                    the ones that will be visible on your app's store page.
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App screenshots section"
                        filename="app-screenshots.png"
                    />
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="Tinder screenshots example"
                        filename="tinder-screenshots.png"
                    />
                </li>
                <li>
                    <b>
                        iOS App {'>'} Version Information {'>'} Support URL
                    </b>
                    : It's not enough to put a URL to your landing page. The Apple team will visit
                    the link and look for user support content (e.g. a contact form).
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App version information section"
                        filename="app-version-information.png"
                    />
                </li>
                <li>
                    <b>iOS App {'>'} Build</b>: Here you will need to select the actual app file
                    (.ipa format), but it's not possible to upload it directly to App Store Connect.
                    You will need to use XCode or Transporter to upload the generated .ipa file.
                    When the upload finishes you will find a new app version available in this
                    section. You can see a list of all available versions in the TestFlight tab.
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App build section"
                        filename="app-build-1.png"
                    />
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App builds list"
                        filename="app-build-2.png"
                    />
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App versions in TestFlight tab"
                        filename="testflight-builds.png"
                    />
                </li>
                <li>
                    <b>iOS App {'>'} Age rating</b>: You will be asked questions about the type of
                    content in your app. There are no rights or wrongs. It's only about determining
                    age restrictions for certain types of content. The{' '}
                    <b>Unrestricted Web Access</b> item means whether users can access any URL
                    inside your app (e.g. a web browser).
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App age rating section"
                        filename="app-age-rating.png"
                    />
                </li>
                <li>
                    <b>iOS App {'>'} Review information</b>: If your app requires users to
                    authenticate (e.g. creating an account or using an identity provider such as
                    Facebook), you will need to provide demo credentials. Create a testing account
                    in your app and add the username and password in this section.
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App review information section"
                        filename="app-review-info.png"
                    />
                </li>
                <li>
                    <b>App information {'>'} Content rights</b>: Here you need to confirm that you
                    don't use third-party content or, in case you do, that you are allowed to use
                    such content. If you use a public API for example, you are allowed to use it
                    given it's public.
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App information section"
                        filename="app-content-rights-1.png"
                    />
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App content rights section"
                        filename="app-content-rights-2.png"
                    />
                </li>
                <li>
                    <b>Pricing and availability</b>: Apple let's you chose your app's price by
                    selecting one of the 90+ price tiers at the time of writing (from free app to
                    tier 87 app, i.e., 1099€). You can also choose the countries availability for
                    your app in this section (by default your app will be available in all the
                    countries of the world).
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App pricing section"
                        filename="app-pricing.png"
                    />
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App availability section"
                        filename="app-availability.png"
                    />
                </li>
                <li>
                    <b>App Privacy {'>'} Privacy policy</b>: It's mandatory to have a privacy policy
                    in order to deploy an app to the app store. It will be visible on your app's
                    page and it can either be a link to a PDF file or a web page. If you have
                    already created a privacy policy page for you website you can link to that page
                    (e.g.{' '}
                    <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank">
                        https://www.whatsapp.com/legal/privacy-policy-eea
                    </a>
                    ).
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App privacy policy section"
                        filename="app-privacy-policy.png"
                    />
                </li>
                <li>
                    <b>App Privacy {'>'} Privacy practices</b>: Questionnaire to determine whether
                    your app collects and stores users data outside the application. If your app
                    requires users to create an account for example, you are then storing user
                    information outside the app. You will need to specify why you collect the data
                    for each of the data types your app collects. Once you finish answering the
                    privacy practices questionnaire, you will need to publish the answers to be able
                    to submit your app for review.
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App privacy section"
                        filename="app-privacy-practices-1.png"
                    />
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App data collection form"
                        filename="app-privacy-practices-2.png"
                    />
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App data types section"
                        filename="app-privacy-practices-3.png"
                    />
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App data type form"
                        filename="app-privacy-practices-4.png"
                    />
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App data type form"
                        filename="app-privacy-practices-5.png"
                    />
                    <ArticleImage
                        articleId={ArticleId.iosAppPublishing}
                        alt="App privacy responses publish dialog"
                        filename="app-privacy-practices-6.png"
                    />
                </li>
            </ul>
            <h3>Submit for Review</h3>
            <p>
                Congratulate yourself! You've made it through the App Store maze 🍾 You've filled
                all the necessary sections and you've finally been allowed to submit your app for
                review. Over the next days Apple will take a look at your app and either approve it,
                getting back to you with the good news you are expecting, or reject it, providing a
                detailed explanation with the rejection reasons.
            </p>
            <ArticleImage
                articleId={ArticleId.iosAppPublishing}
                alt="App rejected notification email"
                filename="app-rejected-email.png"
            />
            <p>
                It's ok to get rejected. It only means that there is something you need to change or
                clarify. Go through the rejection reasons and cheerfully fix all the reported
                issues. Eventually you will get a different email, your app will get approved and
                your only concern will be to make your app even better 💃
            </p>
            <ArticleImage
                articleId={ArticleId.iosAppPublishing}
                alt="App approved notification email"
                filename="app-approved-email.png"
            />
        </React.Fragment>
    )
};
