import React from 'react';
import { IFamily } from '../../../models/family';
import Avatar from '../../Avatar';
import Card from '../../Card';
import { SelectFamilyCardContent, SelectFamilyCardMemberList, SelectFamilyCardStyles, SelectFamilyCardTitle } from './styles';

interface SelectFamilyCardProps {
    family: IFamily;
}

const SelectFamilyCard: React.FC<SelectFamilyCardProps> = ({ family }) => {
    return (
        <Card addcss={SelectFamilyCardStyles}>
            <SelectFamilyCardTitle>{family.name}</SelectFamilyCardTitle>
            <SelectFamilyCardContent>
                <span>Members</span>
                <SelectFamilyCardMemberList>
                    <Avatar tiny alt="aditya" src={'https://lh3.googleusercontent.com/a-/AOh14Gh9I0rXtKvNGdIfneUju1ib6MSDxpZZnmyX0srPvw=s96-c'} />
                </SelectFamilyCardMemberList>
            </SelectFamilyCardContent>
        </Card>
    );
};

export default SelectFamilyCard;
