import { useLazyQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FamilyContext } from '../../../contexts/family.context';
import { GET_MEMBERS_OF_A_FAMILY_QUERY } from '../../../graphql/family/queries';
import { FamilyMember } from '../../../models/family';
import LoadingBouncers from '../../LoadingBouncers';
import AddMemberCard from '../AddMemberCard';
import MemberCard from '../MemberCard';
import { MembersGrid } from './style';

const MemoriesMemberGrid: React.FC = () => {
    const { currentFamily } = useContext(FamilyContext);
    const [fetchMembers, { data, error, called, loading }] = useLazyQuery<{ getMembersOfAFamily: FamilyMember[] }>(GET_MEMBERS_OF_A_FAMILY_QUERY);

    useEffect(() => {
        document.title = `Memories | Familia`;
    }, []);

    useEffect(() => {
        if (currentFamily) {
            fetchMembers({
                variables: {
                    input: { familyId: currentFamily._id },
                },
            });
        }

    }, [currentFamily, fetchMembers]);

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);

    const renderMembersList = (): React.ReactNode => {
        if (!data) {
            return null;
        }

        const members = data.getMembersOfAFamily;

        return members.map(member => (
            <MemberCard key={member._id} user={member} />
        ));
    }

    return (
        <>
            {!called && (
                <LoadingBouncers medium />
            )}
            {called && loading && (
                <LoadingBouncers medium />
            )}
            {data && (
                <MembersGrid>
                    {renderMembersList()}
                    <AddMemberCard />
                </MembersGrid>
            )}
        </>
    );
};

export default MemoriesMemberGrid;
