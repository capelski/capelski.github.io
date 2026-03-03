import React from 'react';
import { Anchor } from '../anchor';
import { ArticleContent } from '../article-data';
import { ArticleId } from '../article-id';
import { ArticleImage } from '../article-image';
import { BlockSnippet } from '../block-snippet';
import { InlineSnippet } from '../inline-snippet';

export const english: ArticleContent = {
    title: 'Storing secrets securely in Git repositories',
    description:
        'How to store and manage sensitive information in Git repositories using git secrets',
    shareSentence:
        'Search no more! Your Git repository is the perfect place to securely store your secrets',
    introduction: (
        <p>
            Applications often need to use sensitive information such as API keys, authentication
            tokens, passwords, etc. This information needs to be available to all team members and
            it should be stored securely, without being exposed in the codebase. Git-secret is a
            tool that allows you to store and manage secrets in your Git repository and this is all
            you need to know.
        </p>
    ),
    body: (
        <React.Fragment>
            <ArticleImage
                articleId={ArticleId.gitSecrets}
                alt="Abstract representation of secure storage"
                className="image-600"
                filename="secure-storage.jpg"
            />
            <p>
                When using Git-secret, the secret values are encrypted in binary files and committed
                to the repository. Those files can then be decrypted by authorized users in their
                workspaces, generating plain files that contain the original values at the moment of
                encryption. Such plain files need to be excluded from the repository, of course, as
                the secrets would become exposed to anyone with access to the repository otherwise.
            </p>
            <h3>Workspace Setup</h3>
            <p>
                To use Git-secret we only need to install it. Checkout the{' '}
                <a href="https://sobolevn.me/git-secret/installation">installation steps</a> on the
                official website (in MacOS, it is available via brew;{' '}
                <InlineSnippet>brew install git-secret</InlineSnippet>). Git-secret uses gpg to
                encrypt the secrets, so we will also need to generate a gpg key for our user if we
                do not have one already. To generate a gpg key run the following command and provide
                the generated data (you can go with the default values).
            </p>
            <BlockSnippet>
                % gpg --full-generate-key
                <br />
                gpg (GnuPG) 2.4.7; Copyright (C) 2024 g10 Code GmbH
                <br />
                This is free software: you are free to change and redistribute it.
                <br />
                There is NO WARRANTY, to the extent permitted by law.
                <br />
                <br />
                Please select what kind of key you want:
                <br />
                &emsp;&emsp;(1) RSA and RSA
                <br />
                &emsp;&emsp;(2) DSA and Elgamal
                <br />
                &emsp;&emsp;(3) DSA (sign only)
                <br />
                &emsp;&emsp;(4) RSA (sign only)
                <br />
                &emsp;&emsp;(9) ECC (sign and encrypt) *default*
                <br />
                &emsp;&emsp;(10) ECC (sign only)
                <br />
                &emsp;&emsp;(14) Existing key from card
                <br />
                Your selection? 1<br />
                RSA keys may be between 1024 and 4096 bits long.
                <br />
                What keysize do you want? (3072) <br />
                Requested keysize is 3072 bits
                <br />
                Please specify how long the key should be valid.
                <br />
                &emsp;&emsp;0 = key does not expire
                <br />
                &emsp;&emsp;{'<'}n{'>'} = key expires in n days
                <br />
                &emsp;&emsp;{'<'}n{'>'}w = key expires in n weeks
                <br />
                &emsp;&emsp;{'<'}n{'>'}m = key expires in n months
                <br />
                &emsp;&emsp;{'<'}n{'>'}y = key expires in n years
                <br />
                Key is valid for? (0) <br />
                Key does not expire at all
                <br />
                Is this correct? (y/N) y<br />
                <br />
                GnuPG needs to construct a user ID to identify your key.
                <br />
                <br />
                Real name: John Doe
                <br />
                Email address: you@domain.com
                <br />
                Comment: <br />
                You selected this USER-ID:
                <br />
                &emsp;&emsp;"John Doe {'<'}you@domain.com{'>'}"<br />
                <br />
                Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O<br />
                <br />
                gpg: directory '~/.gnupg/openpgp-revocs.d' created
                <br />
                gpg: revocation certificate stored as
                '~/.gnupg/openpgp-revocs.d/4116DE187877609C0F970F8235933C63304A6266.rev'
                <br />
                public and secret key created and signed.
                <br />
                <br />
                pub&emsp;&emsp;rsa3072 2026-02-23 [SC]
                <br />
                &emsp;&emsp;4116DE187877609C0F970F8235933C63304A6266
                <br />
                uid&emsp;&emsp;John Doe {'<'}you@domain.com{'>'}
                <br />
                sub&emsp;&emsp;rsa3072 2026-02-23 [E]
                <br />
            </BlockSnippet>
            <h3>Repository setup</h3>
            <p>
                Once <InlineSnippet>git-secret</InlineSnippet> is installed you initialize the
                secrets in your repository by running <InlineSnippet>git secret init</InlineSnippet>
                . This command generates an empty <InlineSnippet>mapping.cfg</InlineSnippet> file
                under <InlineSnippet>.gitsecret/paths</InlineSnippet>, and adds an exclusion pattern
                for secrets to the <InlineSnippet>.gitignore</InlineSnippet> file.
            </p>
            <BlockSnippet>
                % git secret init
                <br />
                &emsp;&emsp;git-secret: init created: '.gitsecret/'
            </BlockSnippet>
            <ArticleImage
                articleId={ArticleId.gitSecrets}
                className="image-600"
                filename="repo-initialization.png"
                footer="Workspace changes after initializing git-secret"
            />
            <p>
                Next you need to add yourself to the list of authorized users for the repository.
                You do so by running <InlineSnippet>git secret tell you@domain.com</InlineSnippet>.
                Note the email address must match the one in your gpg key. The command will generate
                a <InlineSnippet>pubring.kbx</InlineSnippet> file, along with a couple others. This
                file is used by GnuPG to store public keys, along with meta-information and indices
                (see{' '}
                <Anchor url="https://www.gnupg.org/documentation/manuals/gnupg/kbxutil.html#:~:text=kbxutil%20(Using%20the%20GNU%20Privacy,go%20wrong)%2C%20run%20it%20using">
                    this link
                </Anchor>{' '}
                for more details).
            </p>
            <BlockSnippet>
                % git secret tell you@domain.com
                <br />
                &emsp;&emsp;gpg: keybox '.gitsecret/keys/pubring.kbx' created
                <br />
                &emsp;&emsp;gpg: .gitsecret/keys/trustdb.gpg: trustdb created
                <br />
                &emsp;&emsp;git-secret: done. you@domain.com added as user(s) who know the secret.
            </BlockSnippet>
            <ArticleImage
                articleId={ArticleId.gitSecrets}
                className="image-600"
                filename="first-user-added.png"
                footer="Workspace changes after adding the first user"
            />
            <p>
                According to the{' '}
                <Anchor url="https://sobolevn.me/git-secret/">official docs</Anchor>: "Generally
                speaking, all the files in this directory except random_seed should be checked into
                your repo". You can therefore go ahead and commit the generated files to the
                repository. We are now ready to start adding secrets and users to the repository.
            </p>
            <h3>Managing secrets</h3>
            <p>
                <b>Adding a secret</b>. To add a secret to the repository we will create a plain
                file, paste the secret value in it and run{' '}
                <InlineSnippet>git secret add path/file</InlineSnippet>. The add command instructs
                git-secret to track the plain file by adding it to{' '}
                <InlineSnippet>mapping.cfg</InlineSnippet>. From now on it will be considered when
                hiding/revealing secrets. Note that, at this point, no secret file has been
                generated yet.
            </p>
            <BlockSnippet>
                % mkdir secrets-directory
                <br />% echo "secret-value" {'>'} secrets-directory/secret-file
                <br />
                % git secret add secrets-directory/secret-file
                <br />
                &emsp;&emsp;git-secret: file not in .gitignore, adding:
                secrets-directory/secret-file
                <br />
                &emsp;&emsp;git-secret: 1 item(s) added.
                <br />
            </BlockSnippet>
            <ArticleImage
                articleId={ArticleId.gitSecrets}
                className="image-600"
                filename="secret-added.png"
                footer="Workspace changes after adding a secret"
            />
            <p>
                Once the plain file is being tracked we can generate the corresponding secret file
                by running <InlineSnippet>git secret hide</InlineSnippet>. This will generate a
                binary secret file, encrypted with the gpg keys of the authorized users, and add a
                hash for the secret to the <InlineSnippet>mapping.cfg</InlineSnippet> file. We will
                commit all changes to the repository.
            </p>
            <ArticleImage
                articleId={ArticleId.gitSecrets}
                className="image-600"
                filename="secret-hidden.png"
                footer="Workspace changes after hiding a secret"
            />
            <ul>
                <li>
                    By default, ALL the secret files are regenerated every time you run hide. As
                    explained in the{' '}
                    <Anchor url="https://sobolevn.me/git-secret/git-secret-hide">
                        official docs
                    </Anchor>
                    , this is done on purpose because the set of authorized gpg keys might have
                    changed since the last time the files were encrypted. If you know what you are
                    doing and wish to skip any secret files that have not be been modified since the
                    last time they were encrypted, use the <InlineSnippet>-m</InlineSnippet>{' '}
                    argument.
                </li>
                <li>
                    The hash of the secret in <InlineSnippet>mapping.cfg</InlineSnippet>
                    will only change if the secret value changes.
                </li>
                <li>
                    <p>
                        The add command detects the plain file is not excluded from the repository
                        and it adds an exclusion pattern to the{' '}
                        <InlineSnippet>.gitignore</InlineSnippet> folder. You can either go with
                        this approach or tweak the .gitignore file to exclude all secrets with a
                        single pattern (e.g. see the screenshot below).
                    </p>
                    <ArticleImage
                        articleId={ArticleId.gitSecrets}
                        className="image-600"
                        filename="gitignore-exclusion-patterns.png"
                        footer="Workspace changes after changing .gitignore exclusion patterns"
                    />
                </li>
            </ul>
            <p>
                <b>Removing a secret</b>. To remove a secret from the repository we will simply run{' '}
                <InlineSnippet>git secret remove path/file</InlineSnippet>. Note that, by default,
                this will only instruct git-secret to stop tracking the plain file. The secret file
                will remain in the file system however. Make sure to remove it manually (or instruct
                git-secret to remove the secret file by using the <InlineSnippet>-c</InlineSnippet>{' '}
                argument) and commit the changes to the repository.
            </p>
            <BlockSnippet>
                % git secret remove secrets-directory/secret-file
                <br />
                &emsp;&emsp;git-secret: removed from index.
                <br />
                &emsp;&emsp;git-secret: ensure that files: [secrets-directory/secret-file] are now
                not ignored.
                <br />% rm secrets-directory/secret-file.secret
            </BlockSnippet>
            <ArticleImage
                articleId={ArticleId.gitSecrets}
                className="image-600"
                filename="secret-removed.png"
                footer="Workspace changes after removing a secret"
            />
            <ul>
                <li>
                    Unlike <InlineSnippet>add</InlineSnippet>, which automatically add pathnames to
                    .gitignore, <InlineSnippet>remove</InlineSnippet> does not delete pathnames from{' '}
                    .gitignore. Make sure to remove the corresponding exclusion pattern yourself (or
                    use a single exclusion pattern for all secrets as suggested above).
                </li>
            </ul>
            <p>
                <b>Updating a secret</b>. To update a secret value (for example, when rotating an
                API key) we only need to update the corresponding plain file with the new value and
                re-encrypt it by running <InlineSnippet>git secret hide</InlineSnippet> again. This
                will generate a new secret file and update the hash in the mapping file. Commit all
                changes to the repository as per usual.
            </p>
            <BlockSnippet>
                % echo "modified-value" {'>'} secrets-directory/secret-file
                <br />
                % git secret hide
                <br />
                &emsp;&emsp;git-secret: done. 1 of 1 files are hidden.
            </BlockSnippet>
            <ArticleImage
                articleId={ArticleId.gitSecrets}
                footer="Workspace changes after updating a secret"
                className="image-600"
                filename="secret-updated.png"
            />
            <h3>Managing users</h3>
            <p>
                <b>Adding a user</b>. To allow a user to manage the secrets in the repository we
                need to add them to the list of authorized users, just like we did before with our
                own user: <InlineSnippet>git secret tell them@domain.com</InlineSnippet>. This can
                only be done by users that have already been added to the repository and who have
                the gpg key of the user they want to add in their keyring.
            </p>
            <p>
                <i>
                    Adding a user means registering their GPG key in the{' '}
                    <InlineSnippet>pubring.kbx</InlineSnippet> file of the repository and, for that,
                    we need to have their key in our keyring. If the key is not in our keyring, we
                    will get an error when trying to add the user.
                </i>
            </p>
            <BlockSnippet>
                % git secret tell them@domain.com
                <br />
                &emsp;&emsp;git-secret: abort: no key found in gpg user keyring for: them@domain.com
            </BlockSnippet>
            <p>
                The user will therefore need to export their GPG key and share it with us. If they
                don't have a gpg key, they will have to create it in the same way we did earlier.
                They will export their key using the following command and the resulting file will
                look something like the one below.
            </p>
            <BlockSnippet>% gpg --export -a them@domain.com {'>'} them.pubkey</BlockSnippet>
            <BlockSnippet>
                -----BEGIN PGP PUBLIC KEY BLOCK-----
                <br />
                <br />
                mQGNBGmcwOEBDADnd2E4V7EPV/6pdLFr/mxLyGvn87viRHpkSYCusfJRBlaHNiIs
                <br />
                ulpM1eSe9ygwxMMRM1Vqfvv3hb/NBU2FLP3lQxnXMTuCZWCcRBeyKNhvs2wtgsMa
                <br />
                ...
                <br />
                +L0WGOhCSdeOBRFchrLoYpPao8+6MRo77ACmEEYBI45Dmn0pXUeYEvhYsPeDVY6q
                <br />
                mTFhPbl6S+g4v/0Gsg==
                <br />
                =ykVJ
                <br />
                -----END PGP PUBLIC KEY BLOCK-----
            </BlockSnippet>
            <p>
                Once the user shares the exported key with us (the{' '}
                <InlineSnippet>.pubkey</InlineSnippet> file), we can import it to our keyring using
                the following command.
            </p>
            <BlockSnippet>
                % gpg --import them.pubkey
                <br />
                &emsp;&emsp;gpg: key 35933C63304A6266: public key "Jena Doe {'<'}them@domain.com
                {'>'}" imported
                <br />
                &emsp;&emsp;gpg: Total number processed: 1<br />
                &emsp;&emsp;gpg: imported: 1
            </BlockSnippet>
            <p>
                Having the user's GPG key imported we can now add them to the list of authorized
                users in the repository. This will modify the{' '}
                <InlineSnippet>pubring.kbx</InlineSnippet> file and it will clear the hashes of all
                secrets in the <InlineSnippet>mapping.cfg</InlineSnippet> file. You can confirm the
                user was added correctly by listing the authorized users with{' '}
                <InlineSnippet>git secret whoknows</InlineSnippet>.
            </p>
            <BlockSnippet>
                % git secret tell them@domain.com
                <br />
                &emsp;&emsp;git-secret: done. them@domain.com added as user(s) who know the secret.
                <br />
                % git secret whoknows
                <br />
                &emsp;&emsp;them@domain.com
                <br />
                &emsp;&emsp;you@domain.com
            </BlockSnippet>
            <ArticleImage
                articleId={ArticleId.gitSecrets}
                className="image-600"
                filename="user-added.png"
                footer="Workspace changes after adding a user"
            />
            <p>
                Note that the newly added user will not have access to the secrets that were
                encrypted before they were added to the repository. To give them access to the
                existing secrets, we must re-encrypt all secrets in the repository by running{' '}
                <InlineSnippet>git secret hide</InlineSnippet> again. As per usual, commit all
                changes to the repository afterwards.
            </p>
            <p>
                Once users have been added, they can pull the latest changes from the repository and
                reveal the secrets by running <InlineSnippet>git secret reveal</InlineSnippet>.
            </p>
            <p>
                <b>Removing a user</b>. To remove a user from the list of authorized users we will
                run <InlineSnippet>git secret removeperson them@domain.com</InlineSnippet>. This
                will modify the <InlineSnippet>pubring.kbx</InlineSnippet> file, removing the GPG
                key of the user. You can confirm the user has been removed correctly by listing the
                authorized users (i.e. <InlineSnippet>git secret whoknows</InlineSnippet>).
            </p>
            <BlockSnippet>
                % git secret removeperson them@domain.com
                <br />
                &emsp;&emsp;git-secret: removed keys.
                <br />
                &emsp;&emsp;git-secret: now [them@domain.com] do not have an access to the
                repository.
                <br />
                &emsp;&emsp;git-secret: make sure to hide the existing secrets again.
                <br />
                % git secret whoknows
                <br />
                &emsp;&emsp;you@domain.com
                <br />
                % git secret hide
                <br />
                &emsp;&emsp; git-secret: done. 1 of 1 files are hidden.
            </BlockSnippet>
            <p>
                Note that, at this point, the encrypted files have not been modified. If the files
                had been encrypted while the user's key was still present, the user can still reveal
                the secrets with their GPG key. To fully remove their access, you must re-encrypt
                the files after having removed the user by running{' '}
                <InlineSnippet>git secret hide</InlineSnippet> again. It would be a good idea to
                rotate the secret values as well before re-encrypting the files.
            </p>

            <ArticleImage
                articleId={ArticleId.gitSecrets}
                className="image-600"
                filename="user-removed.png"
                footer="Workspace changes after removing a user"
            />
            <h3>Wrapping up</h3>
            <p>
                Secret values are a common requirement of modern web development and they need to be
                stored securely, somewhere where all the team members who need to can access them.
                If you and your team are already using Git for version control then git-secret is a
                great fit. It will help you manage secrets and authorized users effectively,
                introducing very little overhead, and it will save you from having to store secrets
                in a different platform or service.
            </p>
        </React.Fragment>
    )
};
