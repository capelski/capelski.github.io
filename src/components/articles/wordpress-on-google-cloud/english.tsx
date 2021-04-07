import React from 'react';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { BlockSnippet } from '../block-snippet';

export const english: ArticleContent = {
    title: 'Https, email ready WordPress site on Google Cloud Platform',
    description: 'How to run an HTTPS, email ready wordpress site on Google Cloud Platform',
    shareSentence: 'Get your HTTPS, email ready wordpress site running on GCP!',
    introduction: (
        <p>
            Need somewhere to host your WordPress site? Google Cloud Platform makes it specially
            easy, providing pre-configured virtual machines. Your site will be up and running in
            under an hour, using your custom domain, accepting HTTPS traffic and being able to send
            emails from contact forms.
        </p>
    ),
    body: (
        <React.Fragment>
            <p>
                <i>
                    Before reading the article be aware that there are many alternatives when it
                    comes to hosting WordPress pages. Having WordPress in GCP is not the cheapest
                    one by far: around 22€/month for a small instance based on my last invoice. If
                    you don't need a dedicated virtual machine consider using other{' '}
                    <Anchor url="https://wordpress.org/hosting/">hosting solutions</Anchor>. GCP is
                    a good fit if you are already using it as your cloud infrastructure provider.
                </i>
            </p>
            <h3>Creating the WordPress site</h3>
            <p>
                WordPress is written in PHP and runs on{' '}
                <Anchor url="https://www.apache.org/">Apache</Anchor>. You can create a Compute
                Engine instance (i.e. a virtual machine) yourself and manually install those
                dependencies or let Google do it for you. I'm a fan of the latter so let's use the
                GCP Deployment Manager to create our WordPress virtual machine.
            </p>
            <p>
                In order to use the deployment manager you will need to enable it's API if you still
                haven't done so. You can then head to the Marketplace and deploy a solution from
                there. The one we are looking for is the <b>WordPress Multisite</b> by{' '}
                <b>Google Click to Deploy</b>:
            </p>
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                alt="Enabling Google Cloud deployment manager api"
                filename="deployment-manager-api.png"
            />
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                alt="Google Cloud deployment manager"
                filename="deployment-manager.png"
            />
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                alt="Wordpress marketplace solutions"
                filename="wordpress-marketplace-solution.jpg"
            />
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                alt="Wordpress Multisite marketplace solution"
                filename="wordpress-multisite.png"
            />
            <p>
                <i>
                    If Compute Engine hasn't been initialized for the current project, launching the
                    deployment will automatically initialize it. Wait a bit while it does so.
                </i>
            </p>
            <p>
                You will next need to give your deployment a name, provide the email of the
                WordPress site administrator and you are good to go! Make sure you enable the{' '}
                <b>Allow HTTPS traffic from the Internet</b> option if you want your site to be
                accessible over HTTPS. You can also choose the geographical zone where the virtual
                machine will be created and pick the machine type (you can see the{' '}
                <b>estimated monthly rate</b> depending on the selected type).
            </p>
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                alt="Wordpress Multisite configuration"
                filename="wordpress-multisite-config.png"
            />
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                alt="Wordpress Multisite firewall configuration"
                filename="wordpress-multisite-firewall.png"
            />
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                alt="Wordpress Multisite deployment"
                filename="wordpress-multisite-deployment.png"
            />
            <p>
                When the deployment finishes the details on the right panel will be populated and
                you will find a new virtual machine in the Compute Engine page. You can access the
                WordPress site at the external IP address of the virtual machine. If you try to
                access it over HTTPS however, the page will fail to load and you will get a
                connection timed out error.
            </p>
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                alt="Wordpress multisite compute engine instance"
                filename="wordpress-multisite-instance.png"
            />
            <h3>Enabling HTTPS traffic</h3>
            <p>
                In order to enable the HTTPS traffic there are a few additional steps that must be
                covered. To begin with, SSL certificates can't be issued to IP addresses; we need to
                set up a domain name for the site. First we need to make the virtual machine
                external IP address static (otherwise the IP address might eventually change over
                time). Head to <b>VPC Network</b> {'>'} <b>External IP addresses</b> and select
                Static for the corresponding address:
            </p>
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                alt="Google Cloud VPC networks"
                filename="vpc-network.png"
            />
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                alt="Google Cloud external IP addresses"
                filename="static-ip-address.png"
            />
            <p>
                Having an static IP address we can use it to point our domain name to. This needs to
                be done from the domain registrar where you purchased the domain name in. Each
                registrar has a different user interface. Search for the DNS management section and
                create an A record to point to the static IP address. After the changes are
                propagated you should be able to access your site through the domain name over HTTP:
            </p>
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                filename="dns-a-record.png"
                footer="DNS record creation example in DonDominio spanish registrar. Interface will be different for other registrars"
            />
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                alt="Deployed wordpress site"
                filename="wordpress-site.png"
                footer="I'm using carlescapellas.xyz domain temporarily for the tutorial. It won't be accessible later on"
            />
            <p>
                Ok! Let's get the HTTPS running and move on to something else before we lose heart.
                We will do so by generating an SSL certificate with{' '}
                <Anchor url="https://certbot.eff.org/">certbot</Anchor>. There is a great guide on
                how to do it in{' '}
                <Anchor url="https://onepagezen.com/free-ssl-certificates-wordpress-google-cloud-click-to-deploy">
                    OnePageZen
                </Anchor>
                . Here are the summarized steps (check the guide for more details):
            </p>
            <ul>
                <li>Connect to the virtual machine through SSH (from the Compute Engine page)</li>
                <li>
                    Download and install certbot-auto
                    <BlockSnippet>
                        sudo apt-get install certbot python-certbot-apache -t stretch-backports
                    </BlockSnippet>
                </li>
                <li>
                    Generate an SSL certificate
                    <BlockSnippet>sudo certbot --apache</BlockSnippet>
                </li>
                <li>
                    Restart Apache server
                    <BlockSnippet>sudo service apache2 restart</BlockSnippet>
                </li>
                <li>
                    Update WordPress URLs. Log in to the WordPress site using the credentials you
                    will find in the right panel of the deployment manager. Navigate to settings and
                    set both <b>WordPress Address (URL)</b> and <b>Site Address (URL)</b> to the
                    HTTPS version of your domain:
                    <ArticleImage
                        articleId={ArticleId.wordpressOnGoogleCloud}
                        alt="Wordpress multisite deployment credentials"
                        filename="wordpress-deployment-credentials.png"
                    />
                    <ArticleImage
                        articleId={ArticleId.wordpressOnGoogleCloud}
                        alt="Wordpress site urls settings"
                        filename="wordpress-site-urls.png"
                    />
                </li>
            </ul>
            <p>
                Save the changes and celebrate while you access your site over HTTPS 🍾 You are
                almost done with the site configuration. There is one last aspect we need to
                consider before you start playing with the wordpress site customization: emails
                sending.
            </p>
            <h3>Sending emails from WordPress</h3>
            <p>
                WordPress has a variety of plugins to easily create contact forms and send the
                inquiries by email (e.g. <Anchor url="https://wpforms.com/">wpforms</Anchor>
                ). However, most of those plugins rely on sending emails through TCP port 25 which,
                on GCP virtual machines, is always blocked due to the risk of abuse.
            </p>
            <p>
                The easiest way for the emails to make it through the GCP firewall is to use a
                third-party email service provider. There are three different providers available. I
                went with <Anchor url="https://www.mailgun.com/">Mailgun</Anchor> (the free tier
                offers up to 10,000 emails per month) but you can use{' '}
                <Anchor url="https://sendgrid.com/">SendGrid</Anchor> or
                <Anchor url="https://www.mailjet.com/">Mailjet</Anchor> if you like them better.
            </p>
            <p>
                Before start configuring any of those services, we need to create a new rule in the
                firewall to allow outbound traffic. Any port other than 25 would do the trick, but
                we will use 2525 because Mailgun listens on that port. This is done from the{' '}
                <b>VPC Network</b> {'>'} <b>Firewall</b> page and it's described in{' '}
                <Anchor url="https://cloud.google.com/compute/docs/tutorials/sending-mail#email_custom_port">
                    this section
                </Anchor>{' '}
                of the GCP documentation:
            </p>
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                alt="Google Cloud firewall rule creation"
                filename="firewall-rule-creation.png"
            />
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                alt="Google Cloud firewall rule configuration"
                filename="firewall-rule-config.png"
            />
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                alt="Google Cloud firewall rules"
                filename="firewall-email-rule.png"
            />
            <p>
                Next we need to configure the email provider. First head to Mailgun (or the provider
                of your choice), create and account and add a domain in the <b>Sending</b> {'>'}{' '}
                <b>Domains</b> section. As recommended by Mailgun, you should use a subdomain (
                <i>e.g. mg.your-domain.com</i>) as the domain name.
            </p>
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                alt="Mailgun domains dashboard"
                filename="mailgun-domains.png"
            />
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                alt="Mailgun domain creation"
                filename="mailgun-domain-config.png"
            />
            <p>
                Again, you will then need to create some DNS records in your domain registrar.
                Mailgun provides descriptive information on how to do it right after adding the
                domain (you will later find this page in <b>Domain settings</b> {'>'}{' '}
                <b>DNS Records</b>). The only mandatory records are the first two TXT. Don't create
                the MX records if you have already configured email for your domain with a different
                provider. Optionally create the CNAME record if you want to enable tracking
                functionalities.
            </p>
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                alt="Mailgun domain verification steps"
                filename="mailgun-domain-verification.png"
            />
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                filename="dns-txt-record.png"
                footer="TXT DNS record creation example in DonDominio spanish registrar"
            />
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                filename="mailgun-verification-email.png"
                footer="Mailgun successful domain verification email"
            />
            <p>
                Once the domain has been added and verified we will need to get the SMTP credentials
                for later use when configuring the service (not the Mailgun user credentials). You
                can find them in <b>Domain settings</b> {'>'} <b>SMTP credentials</b>. The login is
                likely to be <i>postmaster@mg.your-domain.com</i> and the password can be retrieved
                by resetting it (it will only be displayed once, so store it in a safe location).
            </p>
            <ArticleImage
                articleId={ArticleId.wordpressOnGoogleCloud}
                filename="mailgun-smtp-credentials.png"
                footer="Mailgun SMTP credentials section"
            />
            <p>
                Having your credentials ready there is only one thing left to do: configuring the
                service in the virtual machine 💪 The steps are explained in great detail in the{' '}
                <Anchor url="https://cloud.google.com/compute/docs/tutorials/sending-mail/using-mailgun">
                    GCP official documentation
                </Anchor>
                . It's just a matter of executing the provided commands through an SSH terminal, so
                I won't duplicate the steps here. In the "Generate the SASL password map" step you
                will need to use the SMTP credentials collected above.
            </p>
            <p>
                <b>Important!</b> If you select EU as the Domain zone when adding the domain name in
                Mailgun, replace <i>smtp.mailgun.org</i> with <i>smtp.eu.mailgun.org</i> (steps 7
                and 10.b). Not doing so will lead to <i>535 Authentication failed</i> errors when
                trying to send emails (step 15) and countless hours of frustration while searching
                for a solution to the problem in StackOverflow.
            </p>
            <p>
                And that's pretty much it 🎉 You can now sit back and relax. You have accomplished
                enough for today: creating a WordPress site, accepting HTTPS traffic and enabling
                emails sending. From here on is up to the marketing guys to choose a nice template,
                fill the pages with content and tell all of their friends they are now developing
                websites.
            </p>
        </React.Fragment>
    )
};
