import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Firebase, facebookAuthProvider, firebaseAuth, googleAuthProvider, twitterAuthProvider } from '../../utils/firebase';
import { MergeAccountBody, MergeAccountContent, MergeAccountFooter, MergeAccountTitle } from './style';


interface AuthAlreadyExistsError {
    code: string;
    credential: Firebase.auth.AuthCredential;
    email: string;
    message: string;
}

const accountAlreadyExistsErrorCode = 'auth/account-exists-with-different-credential';

const linkCredentialWithProvider = async (authProvider: Firebase.auth.AuthProvider, error: AuthAlreadyExistsError) => {
    try {
        const { user } = await firebaseAuth.signInWithPopup(authProvider);

        if (user) {
            try {
                await user.linkWithCredential(error.credential);
                toast.success(`Logged in as ${user.email}!`);
            } catch (error) {
                console.log('Could not link accounts, ', error);
                toast.error(`Could not link accounts`);
            }
        }
    } catch (newError) {
        console.log('newError', newError);
        toast.error(newError.message, { autoClose: false });
    }
}

const handleLoginSuccess = async (user: Firebase.User | null) => {
    if (!user) {
        toast.error('User not found!');
        return;
    }

    const idTokenResult = await user.getIdTokenResult();

    console.log({
        token: idTokenResult.token,
        provider: idTokenResult.signInProvider,
        name: user.displayName,
        profilePic: user.photoURL,
        email: user.email,
    });

    toast.success(`Logged in as ${user.email}!`);
}

interface MergeAccountAlertProps {
    email: string;
    provider: string;
    mergeIntoProvider: string;
    onAccept: () => void;
    onReject: () => void;
}

const MergeAccountsAlert: React.FC<MergeAccountAlertProps> = ({ email, provider, mergeIntoProvider, onAccept, onReject }) => {
    return (
        <Card>
            <MergeAccountContent>
                <MergeAccountTitle>Merge {provider} account with {mergeIntoProvider}</MergeAccountTitle>
                <MergeAccountBody>
                    You already have an account with email address "{email}" with {mergeIntoProvider}. <br />
                    Would you like to merge your {mergeIntoProvider} and {provider} credentials for
                    a smooth login experience?
             </MergeAccountBody>
                <MergeAccountFooter>
                    <Button onClick={onAccept} >YES</Button>
                    <Button inverse onClick={onReject}>NO</Button>
                </MergeAccountFooter>
            </MergeAccountContent>
        </Card>
    );
}

const facebookMergeToastId = 'facebook-merge';
const twitterMergeToastId = 'twitter-merge';

const handleAccountAlreadyExistsError = async (error: AuthAlreadyExistsError, toastId: string, provider: string) => {
    const methods = await firebaseAuth.fetchSignInMethodsForEmail(error.email);

    console.log(methods);

    let authProvider: Firebase.auth.AuthProvider;
    if (methods.includes(Firebase.auth.GoogleAuthProvider.PROVIDER_ID)) {
        console.log('merge with google');
        authProvider = googleAuthProvider;
    } else if (methods.includes(Firebase.auth.FacebookAuthProvider.PROVIDER_ID)) {
        console.log(`merge with facebook`);
        authProvider = facebookAuthProvider;
    } else if (methods.includes(Firebase.auth.TwitterAuthProvider.PROVIDER_ID)) {
        console.log(`merge with twitter`);
        authProvider = twitterAuthProvider;
    } else {
        console.log('something went wrong, cannot login!');
        return;
    }

    let mergeIntoProvider = authProvider.providerId.replace('.com', '');
    mergeIntoProvider = mergeIntoProvider.charAt(0).toUpperCase() + mergeIntoProvider.slice(1);

    const acceptRequest = async () => {
        await linkCredentialWithProvider(authProvider, error);
        toast.dismiss(toastId);
    };

    const rejectRequest = () => {
        toast.dismiss(toastId);
        toast.error(`${provider} Login failed! Please merge ${provider} and ${mergeIntoProvider} accounts OR Try to login with ${mergeIntoProvider}.`);
    }


    toast(<MergeAccountsAlert
        email={error.email}
        provider={provider}
        mergeIntoProvider={mergeIntoProvider}
        onAccept={acceptRequest}
        onReject={rejectRequest}
    />, {
        toastId: toastId,
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
    });
}

export const useLogin = () => {
    const [loading, setLoading] = useState(false);

    const loginWithGoogleHandler = async () => {
        setLoading(true);

        try {
            const { user } = await firebaseAuth.signInWithPopup(googleAuthProvider);

            handleLoginSuccess(user);

        } catch (error) {
            console.log(error);
            toast.error(error);
            setLoading(false);
        }
    }

    const loginWithFacebookHandler = async () => {
        setLoading(true);

        try {
            const { user } = await firebaseAuth.signInWithPopup(facebookAuthProvider);

            handleLoginSuccess(user);

        } catch (err) {
            const error = err as AuthAlreadyExistsError;
            console.log(error);

            if (error.code === accountAlreadyExistsErrorCode) {
                await handleAccountAlreadyExistsError(error, facebookMergeToastId, `Facebook`);
            } else {
                toast.error(error.message);
            }

            setLoading(false);
        }
    }

    const loginWithTwitterHandler = async () => {
        setLoading(true);

        try {
            const { user } = await firebaseAuth.signInWithPopup(twitterAuthProvider);

            handleLoginSuccess(user);

        } catch (err) {
            const error = err as AuthAlreadyExistsError;
            console.log(error);

            if (error.code === accountAlreadyExistsErrorCode) {
                await handleAccountAlreadyExistsError(error, twitterMergeToastId, `Twitter`);
            } else {
                toast.error(error.message);
            }

            setLoading(false);
        }
    }

    return {
        loading,
        loginWithGoogleHandler,
        loginWithFacebookHandler,
        loginWithTwitterHandler,
    }
}