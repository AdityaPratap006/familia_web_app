import React, { createContext, useEffect, useState } from 'react';
import { FetchResult, useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { IFamily } from '../models/family';
import { GET_FAMILIES_OF_USER_QUERY } from '../graphql/family/queries';
import { CREATE_FAMILY_MUTATION } from '../graphql/family/mutations';

interface IFamilyContext {
    families: IFamily[];
    loadingFamilies: boolean;
    currentFamily: IFamily | undefined;
    setCurrentFamilyHandler: (family: IFamily) => void;
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
    setCurrentFamilyHandler: () => null,
    sendCreateFamilyRequest: () => Promise.resolve({}),
});

const FamilyProvider: React.FC = (props) => {
    const familiesOfUser = useQuery<{ getFamiliesOfUser: IFamily[] }>(GET_FAMILIES_OF_USER_QUERY);
    const [currentFamily, setCurrentFamily] = useState<IFamily>();
    const [createFamilyMutation] = useMutation<{ createFamily: IFamily }>(CREATE_FAMILY_MUTATION, {
        refetchQueries: [
            { query: GET_FAMILIES_OF_USER_QUERY },
        ],
        awaitRefetchQueries: true,
    });

    const setCurrentFamilyHandler = (family: IFamily) => {
        setCurrentFamily(family);
        localStorage.setItem('defaultFamilyId', family._id);

    }

    const sendCreateFamilyRequest = async (args: CreateFamilyArgs) => {
        const result = await createFamilyMutation({
            variables: {
                input: args,
            }
        });

        if (result.errors) {
            toast.error(result.errors[0].message);
        }

        if (result.data) {
            setCurrentFamilyHandler(result.data.createFamily);
        }

        return result;
    }

    useEffect(() => {

        if (familiesOfUser.data && familiesOfUser.data.getFamiliesOfUser.length) {
            console.log('families: ', familiesOfUser.data.getFamiliesOfUser);

            const defaultFamilyId = localStorage.getItem('defaultFamilyId');
            const families = familiesOfUser.data.getFamiliesOfUser;

            if (defaultFamilyId) {
                console.log('user has a default family, load it');

                const defaultFamily = families.find(family => family._id === defaultFamilyId);

                if (!defaultFamily) {
                    setCurrentFamilyHandler(families[0]);
                    // localStorage.setItem('defaultFamilyId', families[0]._id);
                } else {
                    if (currentFamily?._id !== defaultFamily._id) {
                        setCurrentFamilyHandler(defaultFamily);
                    } else {
                        console.log('default family already set!!!!');
                    }
                }

            } else {
                console.log('set the first family as default family');
                setCurrentFamilyHandler(families[0]);
            }
        }
    }, [familiesOfUser.data, currentFamily?._id]);

    if (familiesOfUser.error) {
        toast.error(familiesOfUser.error.message);
        console.log("error loading families: ", familiesOfUser.error);
    }

    const families = familiesOfUser.data?.getFamiliesOfUser || []
    return (
        <FamilyContext.Provider value={{
            families: families,
            loadingFamilies: familiesOfUser.loading,
            currentFamily,
            setCurrentFamilyHandler,
            sendCreateFamilyRequest,
        }}>
            {props.children}
        </FamilyContext.Provider>
    );
};

export default FamilyProvider;
