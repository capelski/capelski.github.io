import React from 'react';
import ReactGist from 'react-gist';
import { ArticleContent } from '../article-data';
import { ArticleImage } from '../article-image';
import { ArticleId } from '../article-id';
import { Anchor } from '../anchor';
import { BlockSnippet } from '../block-snippet';
import { InlineSnippet } from '../inline-snippet';

export const english: ArticleContent = {
    title: 'A comprehensive WebRTC walkthrough',
    description: 'How to establish a connection between two browsers using WebRTC',
    shareSentence: 'Establishing a connection between two browsers via WebRTC',
    introduction: (
        <p>
            WebRTC allows for real-time communication between two peers using only the browser's
            built-in functionalities, with no need for a communications server. That's AWESOME. But
            turns out that the browser API is complex, and I find the{' '}
            <Anchor url="https://webrtc.github.io/samples/">official samples</Anchor> repository a
            bit confusing. Here is an attempt to provide a clearer example.
        </p>
    ),
    body: (
        <React.Fragment>
            <p>
                The idea is to establish a connection between two browsers (or two tabs of the same
                browser) running the same Javascript code. The browsers, or <b>peers</b>, can be
                either in the same device or in different devices and each of them will be able to
                act both as the <b>starter</b> or the <b>receiver</b> of a connection.
            </p>
            <h3>Connection overview</h3>
            <p>
                Before diving into the code it's worth understanding the steps involved in
                establishing a WebRTC connection. Let's have a look at the following simplified
                connection diagram (based on the{' '}
                <Anchor url="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Connectivity">
                    WebRTC Connectivity
                </Anchor>{' '}
                documentation), which reflects the basic operations the two peers need to execute:
            </p>
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="webrtc-connection-diagram.png"
                footer="WebRTC connection diagram"
            />
            <ul className="numbered">
                <li>
                    <b>Initialize</b>. Both peers create a new connection object.
                </li>
                <li>
                    <b>Media</b>. Peer A adds media to the connection (i.e. data channels and/or
                    stream tracks).
                </li>
                <li>
                    <b>Offer creation</b>. Peer A creates an offer (i.e. session description) and
                    sets it as the local description. The latter will generate several ICE
                    candidates.
                </li>
                <li>
                    <b>Offer exchange</b>. Peer A sends the offer and its ICE candidates to peer B
                    through the <b>signaling service</b>.
                </li>
                <li>
                    <b>Offer reception</b>. Peer B sets the offer as the remote description and then
                    adds the remote ICE candidates.
                </li>
                <li>
                    <b>Media</b>. If needed, Peer B adds media to the connection (i.e. data channels
                    and/or stream tracks).
                </li>
                <li>
                    <b>Answer creation</b>. Peer B creates an answer (i.e. session description) and
                    sets it as the local description. Again, the latter will generate several ICE
                    candidates.
                </li>
                <li>
                    <b>Answer exchange</b>. Peer B sends the answer to peer A through the{' '}
                    <b>signaling service</b>. This time, it's not necessary to send the ICE
                    candidates.
                </li>
                <li>
                    <b>Answer reception</b>. Peer A sets the answer as the remote description. The
                    connection has been established!
                </li>
            </ul>
            <p>
                The steps 4 and 8 involve a so called "signaling service". In communication systems
                (e.g. post, telephone, email, instant messaging, etc.) when a peer wants to send a
                message or establish a connection they need to know the identifier of the recipient:
                a postal address, a phone number, an email address, etc.
            </p>
            <p>
                In WebRTC however peers do not have identifiers. Instead each peer generates two
                pieces of information every time they want to establish a new connection, and both
                pieces are valid only once. From the{' '}
                <Anchor url="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Connectivity">
                    MDN documentation
                </Anchor>
                :
            </p>
            <ul>
                <li>
                    <b>Session description</b>: includes information about the kind of media being
                    sent, its format, the transfer protocol being used, the endpoint's IP address
                    and port, and other information needed to describe a media transfer endpoint. It
                    looks like this:
                    <BlockSnippet>
                        {'{'}"type":"offer","sdp":"v=0\r\no=- 8446939022420648928 2 IN IP4
                        127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE
                        0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9
                        UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4
                        0.0.0.0\r\na=ice-ufrag:RdRl\r\na=ice-pwd:EkNvZFozr3G6cCQcblkfYWI9\r\na=ice-options:trickle\r\na=fingerprint:sha-256
                        76:53:B4:D3:73:BD:B7:AE:61:7F:05:33:61:34:85:F7:3C:68:05:EC:93:BE:F8:0A:FD:BB:E3:4D:83:1A:B5:50\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"
                        {'}'}
                    </BlockSnippet>
                </li>
                <li>
                    <b>ICE Candidate</b>: includes information about the network connection and
                    details the available methods the peer is able to communicate through. It looks
                    like this:
                    <BlockSnippet>
                        {'{'}"candidate":"candidate:3426902834 1 udp 2113939711
                        60c8b1aa-d1e7-46f7-954d-9183cc7efe63.local 54523 typ host generation 0 ufrag
                        RdRl network-cost
                        999","sdpMid":"0","sdpMLineIndex":0,"usernameFragment":"RdRl"{'}'}
                    </BlockSnippet>
                </li>
            </ul>
            <p>
                Because this information needs to be acquired by each peer PRIOR to establishing the
                connection, we need to exchange it via an already existing connection or channel.
                Such channel is called <b>signaling service</b> and it can be anything: from an
                actual server (most likely a websocket server) to, quoting the documentation,
                "email, postcard, or a carrier pigeon".
            </p>
            <p>
                In this example we will use the computer's clipboard as our signaling service: in
                order to exchange the session data we will copy it from one browser and paste it in
                the other 📋
            </p>
            <h3>Coding time</h3>
            <p>Based on the steps described above we need to implement the following functions:</p>
            <ul>
                <li>
                    <InlineSnippet>initialize</InlineSnippet>. Creates a new RTCPeerConnection
                    instance and defines a bunch of event handlers:
                    <ul>
                        <li>
                            <InlineSnippet>onicecandidate</InlineSnippet> (connection). Will be
                            called for each local ICE candidate generated when setting the local
                            description. We will need to capture those candidates in order to send
                            them to the other peer.
                        </li>
                        <li>
                            <InlineSnippet>ontrack</InlineSnippet> (connection). Will be called for
                            each stream track added by the other peer once the connection is
                            established. We will want to consume those tracks, from an HTML video
                            element for example.
                        </li>
                        <li>
                            <InlineSnippet>ondatachannel</InlineSnippet> (connection). Will be
                            called for each data channel the other peer has created. We will need to
                            keep track of those channels to receive/send messages through them.
                        </li>
                        <li>
                            <InlineSnippet>onopen</InlineSnippet> (channel). Will be called on a
                            data channel once the connection is established. It tells us the channel
                            is ready to start sending/receiving.
                        </li>
                        <li>
                            <InlineSnippet>onmessage</InlineSnippet> (channel). Will be called on a
                            data channel every time a message is received. We will want to keep
                            track of the messages and update the UI accordingly.
                        </li>
                        <li>
                            <InlineSnippet>onclose</InlineSnippet> (channel). Will be called on a
                            data channel when the channel or the connection are closed. It tells us
                            the channel is no longer available for sending/receiving.
                        </li>
                    </ul>
                    <br />
                    <ReactGist id="8bd1e47ed2d7505eb24bd515dfc93844" />
                    <br />
                    The event handlers can be anything that works: plain functions, EventTarget,
                    rxjs subscriptions, etc. Their implementation will depend on the application
                    needs and the underlying framework. For a relatively simple React example, have
                    a look at{' '}
                    <Anchor url="https://github.com/capelski/webrtc-example-simple/blob/main/src/index.tsx#L43">
                        this file
                    </Anchor>
                    .
                </li>
                <li>
                    <InlineSnippet>createDataChannel</InlineSnippet>. Creates a new RTCDataChannel
                    object on a RTCPeerConnection object and defines a few event handlers (which we
                    have already introduced in the previous bullet point):
                    <ReactGist id="1096be3c8b1ffc3c1f86d8cdb674b800" />
                </li>
                <li>
                    <InlineSnippet>addUserMediaTracks</InlineSnippet>. Adds media stream tracks
                    (generated separately) to a RTCPeerConnection object.
                    <ReactGist id="2d1a29e8680e05d413725c137b0ae634" />
                </li>
                <li>
                    <InlineSnippet>createAndSetOffer</InlineSnippet>. Creates an offer (i.e. session
                    description) from a RTCPeerConnection object and sets the offer as the local
                    description of the connection.
                    <ReactGist id="3f9820cb2aa34d04d2dd698a0220fe20" />
                </li>
                <li>
                    <InlineSnippet>createAndSetAnswer</InlineSnippet>. Creates an answer (i.e.
                    session description) from a RTCPeerConnection object and sets the answer as the
                    local description of the connection.
                    <ReactGist id="abc725581e507b53811298527def89bb" />
                </li>
                <li>
                    <InlineSnippet>setRemoteDescription</InlineSnippet>. Sets the remote description
                    of a RTCPeerConnection object, either the offer or the answer, received via
                    signaling service.
                    <ReactGist id="3cd4a5df9a2fabce7e0aaacca5681c0d" />
                </li>
                <li>
                    <InlineSnippet>addIceCandidates</InlineSnippet>. Adds the ICE candidates
                    generated by the starting peer, received by the answering peer via signaling
                    service.
                    <ReactGist id="375e2ad38118ece2ac69023a1c0c0777" />
                </li>
            </ul>
            <p>
                Here is a web app putting together all the functions:{' '}
                <Anchor url="https://capelski.github.io/webrtc-example/">
                    https://capelski.github.io/webrtc-example/
                </Anchor>
                . It is meant to reflect the connection negotiation, display the session description
                of each peer and help inputting the corresponding information of the other peer. It
                also has some logic to guarantee that the RTCPeerConnection methods are called in
                the right order.
            </p>
            <p>
                <i>
                    Note that, at the time of writing, the web app doesn't work on Firefox, since
                    Firefox doesn't support{' '}
                    <Anchor url="https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/connectionState#browser_compatibility">
                        connectionstate
                    </Anchor>{' '}
                    nor{' '}
                    <Anchor url="https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/connectionstatechange_event#browser_compatibility">
                        onconnectionstatechange
                    </Anchor>
                    .
                </i>
            </p>
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="initialization.png"
                footer="Initialize the RTCPeerConnection objects"
            />
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="channels-creation.png"
                footer="Create data channels and/or stream tracks in peer A"
            />
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="create-offer.png"
                footer="Create an offer in peer A"
            />
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="set-local-description-offer.png"
                footer="Set the offer as local description in peer A"
            />
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="set-remote-description-offer.png"
                footer="Set the offer as remote description in peer B"
            />
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="set-remote-ice-candidates.png"
                footer="Add remote ICE candidates in peer B"
            />
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="create-answer.png"
                footer="Create an answer in peer B"
            />
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="set-local-description-answer.png"
                footer="Set the answer as local description in peer B"
            />
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="set-remote-description-answer.png"
                footer="Set the answer as remote description in peer A"
            />
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="connection-established.png"
                footer="Connection negotiation finalized"
            />
            <h3>Data channels</h3>
            <p>
                After the connection has been established, every data channel triggers an{' '}
                <InlineSnippet>onopen</InlineSnippet> event, and both peers are able to send
                messages through them by calling the <InlineSnippet>send</InlineSnippet> method on
                the corresponding RTCDataChannel object. The incoming messages need to be handled
                through the <InlineSnippet>onmessage</InlineSnippet> handler (which we already
                defined earlier on).
            </p>
            <ReactGist id="edbca5e285c6e597b1bc6023bec3bb8b" />
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="peer-a-send-message.png"
                footer="Sending message from peer A"
            />
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="peer-b-receive-message.png"
                footer="Message received by peer B"
            />
            <p>
                When a channel is no longer necessary it can be closed by any of the two peers by
                calling its <InlineSnippet>close</InlineSnippet> method. This will fire a{' '}
                <InlineSnippet>close</InlineSnippet> event on the RTCDataChannel object of both
                peers.
            </p>
            <ReactGist id="076d1632140765f78612a49e8c2bb88a" />
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="close-data-channel-before.png"
                footer="Closing data channel"
            />
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="close-data-channel-after.png"
                footer="Data channel closed"
            />
            <h3>Stream tracks</h3>
            <p>
                After the connection has been established, remote stream tracks become available for
                the local peer to consume. Note that the stream tracks management is completely
                independent from the WebRTC connection. The connection object is only concerned
                about making the remote stream tracks available: creation, consumption and
                destruction must be handled explicitly. A few considerations:
            </p>
            <ul>
                <li>
                    <InlineSnippet>addTrack</InlineSnippet> adds an existing track to the connection
                    and returns a RTCRtpSender object, which can be used to remove the track from
                    the connection.
                </li>
                <li>
                    <InlineSnippet>removeTrack</InlineSnippet> removes a track from the connection
                    using the corresponding RTCRtpSender object.
                </li>
                <li>
                    Both <InlineSnippet>addTrack</InlineSnippet> and{' '}
                    <InlineSnippet>removeTrack</InlineSnippet> won't have any effect once the
                    connection has been established: they need to be called BEFORE generating an
                    offer/answer.
                </li>
                <li>
                    Tracks trigger{' '}
                    <Anchor url="https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/ended_event">
                        <InlineSnippet>ended</InlineSnippet>
                    </Anchor>{' '}
                    events when "playback or streaming has stopped because the end of the media was
                    reached or because no further data is available". Stopping a track however will{' '}
                    <Anchor url="https://stackoverflow.com/questions/55953038/why-is-the-ended-event-not-firing-for-this-mediastreamtrack">
                        not generate an ended event
                    </Anchor>{' '}
                    on neither of the peers. In other words, peer A will not get notified when peer
                    B stops consuming peer A's tracks, neither when peer B stops peer B's own
                    tracks.
                </li>
            </ul>
            <h3>Connection tear down</h3>
            <p>
                The connection can be terminated by calling the <InlineSnippet>close</InlineSnippet>{' '}
                method on the RTCPeerConnection object, which will close any existing data channels
                and close the connection itself. Note however that closing the connection will not
                send any "closed" event to the peer. We will need to either use the signaling
                service to let the peer know that we have terminated the connection or rely on{' '}
                <InlineSnippet>onConnectionStateChange</InlineSnippet> (not supported in Firefox) to
                detect the change of the connection state.
            </p>
            <p>
                <i>
                    The same applies to media stream tracks and HTML video elements: they both need
                    to be stopped explicitly.
                </i>
            </p>
            <ReactGist id="d9502e79b056d9600182699b7c32d5dc" />
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="close-connection-01.png"
                footer="Closing connection"
            />
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="close-connection-02.png"
                footer="Connection closed in local peer"
            />
            <ArticleImage
                articleId={ArticleId.webRTC}
                filename="close-connection-03.png"
                footer="Connection closed in remote peer"
            />
            <h3>Troubleshooting</h3>
            <p>
                Finally, here are a few common error messages you might come across, their meaning
                and how to fix them.
            </p>
            <br />
            <BlockSnippet>
                ❌ DOMException: Failed to execute 'addIceCandidate' on 'RTCPeerConnection': The
                remote description was null
            </BlockSnippet>
            <p>
                You are most likely adding remote ICE candidates to a connection object before the
                remote description has been set. The remote description must be set BEFORE adding
                ice candidates.
            </p>
            <br />
            <BlockSnippet>
                ❌ Failed to execute 'setLocalDescription' on 'RTCPeerConnection': Failed to set
                local offer sdp: Called in wrong state: have-remote-offer
            </BlockSnippet>
            <p>
                You are most likely trying to set an offer as the local description on a connection
                object that has already set it's remote description. Once the remote description has
                been set, the connection object can only set an answer as the local description.
            </p>
            <br />
            <BlockSnippet>
                ❌ Failed to execute 'setLocalDescription' on 'RTCPeerConnection': Failed to set
                local answer sdp: Called in wrong state: stable
            </BlockSnippet>
            <p>
                You are most likely trying to set the local description on a connection object that
                has already established a connection.
            </p>
            <br />
            <BlockSnippet>
                ❌ Failed to execute 'createAnswer' on 'RTCPeerConnection': PeerConnection cannot
                create an answer in a state other than have-remote-offer or have-local-pranswer.
            </BlockSnippet>
            <p>
                You are most likely trying to create an answer from a connection object that has not
                set it's remote description yet. A connection object can only generate an answer
                AFTER having set a remote description.
            </p>
            <br />
            <BlockSnippet>
                ❌ Failed to execute 'send' on 'RTCDataChannel': RTCDataChannel.readyState is not
                'open'
            </BlockSnippet>
            <p>
                You are most likely trying to send data through a channel that has not yet emitted
                its <InlineSnippet>onopen</InlineSnippet> event.
            </p>
            <br />
            <BlockSnippet>
                ❌ Failed to execute 'createOffer' on 'RTCPeerConnection': The RTCPeerConnection's
                signalingState is 'closed'
            </BlockSnippet>
            <p>
                You are most likely trying to create an answer from a connection object that has
                already established and closed a connection. Connection objects can only be used
                ONCE.
            </p>
            <br />
            <p>❌ No ICE candidates are generated when setting the local description.</p>
            <p>
                You have most likely created an offer from a connection object before adding media
                to the connection. Peer A must always add media to the connection (i.e. data
                channels and/or stream tracks) BEFORE creating an offer and setting the local
                description.
            </p>

            <h3>Wrapping up</h3>
            <p>
                And that is all I can tell about WebRTC! You can have a look at this{' '}
                <Anchor url="https://github.com/capelski/webrtc-example-simple">
                    sample repository
                </Anchor>{' '}
                to find out more about implementation details, but you have everything you need to
                start fiddling with WeRTC. May the luck be with you and happy coding ⌨️
            </p>
        </React.Fragment>
    )
};
