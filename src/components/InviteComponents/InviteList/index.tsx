import React from 'react';
import { InvitesGrid } from './style';
import { IInvite } from '../../../models/invite';
import InviteCard from '../InviteCard';


interface InviteListProps {
    invites: IInvite[];
    type: 'sent' | 'received';
};

const InviteList: React.FC<InviteListProps> = ({ invites, type }) => {

    const renderCards = () => {
        return invites.map(invite => (
            <InviteCard
                key={invite._id}
                invite={invite}
                type={type}
            />
        ));
    }

    return (
        <InvitesGrid>
            {renderCards()}
        </InvitesGrid>
    );
};

export default InviteList;
