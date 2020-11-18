import { useState } from 'react';
import { toast } from 'react-toastify';
import { firebaseAuth, googleAuthProvider } from '../../utils/firebase';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);

    const loginWithGoogleHandler = async () => {
        setLoading(true);

        try {
            const { user } = await firebaseAuth.signInWithPopup(googleAuthProvider);

            if (user) {
                const idTokenResult = await user.getIdTokenResult();

                console.log({
                    token: idTokenResult.token,
                    provider: idTokenResult.signInProvider,
                    name: user.displayName,
                    profilePic: user.photoURL,
                    email: user.email,
                });

                toast.success('logged in!', { autoClose: false });
            } else {
                console.log('user not found!');
            }

        } catch (error) {
            console.log(error);
            toast.error(error, { autoClose: false });
            setLoading(false);
        }
    }

    return {
        loading,
        loginWithGoogleHandler,
    }
}