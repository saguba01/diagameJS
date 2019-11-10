module.exports = {
    firebase: {
        // firebase.auth.Error
        auth: {
            "auth/app-deleted": "The instance of FirebaseApp has been deleted.",
            "auth/app-not-authorized": "The app identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
            "auth/argument-error": "A method is called with incorrect arguments.",
            "auth/invalid-api-key": "The provided API key is invalid. Please check that you have copied it correctly from the Firebase Console.",
            "auth/invalid-user-token": "The user's credential is no longer valid. The user must sign in again.",
            "auth/network-request-failed": "A network error (such as timeout, interrupted connection or unreachable host) has occurred.",
            "auth/operation-not-allowed": "You have not enabled the provider in the Firebase Console. Go to the Firebase Console for your project, in the Auth section and the Sign in Method tab and configure the provider.",
            "auth/requires-recent-login": "The user's last sign-in time does not meet the security threshold. Use firebase.User#reauthenticateWithCredential to resolve. This does not apply if the user is anonymous.",
            "auth/too-many-requests": "Requests are blocked from a device due to unusual activity. Trying again after some delay would unblock.",
            "auth/unauthorized-domain": "The app domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
            "auth/user-disabled": "The user account has been disabled by an administrator. Accounts can be enabled or disabled in the Firebase Console, the Auth section and Users subsection.",
            "auth/user-token-expired": "The user's credential has expired. This could also be a user has been deleted. Prompting the user to sign in again should resolve this for either case.",
            "auth/web-storage-unsupported": "The browser does not support web storage or if the user disables them.",
            "auth/wrong-password": "The password is invalid or the user does not have a password.",
            "auth/user-not-found": "There is no user record corresponding to this identifier. The user may have been deleted.",
            "auth/email-already-in-use": "Already exists an account with the given email address.",
            "auth/invalid-email": "The email address is not valid.",
            "auth/weak-password": "The password is not strong enough.",
            "auth/account-exists-with-different-credential": "Already exists an account with the email address asserted by the credential.",
            "auth/auth-domain-config-required": "AuthDomain configuration is not provided. Check Firebase Console for instructions.",
            "auth/cancelled-popup-request": "Successive popup operations are triggered. Only one popup request is allowed at one time. All the popups would fail with this error except for the last one.",
            "auth/operation-not-supported-in-this-environment": "This operation is not supported in the environment your application is running on. location.protocol must be http or https.",
            "auth/popup-blocked": "The popup was blocked by the browser.",
        }
    },
    firebaseAdmin: {
        // firebaseAdmin.auth.Error
        auth: {
            "auth/claims-too-large": "The claims payload provided to setCustomUserClaims() exceeds the maximum allowed size of 1000 bytes.",
            "auth/id-token-expired": "The provided Firebase ID token is expired.",
            "auth/id-token-revoked": "The Firebase ID token has been revoked.",
            "auth/invalid-argument": "An invalid argument was provided to an Authentication method. The error message should contain additional information.",
            "auth/invalid-claims": "The custom claim attributes provided to setCustomUserClaims() are invalid.",
            "auth/invalid-continue-uri": "The continue URL must be a valid URL string.",
            "auth/invalid-creation-time": "The creation time must be a valid UTC date string.",
            "auth/invalid-disabled-field": "The provided value for the disabled user property is invalid. It must be a boolean.",
            "auth/invalid-display-name": "The provided value for the displayName user property is invalid. It must be a non-empty string.",
            "auth/invalid-dynamic-link-domain": "The provided dynamic link domain is not configured or authorized for the current project.",
            "auth/invalid-email-verified": "The provided value for the emailVerified user property is invalid. It must be a boolean.",
            "auth/invalid-email": "The provided value for the email user property is invalid. It must be a string email address.",
            "auth/invalid-hash-algorithm": "The hash algorithm must match one of the strings in the list of supported algorithms.",
            "auth/invalid-hash-block-size": "The hash block size must be a valid number.",
            "auth/invalid-hash-derived-key-length": "The hash derived key length must be a valid number.",
            "auth/invalid-hash-key": "The hash key must a valid byte buffer.",
            "auth/invalid-hash-memory-cost": "The hash memory cost must be a valid number.",
            "auth/invalid-hash-parallelization": "The hash parallelization must be a valid number.",
            "auth/invalid-hash-rounds": "The hash rounds must be a valid number.",
            "auth/invalid-hash-salt-separator": "The hashing algorithm salt separator field must be a valid byte buffer.",
            "auth/invalid-id-token": "The provided ID token is not a valid Firebase ID token.",
            "auth/invalid-last-sign-in-time": "The last sign-in time must be a valid UTC date string.",
            "auth/invalid-page-token": "The provided next page token in listUsers() is invalid. It must be a valid non-empty string.",
            "auth/invalid-password": "The provided value for the password user property is invalid. It must be a string with at least six characters.",
            "auth/invalid-password-hash": "The password hash must be a valid byte buffer.",
            "auth/invalid-password-salt": "The password salt must be a valid byte buffer",
            "auth/invalid-phone-number": "The provided value for the phoneNumber is invalid. It must be a non-empty E.164 standard compliant identifier string.",
            "auth/invalid-photo-url": "The provided value for the photoURL user property is invalid. It must be a string URL.",
            "auth/invalid-provider-data": "The providerData must be a valid array of UserInfo objects.",
            "auth/invalid-provider-id": "The providerId must be a valid supported provider identifier string.",
            "auth/invalid-session-cookie-duration": "The session cookie duration must be a valid number in milliseconds between 5 minutes and 2 weeks.",
            "auth/invalid-uid": "The provided uid must be a non-empty string with at most 128 characters.",
            "auth/invalid-user-import": "The user record to import is invalid.",
            "auth/maximum-user-count-exceeded": "The maximum allowed number of users to import has been exceeded.",
            "auth/missing-android-pkg-name": "An Android Package Name must be provided if the Android App is required to be installed.",
            "auth/missing-continue-uri": "A valid continue URL must be provided in the request.",
            "auth/missing-hash-algorithm": "Importing users with password hashes requires that the hashing algorithm and its parameters be provided.",
            "auth/missing-ios-bundle-id": "The request is missing an iOS Bundle ID.",
            "auth/missing-uid": "A uid identifier is required for the current operation.",
            "auth/reserved-claims": "One or more custom user claims provided to setCustomUserClaims() are reserved. For example, OIDC specific claims such as (sub, iat, iss, exp, aud, auth_time, etc) should not be used as keys for custom claims.",
            "auth/session-cookie-expired": "The provided Firebase session cookie is expired.",
            "auth/session-cookie-revoked": "The Firebase session cookie has been revoked.",
            "auth/uid-already-exists": "The provided uid is already in use by an existing user. Each user must have a unique uid.",
            "auth/unauthorized-continue-uri": "The domain of the continue URL is not whitelisted. Whitelist the domain in the Firebase Console.",
            "auth/email-already-exists": "The provided email is already in use by an existing user. Each user must have a unique email.",
            "auth/user-not-found": "There is no existing user record corresponding to the provided identifier.",
            "auth/operation-not-allowed": "The provided sign-in provider is disabled for your Firebase project. Enable it from the Sign-in Method section of the Firebase console.",
            "auth/invalid-credential": "The credential used to authenticate the Admin SDKs cannot be used to perform the desired action. Certain Authentication methods such as createCustomToken() and verifyIdToken() require the SDK to be initialized with a certificate credential as opposed to a refresh token or Application Default credential. See Initialize the SDK for documentation on how to authenticate the Admin SDKs with a certificate credential.",
            "auth/phone-number-already-exists": "The provided phoneNumber is already in use by an existing user. Each user must have a unique phoneNumber.",
            "auth/project-not-found": "No Firebase project was found for the credential used to initialize the Admin SDKs. See Add Firebase to your app for documentation on how to generate a credential for your project and use it to authenticate the Admin SDKs.",
            "auth/insufficient-permission": "The credential used to initialize the Admin SDK has insufficient permission to access the requested Authentication resource. See Add Firebase to your app for documentation on how to generate a credential with appropriate permissions and use it to authenticate the Admin SDKs.",
            "auth/internal-error": "The Authentication server encountered an unexpected error while trying to process the request. The error message should contain the response from the Authentication server containing additional information. If the error persists, please report the problem to our Bug Report support channel.",
        }
    },
    game: {
        notarget: 'Don\'t have anything to play!',
        nostart: 'Don\'t have start point!',
        noend: 'Don\'t have end point!',
        nobetween: 'Don\'t have anything between start point and end point!',
        noplay: 'Not play anything after end point!',
        wrong: 'Wrong answer!'
    }
};