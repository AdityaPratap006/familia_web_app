import React from 'react';
import { IInvite } from '../../../models/invite';
import Avatar from '../../Avatar';
import Card from '../../Card';
import { InviteCardHeader } from './style';

interface InviteCardProps {
    invite: IInvite;
    type: 'sent' | 'received';
}

const InviteCard: React.FC<InviteCardProps> = ({ type, invite }) => {

    let titleText = '';
    let avatarImgSrc = '';
    if (type === 'received') {
        titleText = `${invite.from.name} invited you to join`;
        avatarImgSrc = invite.from.image.url;
    } else if (type === 'sent') {
        titleText = `You invited ${invite.to.name} to join`;
        avatarImgSrc = invite.to.image.url;
    }

    return (
        <Card>
            <InviteCardHeader>
                <Avatar
                    alt="user"
                    src={avatarImgSrc}
                />
                <p>
                    {titleText}
                </p>
            </InviteCardHeader>
        </Card>
    );
};

export default InviteCard;
