import React, { createContext, useEffect, useState, useRef } from 'react';
import { QueryLazyOptions, useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../graphql/user/mutations';
import { toast } from 'react-toastify';
import { IUserProfile } from '../models/user';
import { GET_USER_PROFILE_QUERY } from '../graphql/user/queries';

interface IUserProfileContext {
    profile: IUserProfile | undefined;
    fetchUserProfile: (options?: QueryLazyOptions<Record<string, any>> | undefined) => void;

}

export const UserProfileContext = createContext<IUserProfileContext>({
    profile: undefined,
    fetchUserProfile: () => null,
});

const UserProfileProvider: React.FC = (props) => {
    const [createUser] = useMutation<{ createUser: IUserProfile }>(CREATE_USER_MUTATION);
    const [userProfile, setUserProfile] = useState<IUserProfile>();
    const [fetchUserProfile, userProfileResult] = useLazyQuery<{ profile: IUserProfile }>(GET_USER_PROFILE_QUERY, {
        onCompleted: ({ profile }) => {
            setUserProfile(profile);
        }
    });
    const shouldSetUserProfileState = useRef(true);

    useEffect(() => {
        const sendCreateUserRequest = async () => {

            try {
                const result = await createUser();
                if (result.errors) {
                    toast.error(result.errors[0].message);
                    // console.log(result.errors);
                }

                if (result.data) {
                    // console.log(result.data.createUser);
                    if (shouldSetUserProfileState.current) {
                        setUserProfile(result.data.createUser);
                    }
                }

            } catch (error) {
                toast.error(error.message, { autoClose: false });
                // console.log(error);
            }
        }

        sendCreateUserRequest();

        return function cleanup() {
            shouldSetUserProfileState.current = false;
        };
    }, [createUser]);

    // useEffect(() => {
    //     if (userProfileResult.data) {
    //         console.log(`refetched user profile: `, userProfileResult.data.profile);
    //     }
    // }, [userProfileResult.data]);

    return (
        <UserProfileContext.Provider value={{
            profile: userProfileResult.data?.profile || userProfile,
            fetchUserProfile,
        }}>
            {props.children}
        </UserProfileContext.Provider>
    );
};

export default UserProfileProvider;
