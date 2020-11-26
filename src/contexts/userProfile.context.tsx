import React, { createContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../graphql/user/mutations';
import { toast } from 'react-toastify';
import { IUserProfile } from '../models/user';

interface IUserProfileContext {
    profile: IUserProfile | undefined;
}

export const UserProfileContext = createContext<IUserProfileContext>({
    profile: undefined
});

const UserProfileProvider: React.FC = (props) => {
    const [createUser] = useMutation<{ createUser: IUserProfile }>(CREATE_USER_MUTATION);
    const [userProfile, setUserProfile] = useState<IUserProfile>();

    useEffect(() => {
        const sendCreateUserRequest = async () => {
            try {
                const result = await createUser();
                if (result.errors) {
                    toast.error(result.errors[0].message);
                    console.log(result.errors);
                }

                if (result.data) {
                    console.log(result.data.createUser);
                    setUserProfile(result.data.createUser);
                }

            } catch (error) {
                toast.error(error.message, { autoClose: false });
                console.log(error);
            }
        }

        sendCreateUserRequest();
    }, [createUser]);

   
    return (
        <UserProfileContext.Provider value={{
            profile: userProfile,
        }}>
            {props.children}
        </UserProfileContext.Provider>
    );
};

export default UserProfileProvider;
