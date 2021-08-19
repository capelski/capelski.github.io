import React from 'react';
import ReactGist from 'react-gist';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { BlockSnippet } from '../block-snippet';
import { InlineSnippet } from '../inline-snippet';

export const english: ArticleContent = {
    title: 'First-class push notifications for Expo apps',
    description: 'How to implement push notifications in Expo managed apps',
    shareSentence: "That's how easy it is to bring push notifications to your Expo app!",
    introduction: (
        <p>
            So the time has come for your brilliant Expo app to start delivering push notifications.
            You've had a look at the multiple options available and still you are unsure which one
            to go for. Regardless where you are at now this is all you need to know before
            implementing push notifications on your managed Expo app and how to do so in August
            2021.
        </p>
    ),
    body: (
        <React.Fragment>
            <h3>Introduction</h3>

            <h4>Notification gateways</h4>
            <p>
                Ultimately notifications reach users' devices through push notification gateways:
                FCM (Firebase Cloud Messaging) for Android devices and APNs (Apple Push Notification
                service) for iOS devices. Both gateways are services that expose a Web API for
                sending push notifications to users through HTTP requests.
            </p>
            <p>
                We don't need to know more about these gateways but using them is the only way to
                deliver push notifications to our users. We will need to configure both FCM and APNs
                credentials and call their APIs for our app to successfully deliver notifications.
            </p>

            <h4>Push tokens</h4>
            <p>
                A push token is a unique key that identifies an app installed in a specific device.
                Push tokens are issued by the Apple or Google push notification gateways and allow
                delivering the messages only to the intended app-device combination. Their format
                changes depending on the operating system but they look something like{' '}
                <InlineSnippet>03df25c845d460b...f99cc3edcb63a85ea2ef2</InlineSnippet>.
            </p>

            <h4>Server side requirements</h4>
            <p>
                Any form of messaging involves a sender and a receiver and, in addition, the sender
                needs to know the receiver's ID in order to locate them. When it comes to push
                notifications the receiver's ID is their push token.
            </p>
            <p>
                Users' push tokens will therefore need to be collected and stored somewhere prior to
                sending users notifications. While this doesn't necessarily mean you will need a
                backend server you will certainly need a trusted environment in which to store the
                push tokens and call the notification gateways API.
            </p>
            <ArticleImage
                articleId={ArticleId.expoPushNotifications}
                filename="push-token-collection.png"
                footer="Push token collection"
            />
            <p>
                If you are already leveraging a backend infrastructure it's definitely a good place
                to handle the notification-related operations. If you don't have such infrastructure
                and you want to keep it simple you can use serverless solutions.
            </p>
            <ArticleImage
                articleId={ArticleId.expoPushNotifications}
                filename="push-token-notification.png"
                footer="Sending a push notification to a specific push token"
            />
            <p>
                <i>
                    Notifications can also be sent to the entire audience of the app. If you don't
                    need to send notifications to specific users you can then skip collecting push
                    tokens and setting up a server side environment to send notifications from and
                    use a graphical notifications composer tools instead (e.g. Firebase notification
                    composer).
                </i>
            </p>

            <h3>Technical considerations</h3>

            <h4>Push tokens collection: The Expo way</h4>
            <p>
                Expo provides a great module for setting up and handling push notifications which
                not only works like a charm but it is also magnifically documented:
                <InlineSnippet>expo-notifications</InlineSnippet>. This is the module I'm going to
                be using to handle push notifications on the client side and it provides two
                different methods for collecting push tokens:
            </p>
            <ul>
                <li>
                    <b>
                        <Anchor url="https://docs.expo.dev/versions/latest/sdk/notifications/#getdevicepushtokenasync-devicepushtoken">
                            getDevicePushTokenAsync
                        </Anchor>
                    </b>
                    : This method returns the device native push token, different for iOS and
                    Android, and that's the token we will need to use when communicating directly
                    with the notification gateways
                </li>
                <li>
                    <b>
                        <Anchor url="https://docs.expo.dev/versions/latest/sdk/notifications/#getexpopushtokenasyncoptions-expotokenoptions-expopushtoken">
                            getExpoPushTokenAsync
                        </Anchor>
                    </b>
                    : This method returns an Expo push token (something like{' '}
                    <InlineSnippet>ExponentPushToken[lBc...ZsM]</InlineSnippet>), a custom token
                    that Expo push notifications service uses to deliver notifications instead of
                    the native push tokens. This is the method we need to use when using Expo's
                    service
                </li>
            </ul>

            <h4>Push tokens collection: The Firebase way</h4>
            <p>
                Firebase includes a messaging module that can be used to manage push notifications.
                According to the{' '}
                <Anchor url="https://firebase.google.com/docs/cloud-messaging/js/client">
                    Firebase documentation
                </Anchor>
                , <InlineSnippet>messaging.getToken</InlineSnippet> is the function we need to call
                in order to retrieve the device push token, which will first ask for notification
                permissions in case they have not been granted yet.
            </p>
            <p>
                Unfortunately the Firebase messaging module is not compatible with React native 💔
                Long story short trying to call the messaging module will result in an unhandled
                exception (more details about this issue in this{' '}
                <Anchor url="https://stackoverflow.com/questions/61300018/typeerror-firebase-default-messaging-is-not-a-function-in-firebase-default-m/64855286#64855286">
                    stackoverflow question
                </Anchor>
                ).
            </p>
            <BlockSnippet>
                firebase.default.messaging is not a function. (In '_firebase.default.messaging()',
                '_firebase.default.messaging' is undefined)
                <br />
                &emsp;&emsp;
                {`at App.tsx:34:4 in <global>`}
                <br />
                &emsp;&emsp;at node_modules\metro\src\lib\polyfills\require.js:321:11 in
                loadModuleImplementation
                <br />
                &emsp;&emsp;
                {`at node_modules\expo\AppEntry.js:3:0 in <global>`}
                <br />
                &emsp;&emsp;- ... 4 more stack frames from framework internals
            </BlockSnippet>

            <h4>Expo push notifications service</h4>
            <p>
                While communicating directly with the notification gateways Web APIs is a totally
                acceptable way of sending push notifications I'm going to be using a different
                approach in this article. As explained in the{' '}
                <Anchor url="https://docs.expo.dev/push-notifications/sending-notifications-custom">
                    Expo docs
                </Anchor>{' '}
                notification gateways direct communication requires handling certain complexity:
            </p>
            <ul>
                <li>Differentiating between native iOS & Android device tokens</li>
                <li>Twice the amount of code to write and maintain</li>
                <li>FCM and APNs responses error handling</li>
            </ul>
            <p>
                We could of course handle such complexity but Expo happens to provide an
                iOS-agnostic push notification service that does handle it already. Plus we will be
                using <InlineSnippet>expo-notifications</InlineSnippet> to handle notifications on
                the client side so I feel using the Expo push notifications service makes a lot of
                sense (e.g. the notification <InlineSnippet>data</InlineSnippet> is automatically
                serialized and deserialized by Expo on both ends). This is how the service works:
            </p>
            <ArticleImage
                alt="Expo push notifications service diagram"
                articleId={ArticleId.expoPushNotifications}
                filename="expo-push-notifications-diagram.png"
            />

            <h3>Use case</h3>

            <p>
                Before start coding we will need a use case for push notifications. Let's say we
                will create an app that allows users to subscribe to daily weather notifications.
                For the sake of simplicity we will start with a single city (e.g. Barcelona 🕶️) and
                notifications will always be sent at the same hour (e.g. 8:00 am).
            </p>
            <p>
                Apart from the subscribe/unsubscribe buttons the app will also include a "Send"
                button to receive a test notification on user demand. Users will be anonymous: we
                will only store users' ExpoPushToken so we can identify the devices that need to be
                notified on the scheduled time.
            </p>
            <p>
                Upon notification received/clicked the app will display the notification content
                (I'll use a JSON Viewer for illustrative purposes) and a button to clear the
                notification out. The ExpoPushToken is also displayed so that user can use the{' '}
                <Anchor url="https://expo.dev/notifications">Expo notifications tool</Anchor> to
                send test notifications to his own device.
            </p>
            <p>
                Because it's a demonstration only app we don't need to spend much time styling it.
            </p>

            <div className="screen-splitter">
                <ArticleImage
                    alt="App use case screenshot 1"
                    articleId={ArticleId.expoPushNotifications}
                    className="image-300"
                    filename="use-case-screen-1.png"
                />
                <ArticleImage
                    alt="App use case screenshot 2"
                    articleId={ArticleId.expoPushNotifications}
                    className="image-300"
                    filename="use-case-screen-2.png"
                />
            </div>

            <h3>Implementation: client side</h3>

            <p>
                Handling push notifications on Expo is fairly simple. Let's go ahead and install the
                Expo notifications module.
            </p>

            <BlockSnippet>expo install expo-notifications</BlockSnippet>

            <p>
                We will use the module to define the notification handlers in the main component of
                the app (i.e. <InlineSnippet>App.tsx</InlineSnippet>). For the following snippet to
                be as simple as possible I have extracted the server related functions in a separate
                file (i.e. <InlineSnippet>server-operations.ts</InlineSnippet>) and I have omitted
                all style tags.
            </p>

            <ReactGist id="f5713a2e5cd2a783ac58f23bbe8de8e4" />

            <p>
                We then need to tweak the <InlineSnippet>app.json</InlineSnippet> file a bit by
                adding the <InlineSnippet>NOTIFICATIONS</InlineSnippet> permission and setting the{' '}
                <InlineSnippet>android.useNextNotificationsApi</InlineSnippet> to{' '}
                <InlineSnippet>true</InlineSnippet>.
            </p>

            <ReactGist id="e7617025298dbcc97ded69947acfbbc0" />

            <p>
                And that's all we need to get notifications working on the Expo Go client 🍾 You can
                test them now by using the{' '}
                <Anchor url="https://expo.dev/notifications">Expo notifications tool</Anchor>,
                providing the ExpoPushToken that will be displayed in the app. Pressing the buttons
                on the app will not work until we implement the server side.
            </p>

            <div className="screen-splitter">
                <ArticleImage
                    alt="Expo notification tool send form"
                    articleId={ArticleId.expoPushNotifications}
                    filename="expo-notifications-tool-form.png"
                />
                <ArticleImage
                    alt="Received notification from Expo notification tool"
                    articleId={ArticleId.expoPushNotifications}
                    className="image-300"
                    filename="expo-notifications-tool-received.png"
                />
            </div>

            <p>
                About <InlineSnippet>server-operations.ts</InlineSnippet>, notice that server
                related operations will depend largely on the server side choices. Here is what the
                operations can look like when using Firebase Realtime database and Firebase
                Functions on the server side (omitting error management).
            </p>

            <ReactGist id="62e0dedda61461e6beaa138200e05b6c" />

            <p>
                Let's get ready for release now 🚀 When testing notifications in the Expo Go client
                we use Expo's FCM and APNs credentials but that's not going to do the trick when
                releasing the app. The next thing we need to do to get the push notifications
                working on a release version of our app (e.g. standalone version) is to configure
                and add both FCM and APNs credentials to the Expo app.
            </p>

            <h4>Configuring APNs</h4>

            <p>
                Since we are building on Expo it turns out to be really easy to configure APNs. All
                we need to do is launching the Expo credentials manager and choose from the options
                on the list.
            </p>

            <BlockSnippet>
                expo credentials:manager
                <br />
                <br />
                Accessing credentials for {'<...>'} in project expo-notifications-tutorial
                <br />
                <br />
                ? Select platform › — Use arrow-keys. Return to submit.
                <br />❯ ios
                <br />
                android
                <br />
                <br />? What do you want to do? › - Use arrow-keys. Return to submit.
                <br />❯ Use existing Push Notifications Key in current project
                <br />
                Use existing Distribution Certificate in current project
                <br />
                Remove Provisioning Profile
                <br />
                Add new Push Notifications Key
                <br />
                Remove Push Notification credentials
                <br />
                Update Push Notifications Key
                <br />
                Add new Distribution Certificate
                <br />
                Remove Distribution Certificate
                <br />
                Update Distribution Certificate
            </BlockSnippet>

            <p>
                <i>
                    If you get a "CommandError: Input is required, but Expo CLI is in
                    non-interactive mode." error you will need to use a different command line
                    utility. In my case, developing on Windows 10, the Windows Subsystem for Linux
                    was the only terminal that did the trick.
                </i>
            </p>

            <p>
                Here you will want to use an existing push notifications key for your Expo app in
                case you have one. Be aware that you can only have two push notifications keys for
                the same Apple Developer account and those keys will be used across all of your
                apps.
            </p>

            <p>
                Only create a new push notification key if you don't have any for your current Apple
                Developer account. Trying to create a third push notification key will result in an
                error message both from the Expo credentials manager and the Apple Developer Portal.
            </p>

            <BlockSnippet>
                ✖ Failed to create Apple push key
                <br />
                CommandError:
                <br />
                You can have only two Apple Keys generated on your Apple Developer account.
                <br />
                Please revoke the old ones or reuse existing from your other apps.
                <br />
                Please remember that Apple Keys are not application specific!
                <br />
            </BlockSnippet>

            <ArticleImage
                articleId={ArticleId.expoPushNotifications}
                filename="apple-developer-portal-apns-key.png"
                footer="Apple Developer Portal error message"
            />

            <p>
                Regardless reusing an existing key or creating a new one at the end of the process
                you should see a similar message to the one below. You can also check the{' '}
                <b>Credentials</b> section of your app in{' '}
                <Anchor url="https://expo.dev/">https://expo.dev/</Anchor>.
            </p>

            <BlockSnippet>{`Successfully assigned Push Notifications Key to <...>/expo-notifications-tutorial (expo.notifications.tutorial)`}</BlockSnippet>

            <ArticleImage
                alt="APNs key in Expo credentials section"
                articleId={ArticleId.expoPushNotifications}
                filename="expo-credentials-apns-key.png"
            />

            <p>
                You will need to rebuild the app for iOS,{' '}
                <InlineSnippet>expo build:ios</InlineSnippet>, at least once after having added the
                push notification key for the changes to take effect.
            </p>

            <h4>Configuring FCM</h4>

            <p>
                As stated in the Expo documentation we need to link a Firebase project to our Expo
                app in order to use FCM. This doesn't mean you will need to migrate your app to
                Firebase at all, but you do will need to create a Firebase project and add the
                Firebase credentials to your Expo app. Straight from{' '}
                <Anchor url="https://docs.expo.dev/push-notifications/using-fcm/">
                    this page of the Expo docs
                </Anchor>
                :
            </p>

            <ul>
                <li>
                    Choose your Firebase project. Either create a new project or use an already
                    existing one. In both cases you will need to have Firebase added to your Android
                    app (using the <InlineSnippet>android.package</InlineSnippet> value of your{' '}
                    <InlineSnippet>app.json</InlineSnippet> file)
                    <ArticleImage
                        alt="Adding Firebase to the Android app"
                        articleId={ArticleId.expoPushNotifications}
                        filename="firebase-android-app.png"
                    />
                </li>
                <li>
                    Download the <InlineSnippet>google-services.json</InlineSnippet> file of your
                    Firebase app and place it in your Expo app's root directory. It's a good idea to
                    exclude this file from source control
                    <ArticleImage
                        alt="Downloading Firebase google-services.json file"
                        articleId={ArticleId.expoPushNotifications}
                        filename="firebase-google-services.png"
                    />
                </li>
                <li>
                    In your <InlineSnippet>app.json</InlineSnippet> file add an{' '}
                    <InlineSnippet>android.googleServicesFile</InlineSnippet> field with the
                    relative path to the <InlineSnippet>google-services.json</InlineSnippet> file
                    you just downloaded
                    <ReactGist id="825ea2eb3d9a2bd94af5c936ed97dbb4" />
                </li>
                <li>
                    Rebuild the app for Android, <InlineSnippet>expo build:android</InlineSnippet>,
                    for the changes to take effect
                </li>
            </ul>

            <p>
                <i>
                    Skip the previous steps if you are already using Firebase in your app and you
                    have previously added the <InlineSnippet>google-services.json</InlineSnippet>{' '}
                    file.
                </i>
            </p>

            <p>
                That's all we need to do on the Expo app side but there is one more step we need to
                complete. Because we are using Expo notifications service instead of directly
                calling FCM we need to upload the Firebase project server key to Expo's servers, so
                Expo's service can provide the key for us when calling FCM.
            </p>

            <ArticleImage
                alt="Obtaining Firebase server key"
                articleId={ArticleId.expoPushNotifications}
                filename="firebase-server-key.png"
            />

            <p>
                The Firebase server key can be found in <b>Project settings</b> {'>'}{' '}
                <b>Cloud Messaging</b> {'>'} <b>Server key</b>. Once you locate the server key you
                need to run the following command to upload it to Expo's servers:
            </p>

            <BlockSnippet>expo push:android:upload --api-key AAA...jbQ</BlockSnippet>

            <p>
                Afterwards you can again check the <b>Credentials</b> section of your app in{' '}
                <Anchor url="https://expo.dev/">https://expo.dev/</Anchor> to make sure the server
                key has been correctly uploaded.
            </p>

            <ArticleImage
                alt="FCM server key in Expo credentials section"
                articleId={ArticleId.expoPushNotifications}
                filename="expo-credentials-fcm-key.png"
            />

            <h3>Implementation: server side</h3>

            <p>
                The most relevant task the server code needs to handle is composing and sending the
                push notifications. Because we are relying on Expo push notifications service we
                will use the Expo server SDK (the{' '}
                <Anchor url="https://www.npmjs.com/package/expo-server-sdk">Node.js flavour</Anchor>{' '}
                since I'm coding in Typescript).
            </p>

            <p>
                <InlineSnippet>expo-server-sdk</InlineSnippet> exposes a method named{' '}
                <InlineSnippet>sendPushNotificationAsync</InlineSnippet> that receives an array of
                message objects and schedules the delivery of those messages to the corresponding
                notification gateways. The message objects must be formatted according to Expo. Both
                things can be done in a simple function like the one below (omitting error
                management).
            </p>

            <ReactGist id="32d5f14fbc00ce746b6545632060e0d6" />

            <p>
                About retrieving the push tokens we need to provide to the function, it depends
                again on the server side choices. Sticking to Firebase Realtime database and
                Firebase Functions it can be done like this:
            </p>

            <ReactGist id="549763f3f5679b20ebf750d91af8a700" />

            <p>
                This is not a Firebase tutorial so I'm not going to explain the code above with
                great detail. All we need to know is that creates a Cloud Scheduler job that runs
                every day and notifies the subscribed users and exposes an HTTPS endpoint that can
                be used to send individual notifications at any time.
            </p>

            <p>
                Finally the only missing bit is the function to get the weather data. If you are
                curious about it such function can be implemented as an HTTPS call to the{' '}
                <Anchor url="https://openweathermap.org/">Open Weather</Anchor> web API providing
                the name of the corresponding city:
            </p>

            <ReactGist id="45d7b82690dbb8db8d2714acc0080e53" />

            <h3>Wrapping up</h3>

            <p>
                Give yourself a round of applause 👏 If you have made it this far your app should
                successfully be delivering push notifications on both Android and iOS devices. I'll
                finish this article by tackling a couple issues you might find while testing your
                app.
            </p>

            <h4>Unhandled Firebase composer notification click</h4>

            <p>
                Firebase has a notification composer that can be used to send notifications to the
                entire audience of an app. Sending notifications through this graphical tool will
                indeed deliver notifications to all the users of our app (on Android devices at
                least; I haven't tested it on iOS).
            </p>

            <div className="screen-splitter">
                <ArticleImage
                    articleId={ArticleId.expoPushNotifications}
                    filename="firebase-notification-composer.png"
                    footer="Firebase Cloud Messaging notification composer"
                />
                <ArticleImage
                    alt="Received notification from Firebase composer"
                    articleId={ArticleId.expoPushNotifications}
                    className="image-300"
                    filename="firebase-notification-received.png"
                />
            </div>

            <p>
                An unpleasant surprise appears when clicking on the notification however: the app
                opens but Expo notification handlers are not fired, causing the notification click
                to be missed 😢 At first it might look like an Expo bug but after reading through
                the Expo's repository issues we discover it's actually the expected behavior.
            </p>

            <p>
                As explained{' '}
                <Anchor url="https://github.com/expo/expo/issues/10789#issuecomment-716624242">
                    in this comment
                </Anchor>{' '}
                there are two types of FCM notifications: data messages and notification messages.
                Having a look at the{' '}
                <Anchor url="https://firebase.google.com/docs/cloud-messaging/concept-options#notifications_and_data_messages">
                    provided Firebase documentation page
                </Anchor>{' '}
                we find the cause of the problem:
            </p>

            <BlockSnippet>
                With FCM, you can send two types of messages to clients:
                <br />
                <br />
                Notification messages, sometimes thought of as "display messages." These are handled
                by the FCM SDK automatically.
                <br />
                <br />
                Data messages, which are handled by the client app.
            </BlockSnippet>

            <p>
                So no room for Expo to handle the Firebase composer notifications. We will have to
                live with that and write some more code for the cases in which we need to notify the
                entire audience of the app.
            </p>

            <h4>Unhandled notification click on app launch (on Android)</h4>

            <p>
                In the code above we are defining the notifications handlers from a{' '}
                <InlineSnippet>useEffect</InlineSnippet> inside the App component given we need
                React to update the app to display the content of the received notifications.
            </p>

            <p>
                There's nothing wrong with it but, as explained in{' '}
                <Anchor url="https://github.com/expo/expo/issues/6943#issuecomment-677901678">
                    this github issue
                </Anchor>
                , if the handlers are not defined as soon as possible upon app launch the
                notification click might go unnoticed when launching the app from closed state.
                That's exactly what occurs now when clicking on a notification while the app is in
                closed state.
            </p>

            <p>
                Luckily this issue can be worked around. A simple way is to define stub notification
                handlers on app launch, outside any component, and define the the actual handlers'
                behavior later on (e.g. from a <InlineSnippet>useEffect</InlineSnippet> inside a
                component). The catch to this approach is that stub handlers allow us to track
                notifications received before the actual handler's behavior is defined.
            </p>

            <p>Looks easier than it sounds and, elegant or not, it works 💪:</p>

            <ReactGist id="fe3e1dad37b9ec8a19ee336339fe87c8" />

            <p>
                And that's the end of it! You can find all the source code you might need to check
                in{' '}
                <Anchor url="https://github.com/capelski/expo-notifications-tutorial">
                    this repository
                </Anchor>
                . Happy coding 🥳
            </p>
        </React.Fragment>
    )
};
