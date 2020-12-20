import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SEARCH_USERS_QUERY } from '../../../graphql/user/queries';
import { FamilyMember } from '../../../models/family';
import Button from '../../Button';
import { TextFieldInput } from '../../Input';
import LoadingSpinner from '../../LoadingSpinner';
import Modal from '../../Modal';

interface SearchUserModalProps {
    show: boolean;
    closeModal: () => void;
}

interface IFormInput {
    queryText: string;
}

const SearchUserModal: React.FC<SearchUserModalProps> = ({ show, closeModal }) => {
    const { register, handleSubmit, errors: formErrors } = useForm<IFormInput>({
        mode: "all",
    });

    const [searchUsers, searchUsersResult] = useLazyQuery<{ searchUsers: FamilyMember[] }>(SEARCH_USERS_QUERY);

    const onSubmit = (inputs: IFormInput) => {
        try {
            searchUsers({
                variables: {
                    input: {
                        query: inputs.queryText
                    },
                },
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (searchUsersResult.error) {
            toast.error(searchUsersResult.error.message);
            console.log(`Error searching users:`, searchUsersResult.error);
        }
    }, [searchUsersResult.error]);

    return (
        <Modal
            show={show}
            headerComponent={'Create a new Family!'}
            onCancel={closeModal}
            footerComponent={
                <>
                    <Button type="button" inverse onClick={closeModal}>CANCEL</Button>
                </>
            }
        >
            <TextFieldInput
                id="queryText"
                name="queryText"
                label="Search Users"
                type="text"
                ref={register()}
                errorText={formErrors.queryText && formErrors.queryText.message}
                onChange={handleSubmit(onSubmit)}
            />
            {searchUsersResult.loading && <LoadingSpinner />}
            {searchUsersResult.data && JSON.stringify(searchUsersResult.data.searchUsers)}
        </Modal>
    );
};

export default SearchUserModal;
