import React, { createContext } from 'react';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { IFamily } from '../models/family';
import { GET_FAMILIES_OF_USER_QUERY } from '../graphql/family/queries';
import AppLoadingScreen from '../screens/AppLoadingScreen';

interface IFamilyContext {
    families: IFamily[];
    loadingFamilies: boolean;
    currentFamily: IFamily | undefined;
    loadingCurrentFamily: boolean;
}

export const FamilyContext = createContext<IFamilyContext>({
    families: [],
    loadingFamilies: false,
    currentFamily: undefined,
    loadingCurrentFamily: false,
});

const FamilyProvider: React.FC = (props) => {
    const familiesOfUser = useQuery<{ getFamiliesOfUser: IFamily[] }>(GET_FAMILIES_OF_USER_QUERY);

    if (familiesOfUser.loading) {
        return (
            <AppLoadingScreen />
        );
    }

    if (familiesOfUser.error) {
        toast.error(familiesOfUser.error.message);
        console.log("error loading families: ", familiesOfUser.error);
    }

    return (
        <FamilyContext.Provider value={{
            families: familiesOfUser.data?.getFamiliesOfUser || [],
            loadingFamilies: familiesOfUser.loading,
            currentFamily: undefined,
            loadingCurrentFamily: true,
        }}>
            {props.children}
        </FamilyContext.Provider>
    );
};

export default FamilyProvider;
