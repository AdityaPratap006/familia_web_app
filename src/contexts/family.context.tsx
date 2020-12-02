import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { IFamily } from '../models/family';
import { GET_FAMILIES_OF_USER_QUERY } from '../graphql/family/queries';
import { UserProfileContext } from './userProfile.context';
import { IUserProfile } from '../models/user';
import { SET_DEFAULT_FAMILY_ID } from '../graphql/user/mutations';

interface IFamilyContext {
    families: IFamily[];
    loadingFamilies: boolean;
    currentFamily: IFamily | undefined;
    setCurrentFamily:  React.Dispatch<React.SetStateAction<IFamily | undefined>>;
    sendSetDefaultFamilyRequest: (familyId: string) => void;
}

export const FamilyContext = createContext<IFamilyContext>({
    families: [],
    loadingFamilies: false,
    currentFamily: undefined,
    setCurrentFamily: () => null,
    sendSetDefaultFamilyRequest: () => null,
});

const FamilyProvider: React.FC = (props) => {
    const familiesOfUser = useQuery<{ getFamiliesOfUser: IFamily[] }>(GET_FAMILIES_OF_USER_QUERY);
    const { profile: userProfile } = useContext(UserProfileContext);
    const [setDefaultFamilyIdMutation] = useMutation<{ setDefaultFamilyId: IUserProfile }>(SET_DEFAULT_FAMILY_ID);
    const [currentFamily, setCurrentFamily] = useState<IFamily>();

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

    useEffect(() => {

        if (userProfile && familiesOfUser.data) {

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
            currentFamily: currentFamily,
            setCurrentFamily: setCurrentFamily,
            sendSetDefaultFamilyRequest: sendSetDefaultFamilyRequest,
        }}>
            {props.children}
        </FamilyContext.Provider>
    );
};

export default FamilyProvider;
