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

const linkCredentialWithGoogle = async (methods: string[], error: AuthAlreadyExistsError) => {
    try {
        console.log(methods);

        const { user } = await firebaseAuth.signInWithPopup(googleAuthProvider);

        if (user) {
            user.linkWithCredential(error.credential);
            toast.success(`Logged in as ${user.email}!`);
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
    onAccept: () => void;
    onReject: () => void;
}

const MergeAccountsAlert: React.FC<MergeAccountAlertProps> = ({ email, provider, onAccept, onReject }) => {
    return (
        <Card>
            <MergeAccountContent>
                <MergeAccountTitle>Merge {provider} account</MergeAccountTitle>
                <MergeAccountBody>
                    You already have an account with email address "{email}" with Google. <br />
                    Would you like to merge your Google and {provider} Credentials for
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

    const acceptRequest = async () => {
        await linkCredentialWithGoogle(methods, error);
        toast.dismiss(toastId);
    };

    const rejectRequest = () => {
        toast.dismiss(toastId);
        toast.error(
            `${provider} Login failed! Please merge ${provider} and Google accounts OR Try to login with Google.`,
            {
                autoClose: false,
            }
        );
    }

    toast(<MergeAccountsAlert
        email={error.email}
        provider={provider}
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
            toast.error(error, { autoClose: false });
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
                toast.error(error.message, { autoClose: false });
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
                toast.error(error.message, { autoClose: false });
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