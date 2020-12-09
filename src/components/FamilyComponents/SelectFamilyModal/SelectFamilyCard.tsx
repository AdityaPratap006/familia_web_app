import { useQuery } from '@apollo/client';
import React from 'react';
import { toast } from 'react-toastify';
import { GET_MEMBERS_OF_A_FAMILY_QUERY } from '../../../graphql/family/queries';
import { IFamily } from '../../../models/family';
import { IMember } from '../../../models/member';
import Avatar from '../../Avatar';
import Button from '../../Button';
import Card from '../../Card';
import LoadingBouncers from '../../LoadingBouncers';
import { SelectFamilyCardContent, SelectFamilyCardFooter, SelectFamilyCardMemberList, SelectFamilyCardStyles, SelectFamilyCardTitle } from './styles';

interface SelectFamilyCardProps {
    family: IFamily;
    onSelect: (family: IFamily) => void;
}

const SelectFamilyCard: React.FC<SelectFamilyCardProps> = ({ family, onSelect }) => {

    const { data, loading, error } = useQuery<{ getMembersOfAFamily: IMember[] }>(GET_MEMBERS_OF_A_FAMILY_QUERY, {
        variables: {
            input: {
                familyId: family._id,
            }
        }
    });


    if (error) {
        toast.error(`Couldn't load family members`);
        console.log('members loading failed: ', error);
    }



    return (
        <Card addcss={SelectFamilyCardStyles}>
            <SelectFamilyCardTitle>{family.name}</SelectFamilyCardTitle>
            <SelectFamilyCardContent>
                <span>Members</span>
                <SelectFamilyCardMemberList>
                    {
                        data?.getMembersOfAFamily.map(member => (
                            <Avatar key={member._id} tiny alt={member.name} src={member.image.url} />
                        ))
                    }
                    {
                        loading && <LoadingBouncers small />
                    }
                </SelectFamilyCardMemberList>
                <SelectFamilyCardFooter>
                    <Button type="button" onClick={() => {
                        onSelect(family);
                    }}>
                        SELECT
                    </Button>
                </SelectFamilyCardFooter>
            </SelectFamilyCardContent>
        </Card>
    );
};

export default SelectFamilyCard;
