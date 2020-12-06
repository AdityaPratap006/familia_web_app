import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { FetchResult, useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { IFamily } from '../models/family';
import { GET_FAMILIES_OF_USER_QUERY } from '../graphql/family/queries';
import { UserProfileContext } from './userProfile.context';
import { IUserProfile } from '../models/user';
import { SET_DEFAULT_FAMILY_ID } from '../graphql/user/mutations';
import { CREATE_FAMILY_MUTATION } from '../graphql/family/mutations';

interface IFamilyContext {
    families: IFamily[];
    loadingFamilies: boolean;
    currentFamily: IFamily | undefined;
    setCurrentFamily: React.Dispatch<React.SetStateAction<IFamily | undefined>>;
    sendSetDefaultFamilyRequest: (familyId: string) => Promise<void>;
    sendCreateFamilyRequest: (args: CreateFamilyArgs) => Promise<FetchResult<{
        createFamily: IFamily;
    }, Record<string, any>, Record<string, any>>>;
}

interface CreateFamilyArgs {
    name: string;
    description?: string;
}

export const FamilyContext = createContext<IFamilyContext>({
    families: [],
    loadingFamilies: false,
    currentFamily: undefined,
    setCurrentFamily: () => null,
    sendSetDefaultFamilyRequest: () => Promise.resolve(),
    sendCreateFamilyRequest: () => Promise.resolve({}),
});

const FamilyProvider: React.FC = (props) => {
    const familiesOfUser = useQuery<{ getFamiliesOfUser: IFamily[] }>(GET_FAMILIES_OF_USER_QUERY);
    const { profile: userProfile } = useContext(UserProfileContext);
    const [setDefaultFamilyIdMutation] = useMutation<{ setDefaultFamilyId: IUserProfile }>(SET_DEFAULT_FAMILY_ID);
    const [currentFamily, setCurrentFamily] = useState<IFamily>();
    const [createFamilyMutation] = useMutation<{ createFamily: IFamily }>(CREATE_FAMILY_MUTATION, {
        refetchQueries: [
            { query: GET_FAMILIES_OF_USER_QUERY },
        ],
    });

    const sendSetDefaultFamilyRequest = useCallback(async (familyId: string) => {
        try {
            await setDefaultFamilyIdMutation({
                variables: {
                    input: {
                        familyId: familyId,
                    }
                }
            });

        } catch (error) {
            console.log(error);
        }
    }, [setDefaultFamilyIdMutation]);

    const sendCreateFamilyRequest = async (args: CreateFamilyArgs) => {
        const result = await createFamilyMutation({
            variables: {
                input: args,
            }
        });

        return result;
    }

    useEffect(() => {

        if (userProfile && familiesOfUser.data && familiesOfUser.data.getFamiliesOfUser) {

            if (userProfile.defaultFamilyId) {
                console.log('user has a default family, load it');
                const families = familiesOfUser.data.getFamiliesOfUser;
                const defaultFamily = families.find(family => family._id === userProfile.defaultFamilyId);
                setCurrentFamily(defaultFamily);
            } else {
                console.log('set the first family as default family');
                const families = familiesOfUser.data.getFamiliesOfUser;
                setCurrentFamily(families[0]);
                sendSetDefaultFamilyRequest(families[0]._id);
            }
        }
    }, [userProfile, familiesOfUser.data, sendSetDefaultFamilyRequest]);

    if (familiesOfUser.error) {
        toast.error(familiesOfUser.error.message);
        console.log("error loading families: ", familiesOfUser.error);
    }

    return (
        <FamilyContext.Provider value={{
            families: familiesOfUser.data?.getFamiliesOfUser || [],
            loadingFamilies: familiesOfUser.loading,
            currentFamily,
            setCurrentFamily,
            sendSetDefaultFamilyRequest,
            sendCreateFamilyRequest,
        }}>
            {props.children}
        </FamilyContext.Provider>
    );
};

export default FamilyProvider;
