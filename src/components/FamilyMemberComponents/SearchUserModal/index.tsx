import React, { useContext, useEffect } from 'react';
import _ from 'lodash';
import { useLazyQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SEARCH_USERS_QUERY } from '../../../graphql/user/queries';
import { FamilyMember } from '../../../models/family';
import Button from '../../Button';
import { TextFieldInput } from '../../Input';
import LoadingSpinner from '../../LoadingSpinner';
import Modal from '../../Modal';
import { FamilyContext } from '../../../contexts/family.context';
import MemberCard from '../MemberCard';
import { NoResultText, SearchResultsGrid } from './style';

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
    const { currentFamily } = useContext(FamilyContext);

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

    const handleSubmitDebounced = _.debounce(handleSubmit(onSubmit), 500, { maxWait: 0 });

    useEffect(() => {
        if (searchUsersResult.error) {
            toast.error(searchUsersResult.error.message);
            console.log(`Error searching users:`, searchUsersResult.error);
        }
    }, [searchUsersResult.error]);

    if (!currentFamily) {
        return (
            <Modal
                headerComponent={'Please wait...'}
                show={show}
                onCancel={closeModal}
            >
                <LoadingSpinner large />
            </Modal>
        );
    }

    const renderUsersList = (): React.ReactNode => {
        const { data } = searchUsersResult;

        if (data) {
            const { searchUsers: usersList } = data;

            return usersList.map(user => (
                <MemberCard key={user._id} user={user} />
            ));
        }

        return null;
    }

    return (
        <Modal
            show={show}
            headerComponent={`Invite people you know to '${currentFamily.name}'!`}
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
                placeholder={"e.g: Aditya"}
                type="text"
                ref={register()}
                errorText={formErrors.queryText && formErrors.queryText.message}
                onChange={handleSubmitDebounced}
            />
            {searchUsersResult.loading && <LoadingSpinner />}
            {!searchUsersResult.loading && !searchUsersResult.data && (
                <NoResultText>
                    No results
                </NoResultText>
            )}
            {!searchUsersResult.loading && searchUsersResult.data && searchUsersResult.data.searchUsers.length === 0 && (
                <NoResultText>
                    No results
                </NoResultText>
            )}
            {searchUsersResult.data && searchUsersResult.data.searchUsers.length > 0 && (
                <SearchResultsGrid>
                    {renderUsersList()}
                </SearchResultsGrid>
            )}
        </Modal>
    );
};

export default SearchUserModal;
