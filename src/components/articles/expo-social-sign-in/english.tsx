import React from 'react';
import ReactGist from 'react-gist';
import { NavLink } from 'react-router-dom';
import { articleRoute } from '../../routes';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { BlockSnippet } from '../block-snippet';
import { InlineSnippet } from '../inline-snippet';

export const english: ArticleContent = {
    title: 'Apple/Google authentication in Expo apps using Firebase',
    description: 'How to implement Apple and Google authentication in Expo apps using Firebase',
    shareSentence:
        "Want to improve your Expo app's sign-up conversion rate? Here is how to add social sign-in using Firebase!",
    introduction: (
        <p>
            You are authenticating your Expo app users with email and password using Firebase. It
            works great but marketing funnels seem to indicate that users quit the app at the sign
            up screen. Looks like offering social sign options will help mitigate that problem, so
            says the marketing department, and you now want to add Apple sign-in and Google sign-in
            to your app. This is how to do it in February 2021!
        </p>
    ),
    body: (
        <React.Fragment>
            <p>
                <i>
                    To follow along with this story you need to meet this two requirements. You can
                    check how to do so in{' '}
                    <NavLink
                        to={articleRoute.path.replace(
                            ':articleId',
                            ArticleId.reactNativeFirebaseAuth
                        )}
                    >
                        Email authentication in React Native apps using Firebase
                    </NavLink>
                    :
                </i>
            </p>
            <ul>
                <li>
                    <i>Have an existing Firebase project with Authentication enabled</i>
                </li>
                <li>
                    <i>
                        Handle successful user authentication through Firebase{' '}
                        <InlineSnippet>onAuthStateChanged</InlineSnippet> listener
                    </i>
                </li>
            </ul>
            <h3>Firebase limitations in React Native</h3>
            <p>
                The Firebase Javascript SDK has an specific method called{' '}
                <InlineSnippet>signInWithPopup</InlineSnippet> to handle authentication providers'
                sign-in flow using OAuth. Relaying on the Firebase{' '}
                <Anchor url="https://firebase.google.com/docs/auth/web/apple">
                    Apple authentication documentation page
                </Anchor>{' '}
                will instruct us to handle the sign-in flow in the following fashion:
            </p>
            <ReactGist id="1bb4b55d72cf38daef7a658cf4d81147" />
            <p>
                Using this approach in React Native apps will raise an exception however. This
                happens because the Firebase Javascript SDK is designed for web applications and the{' '}
                <InlineSnippet>signInWithPopup</InlineSnippet> method expects the app to run in a
                browser. Frog! We will need to find another way to do it.
            </p>
            <BlockSnippet>
                Error: This operation is not supported in the environment this application is
                running on. "location.protocol" must be http, https or chrome-extension and web
                storage must be enabled.
            </BlockSnippet>
            <p>
                Fortunately for us we are using Expo 🎉 and Expo has two modules designed for this
                specific purpose: <InlineSnippet>expo-google-app-auth</InlineSnippet> and{' '}
                <InlineSnippet>expo-apple-authentication</InlineSnippet>. Both modules authenticate
                the user against the corresponding provider and return a credential that can be used
                to authenticate the user in Firebase through the{' '}
                <InlineSnippet>signInWithCredential</InlineSnippet> method.
            </p>
            <p>
                <i>
                    In fact Expo provides two modules to authenticate users against Google:{' '}
                    <InlineSnippet>expo-google-app-auth</InlineSnippet> and{' '}
                    <InlineSnippet>expo-google-sign-in</InlineSnippet>. They both achieve the same
                    goal but the latter uses native Google authentication while the former uses a
                    secure system web browser. At practice this means that{' '}
                    <InlineSnippet>expo-google-sign-in</InlineSnippet> requires a bit more
                    configuration and it doesn't work in the Expo Go client. Feel free to use the
                    one you like better.
                </i>
            </p>
            <p>
                Having set the strategy it's just a matter of completing the necessary steps for
                each of the two modules. Let's go one by one.
            </p>
            <h3>Sign in with Google</h3>
            <p>
                Go ahead and install <InlineSnippet>expo-google-app-auth</InlineSnippet>. We will
                then use the straightforward <InlineSnippet>logInAsync</InlineSnippet> method to get
                the users' credentials. This method needs at least three parameters:{' '}
                <InlineSnippet>androidStandaloneAppClientId</InlineSnippet>,{' '}
                <InlineSnippet>iosStandaloneAppClientId</InlineSnippet>, and{' '}
                <InlineSnippet>scopes</InlineSnippet>.
            </p>
            <p>
                The first two are OAuth 2.0 Client IDs that are automatically generated by Firebase
                when you activate the corresponding authentication providers while the third is a
                list of OAuth 2.0 scopes. Let's enable Google authentication provider and get our
                client IDs before moving into the code.
            </p>
            <p>
                Navigate to <b>Authentication {'>'} Sign-in method</b> and enable Google. After
                saving the changes the <i>Web client ID</i> and <i>Web client secret</i> fields will
                get populated but this is not the Client ID we are looking for.
            </p>
            <ArticleImage
                articleId={ArticleId.expoSocialSignIn}
                alt="Firebase authentication providers list"
                filename="firebase-auth-providers.png"
            />
            <ArticleImage
                articleId={ArticleId.expoSocialSignIn}
                alt="Firebase Google authentication provider"
                filename="firebase-google-auth-provider.png"
            />
            <p>
                The client ID we need is generated after enabling the Google sign-in method and can
                be found in the corresponding Google Cloud Platform project. Go to{' '}
                <Anchor url="https://console.cloud.google.com/">
                    https://console.cloud.google.com/
                </Anchor>
                , select the Firebase project (every Firebase project creates an associated GCP
                project) and navigate to{' '}
                <b>
                    APIs & Services {'>'}
                    Credentials
                </b>
                . There you will see a list of OAuth 2.0 Client IDs:
            </p>
            <ArticleImage
                articleId={ArticleId.expoSocialSignIn}
                alt="Google Cloud Platform credentials dashboard"
                filename="gcp-oauth-client-ids.png"
            />
            <p>
                Great! Now let's drop those client IDs into some code 💪 You might want to create
                environment variables for the client IDs instead of including them in the source
                code but I'm not doing so here for the sake of simplicity.
            </p>
            <ReactGist id="a47a64db2a2fe7d4ad3469655d98addf" />
            <p>
                The <InlineSnippet>logInAsync</InlineSnippet> call returns a promise with the result
                of the operation. If the result type equals The{' '}
                <InlineSnippet>success</InlineSnippet> we will then find the{' '}
                <InlineSnippet>idToken</InlineSnippet> and{' '}
                <InlineSnippet>accessToken</InlineSnippet> in the result, which we will use to
                authenticate the user in Firebase by creating a GoogleAuthProvider credential. If
                the result equals <InlineSnippet>cancel</InlineSnippet> means the user didn't
                complete the sign-in flow. Easy as 1,2,3!
            </p>
            <p>
                Keep in mind that the code above will not work on the Expo Go client. You can either{' '}
                <b>create a new Internal testing release</b> on Google Play console and install the
                app on an Android device or <b>generate new OAuth 2.0 Client IDs</b> for testing
                purposes and pass them to <InlineSnippet>logInAsync</InlineSnippet> using the{' '}
                <InlineSnippet>androidClientId</InlineSnippet> and{' '}
                <InlineSnippet>iosClientId</InlineSnippet> parameters (in which case you will need 4
                client IDs).
            </p>
            <h3>Sign in with Apple</h3>
            <p>
                Before starting configuring the Apple sign-in service I suggest you to read{' '}
                <Anchor url="https://medium.com/@dansinger_68758/adding-sign-in-with-apple-to-a-managed-expo-app-using-firebase-authentication-ca331b4de05">
                    this helpful story
                </Anchor>{' '}
                from Dan Singer. There you will find some considerations that must be taken into
                account before adding the Apple sign-in into an Expo app, along with the explanation
                on how to do it. In this story I'll be extending his tutorial with more detail.
            </p>
            <p>
                <i>
                    It comes as no surprise that Apple's sign-in is more complicated than Google's
                    one and it can be tempting to skip it. Apple won't make so easy though. As
                    stated in{' '}
                    <Anchor url="https://developer.apple.com/app-store/review/guidelines/#sign-in-with-apple">
                        this section of the App Store Review Guidelines
                    </Anchor>
                    , "apps that use social login services (e.g. Google sign-in) must also offer
                    Sign in with Apple as an equivalent option". So let's make our best to get it
                    working!
                </i>
            </p>
            <p>
                First we need to install the necessary modules:{' '}
                <InlineSnippet>expo-apple-authentication</InlineSnippet> and{' '}
                <InlineSnippet>expo-crypto</InlineSnippet>. We will use the{' '}
                <InlineSnippet>signInAsync</InlineSnippet> method from the{' '}
                <InlineSnippet>expo-apple-authentication</InlineSnippet> module to, just as we did
                before, get the user's credentials and then authenticate the user in Firebase using
                those credentials.
            </p>
            <p>
                The difference this time is that <InlineSnippet>signInAsync</InlineSnippet> does not
                return an OAuth access token. As Dan Singer points in his story, we can get around
                this issue by providing a SHA256-hashed nonce to the{' '}
                <InlineSnippet>signInAsync</InlineSnippet> function and then pass the original nonce
                to Firebase's <InlineSnippet>signInWithCredential</InlineSnippet>. That's why we
                also need the <InlineSnippet>expo-crypto</InlineSnippet> module. Let's put it all
                together:
            </p>
            <ReactGist id="ea93abe5f49d1db77bab773ea83a894d" />
            <p>
                The <InlineSnippet>requestedScopes</InlineSnippet> parameter is a list of OAuth 2.0
                scopes. Not that complicated after all! Next thing we need to care about is the UI.
                While Google let's you display their sign-in button the way you want Apple will
                require you to use a guideline approved button. In fact it's normal to get rejected
                because the sign in button doesn't meet the requirements.
            </p>
            <ArticleImage
                articleId={ArticleId.expoSocialSignIn}
                alt="App Store rejection e-mail due to non compliant Sign-in button"
                footer="App Store rejection e-mail due to non compliant Sign-in button"
                filename="apple-sign-in-button-rejection.png"
            />
            <p>
                The simplest way to prevent the rejection is to use the "corporative" button Expo
                provides for us. Keep in mind that Apple sign-in only works on iOS devices so we
                need to check whether it's available or not before rendering the button. Expo gets
                us covered with the <InlineSnippet>isAvailableAsync</InlineSnippet> method:
            </p>
            <ReactGist id="17de06c5390b050620c548a9a5f233ce" />
            <p>
                Well! Having the code in place we can now move on to configuring the services. Let's
                start with Apple and we will tackle Firebase afterwards. Expo team did a great job
                documenting the necessary steps in the{' '}
                <Anchor url="https://developer.apple.com/app-store/review/guidelines/#sign-in-with-apple">
                    <InlineSnippet>expo-apple-authentication</InlineSnippet>
                </Anchor>{' '}
                page so make sure to take a look at it.
            </p>
            <p>
                First add the <InlineSnippet>usesAppleSignIn</InlineSnippet> property to your{' '}
                <InlineSnippet>app.json</InlineSnippet> configuration file. Then head to{' '}
                <Anchor url="https://developer.apple.com/">Apple Developer Portal</Anchor> to do the
                following two things:
            </p>
            <ReactGist id="2615d8fc1ef19e0be681ae17c1f2872a" />
            <ul>
                <li>
                    Enable the Sign In with Apple capability for your App ID. Navigate to{' '}
                    <b>Certificates, IDs & Profiles {'>'} Identifiers</b> and select your App ID. In
                    the Capabilities list select <i>Sign In with Apple</i> and click{' '}
                    <i>Configure</i>. Leave the <i>Enable as a primary App ID</i> option selected
                    and provide the Return URL for your Firebase app (step 1 in the{' '}
                    <Anchor url="https://firebase.google.com/docs/auth/web/apple#configure-sign-in-with-apple">
                        Firebase Apple Auth documentation page
                    </Anchor>
                    )
                    <ArticleImage
                        articleId={ArticleId.expoSocialSignIn}
                        alt="Sign in with Apple App ID capability"
                        filename="sign-in-with-apple-1.png"
                    />
                    <ArticleImage
                        articleId={ArticleId.expoSocialSignIn}
                        alt="Sign in with Apple return url"
                        filename="sign-in-with-apple-2.png"
                    />
                </li>
                <li>
                    Enable the Sign In with Apple service in your app private key. If your app
                    doesn't use a private key yet you will need to create a new one. Navigate to{' '}
                    <b>Certificates, IDs & Profiles {'>'} Keys</b> and select your key. Click{' '}
                    <i>Edit</i>, select the <i>Sign in with Apple</i> service and click{' '}
                    <i>Configure</i>. In the list of Primary App IDs select the ID of your app.
                    <ArticleImage
                        articleId={ArticleId.expoSocialSignIn}
                        alt="Sign in with Apple Key service"
                        filename="sign-in-with-apple-3.png"
                    />
                    <ArticleImage
                        articleId={ArticleId.expoSocialSignIn}
                        alt="Sign in with Apple Primary App ID"
                        filename="sign-in-with-apple-4.png"
                    />
                </li>
            </ul>
            <p>
                We are done with Apple 💃 Notice that we modified the App ID configuration and that
                will invalidate the app Provisioning Profile. Fortunately we can easily generate a
                new Profile as well as revoke the old one thanks to Expo by using a couple command
                line arguments next time we build the app:
            </p>
            <BlockSnippet>
                expo build:ios --clear-provisioning-profile --revoke-credentials
            </BlockSnippet>
            <p>
                We are almost there! We only need to enable Apple authentication provider in
                Firebase and will have arrived to our destination: success. Head to the{' '}
                <Anchor url="https://console.firebase.google.com/">Firebase console</Anchor>,
                navigate to <b>Authentication {'>'} Sign-in method</b> and enable Apple.
            </p>
            <ArticleImage
                articleId={ArticleId.expoSocialSignIn}
                alt="Firebase Apple authentication provider"
                filename="firebase-apple-auth-provider-1.png"
            />
            <p>
                In the <i>Services ID</i> field you will need to provide the ID of the{' '}
                <i>Sign In with Apple</i> service you've enabled in the app private key. You can
                find the Service ID in the Apple Developer Portal navigating to{' '}
                <b>Certificates, IDs & Profiles {'>'} Keys</b> and selecting your key. Next to the{' '}
                <i>Sign In with Apple</i> enabled service you will find the ID which looks like{' '}
                <i>
                    {'{'}TeamID{'}'}.{'{'}Bundle ID{'}'}
                </i>
                .
            </p>
            <ArticleImage
                articleId={ArticleId.expoSocialSignIn}
                alt="Sign in with Apple Service ID"
                filename="sign-in-with-apple-5.png"
            />
            <p>
                The <i>OAuth code flow configuration</i> section is optional and I'm not sure it
                makes a difference to fill in the details or not. Given you only need your Apple
                Team ID and your app's private key I prefer to provide them but, again, I'm not sure
                it makes a difference. Feel free to skip this part and test your luck 🤞
            </p>
            <ArticleImage
                articleId={ArticleId.expoSocialSignIn}
                alt="Firebase Apple authentication provider configuration"
                filename="firebase-apple-auth-provider-2.png"
            />
            <p>
                <i>
                    You can download your private key (a .p8 format file) from the Apple Developer
                    Portal but you can only do it once. If you let Expo handle the process back in
                    the day then you probably won't be able to download the key. You can manually
                    generate a new key from the Apple Developer Portal and then use{' '}
                    <InlineSnippet>expo credentials:manager</InlineSnippet> to replace the private
                    key your app uses.
                </i>
            </p>
            <p>
                Save the changes, head to the command line to generate a new .ipa in case you
                haven't done it above and that's all there is 🎉 Wait for the new app version to be
                available in TestFlight and delight yourself with the wonders of the 21st century
                state-of-the-art authentication. Happy coding!
            </p>
        </React.Fragment>
    )
};
