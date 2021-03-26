import React from 'react';
import ReactGist from 'react-gist';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { BlockSnippet } from '../block-snippet';

export const english: ArticleContent = {
    title: 'Email authentication in React Native apps using Firebase',
    description: 'How to implement user authentication in React Native apps using Firebase',
    shareSentence:
        "Building a React Native app? Use Firebase and don't waste time with Authentication!",
    introduction: (
        <p>
            I choose React Native to develop mobile apps because it simplifies development so I want
            user authentication to be as simple as possible too. Firebase provides backend services
            and client side SDKs for authentication purposes and it's built by Google. That's a
            match! This is how to authenticate users with email and password in React Native apps
            using Firebase Authentication.
        </p>
    ),
    body: (
        <React.Fragment>
            <h3>Why Firebase Authentication?</h3>
            <p>
                User authentication has become a mandatory requirement for most applications and
                developers have to implement it again and again. It usually consists of the same set
                of core functionalities (e.g sign up, email verification, sign in, reset password,
                maximum number of failed attempts, etc.) and the effort it requires doesn't actually
                add value to app itself.
            </p>
            <p>
                Moreover, authentication is a critical part of the software and failing to implement
                it properly can lead to security vulnerabilities. You are proud of your developing
                skills and there is nothing you can't do, but relying on a well established
                authentication solution will not make you less of a web developer. With Firebase
                Authentication you will get top-notch security, a robust, well-tested SDK and you
                will save a considerable amount of time. These are some things you get out of the
                box:
            </p>
            <ul>
                <li>
                    <b>Users database</b>. Firebase provides the DB/network infrastructure to store
                    users information. It defines the most common fields (e.g. account creation,
                    last sign in, profile picture, etc.) and automatically hashes users' passwords.
                    You can't add extra fields to the database however; you will need to store
                    additional user information in your app database. This is what the user data
                    looks like:
                    <ReactGist id="c60deeee99e1795bba21404774ce3e9e" />
                </li>
                <li>
                    <b>Email templates</b>. Firebase email authentication comes with predefined
                    email templates that will be sent to users upon certain authentication events
                    (i.e. email address verification and password reset). The templates are plain
                    text, can't be modified and support a single language. It's not a long term
                    solution but will do the trick on the app's early stages.
                    <ArticleImage
                        articleId={ArticleId.reactNativeFirebaseAuth}
                        footer="Firebase authentication templates dashboard"
                        filename="firebase-auth-templates.png"
                    />
                    <ArticleImage
                        articleId={ArticleId.reactNativeFirebaseAuth}
                        footer="Email address verification received email, in Spanish"
                        filename="firebase-auth-email-example.png"
                    />
                </li>
                <li>
                    <b>Administration dashboard</b>. A list of all the users allowing for sorting,
                    filtering, creating new users, disabling accounts or removing them completely.
                    It's only missing import/export functionality but that can be done through
                    command line:
                    <BlockSnippet>firebase auth:export users.csv --format=csv</BlockSnippet>
                    <ArticleImage
                        articleId={ArticleId.reactNativeFirebaseAuth}
                        footer="Firebase users dashboard"
                        filename="firebase-auth-users-list.png"
                    />
                </li>
                <li>
                    <b>Multiple authentication providers</b>. Firebase Authentication is compatible
                    with a large list of authentication providers (Facebook, Apple, Google, etc.).
                    Adding a new authentication method is fairly simple and doesn't change the data
                    structure at all.
                    <ArticleImage
                        articleId={ArticleId.reactNativeFirebaseAuth}
                        footer="Firebase authentication providers"
                        filename="firebase-auth-providers.png"
                    />
                </li>
            </ul>
            <p>
                Finally, using Firebase Authentication doesn't bind you to Firebase. Obviously
                Firebase Authentication plays nicely with the rest of Firebase services (e.g.
                Realtime Database), but you can still have your backend server elsewhere and
                delegate just user authentication to Firebase.
            </p>
            <h3>Configuring Firebase</h3>
            <p>
                You will find the Authentication section in the left menu, under <b>Build</b>. Click
                on <i>Get started</i> and you will be directed to the list of authentication
                providers, all of them disabled by default. You need to enable Email/Password:
            </p>
            <ArticleImage
                articleId={ArticleId.reactNativeFirebaseAuth}
                alt="Firebase authentication home page"
                filename="firebase-auth-home.png"
            />
            <ArticleImage
                articleId={ArticleId.reactNativeFirebaseAuth}
                alt="Firebase authentication providers"
                filename="firebase-auth-providers.png"
            />
            <ArticleImage
                articleId={ArticleId.reactNativeFirebaseAuth}
                alt="Email and password auth provider"
                filename="firebase-auth-email-password-provider.png"
            />
            <p>
                After enabling the first authentication provider a Web API key will be generated for
                the project if the project didn't have one yet. This API key must be provided to the
                client SDK upon initialization and it can be found in the <b>Project Settings</b>{' '}
                section.
            </p>
            <ArticleImage
                articleId={ArticleId.reactNativeFirebaseAuth}
                alt="Firebase project settings"
                filename="firebase-project-settings.png"
            />
            <p>
                We are done configuring. Oh! The <i>Public-facing name</i> will be displayed in the
                email templates replacing the %APP_NAME% variable. Replace it with your app's name
                if you don't want your emails' subject to look like{' '}
                <i>"Verify your email for project-1011404105782"</i>. Doesn't it sound like spam?
            </p>
            <h3>The SDK methods</h3>
            <p>
                Let's move into code. The JavaScript SDK has two methods to sign up and sign in
                users using email and password: <i>createUserWithEmailAndPassword</i> and{' '}
                <i>signInWithEmailAndPassword</i>. That's accurate naming. They both authenticate
                the user against the Firebase backend over HTTP and return a promise. Those promises
                are not meant to be awaited in the conventional manner however (i.e. updating the
                app's state upon resolution).
            </p>
            <p>
                When your app launches Firebase will try to automatically authenticate the user
                based on the last session credentials. Most modern apps automatically sign users in
                when the app launches and with Firebase you get that for free 🤩 To get the user
                credentials upon automatic sign in you will need to subscribe to the{' '}
                <i>onAuthStateChanged</i> Firebase observer.
            </p>
            <p>
                <i>onAuthStateChanged</i> observer watches the user's sign-in state and runs the
                callback parameter every time there is a change. Such changes include the automatic
                sign in event but also the successful resolution of{' '}
                <i>createUserWithEmailAndPassword</i> and <i>signInWithEmailAndPassword</i>{' '}
                promises.
            </p>
            <p>
                So instead of awaiting the mentioned promises and updating the app's state upon
                resolution, you will want to use the <i>onAuthStateChanged</i> observer in the
                following fashion.
                <ReactGist id="4fd4c973c40770b32d551f95db3ed8ec" />
            </p>
            <ul>
                <li>
                    Call <i>onAuthStateChanged</i> once and only once for the entire app lifetime.
                    If you subscribe to the authentication changes multiple times the function will
                    run multiple times for every change on the user's sign-in state. At best you
                    will make your application slower but you are also likely to get strange errors
                    if you need to run some logic upon user sign in.
                </li>
                <li>
                    You don't necessarily need to call the function inside the root component of
                    your app. It's just convenient because it contains all the other components, it
                    has access to the navigation object (if you are using routing/navigation), it
                    only gets "mounted" once and it remains mounted for the entire app lifetime.
                </li>
                <li>
                    Upon every change you must push the new user's sign-in state to all the
                    components that depend on it. You can chose any method you like: pass it as
                    props, inject it through the react context, propagate it through an event bus or
                    use a centralized state management library. I'm a fan of the latter.
                </li>
                <li>
                    You can skip calling the unsubscribing function. I feel unsubscribing keeps
                    things tidier but I'm not sure it actually makes any difference at all.
                </li>
            </ul>
            <p>
                With <i>onAuthStateChanged</i> in place it's just a matter of calling the other
                authentication methods and handling possible errors.
            </p>
            <ReactGist id="bbbaa608f0c60a68dfa4f94e30359043" />
            <p>
                <i>
                    Notice that Firebase will not automatically send a verification email after
                    successful user sign up. You must do that yourself and doing it right after the
                    sign up it's a good way to make sure it only gets done once.
                </i>
            </p>
            <ReactGist id="54e3da59693bab7aba824aa572072b4f" />
            <p>
                Error objects will contain an english message (e.g. "The email address is badly
                formatted.") and a code (e.g. "auth/invalid-email"). You can display the message
                directly to the user or use the code to localize the message for other languages.
            </p>
            <h3>Android timers</h3>
            <p>
                As soon as you start using Firebase JavaScript SDK methods you will start getting a
                warning message when running your app on Android. This is a known issue that occurs
                due to the way React Native handles timers in Android. You can read more about it in
                this{' '}
                <Anchor url="https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact-native%2Fissues%2F12981%23issuecomment-652745831">
                    github issue comment
                </Anchor>
                .
            </p>
            <BlockSnippet>
                Setting a timer for a long period of time, i.e. multiple minutes, is a performance
                and correctness issue on Android as it keeps the timer module awake, and timers can
                only be called when the app is in the foreground. See
                https://github.com/facebook/react-native/issues/12981 for more info. (Saw setTimeout
                with duration 111862ms)
            </BlockSnippet>
            <p>
                Long story short the timers issue is here to stay. Fortunately it's not critical
                one. It only means that things might take longer than expected if the app becomes
                backgrounded. What some developers chose to do is disabling the warning message
                using LogBox (previously named YellowBox).
            </p>
            <ReactGist id="bab2d44625d1570542e195929b238d09" />
            <h3>The screens</h3>
            <p>
                Firebase provides a JavaScript drop-in auth solution that handles the UI flows
                called{' '}
                <Anchor url="https://firebase.google.com/docs/auth/web/firebaseui">
                    FirebaseUI
                </Anchor>
                . These views are designed for web apps and are not compatible with React Native yet
                though. For now we will need to implement our own screens but it's not a big deal
                (just a couple forms) and allows for better customization.
            </p>
            <ArticleImage
                articleId={ArticleId.reactNativeFirebaseAuth}
                filename="firebase-ui-widgets.png"
                footer="FirebaseUI authentication widget"
            />
            <p>
                The screens implementation will differ largely depending on the app. A generic
                approach would consist of a landing page containing links to each of the
                authentication options, including both sign up and sign in forms. You decide how
                many fields the form contains but the less the better; you can always ask for more
                user details after users have created their account. Let's take Wikiloc for example:
            </p>
            <div className="screen-splitter">
                <ArticleImage
                    articleId={ArticleId.reactNativeFirebaseAuth}
                    alt="Wikiloc authentication screen"
                    className="image-300"
                    filename="wikiloc-auth-home.png"
                />
                <ArticleImage
                    articleId={ArticleId.reactNativeFirebaseAuth}
                    alt="Wikiloc sign up screen"
                    className="image-300"
                    filename="wikiloc-auth-sign-up.png"
                />
                <ArticleImage
                    articleId={ArticleId.reactNativeFirebaseAuth}
                    alt="Wikiloc sign in screen"
                    className="image-300"
                    filename="wikiloc-auth-sign-in.png"
                />
            </div>
            <p>
                Remember to protect the password fields setting the <i>secureTextEntry</i> property
                on the corresponding <i>TextInput</i> components, reserve some space to display
                possible error messages, add a screen to reset the password and there's not much
                left to do 💃 In case you need some inspiration, here is a simplified unstyled sign
                in component using typescript, redux and react-navigation. Happy coding!
            </p>
            <ReactGist id="bcb503f4933b65bec619bbe4d541f5e1" />
        </React.Fragment>
    )
};
