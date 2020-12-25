import React from 'react';
import { useQuery } from '@apollo/client';
import { IInvite } from '../../../models/invite';
import Avatar from '../../Avatar';
import Card from '../../Card';
import { HighlightedText, InviteCardBody, InviteCardFamilyDescription, InviteCardFamilyMembersList, InviteCardFamilyName, InviteCardFooter, InviteCardHeader, InviteCardHeaderTitle } from './style';
import { IMember } from '../../../models/member';
import { GET_MEMBERS_OF_A_FAMILY_QUERY } from '../../../graphql/family/queries';
import LoadingBouncers from '../../LoadingBouncers';
import Button from '../../Button';

interface InviteCardProps {
    invite: IInvite;
    type: 'sent' | 'received';
}

const InviteCard: React.FC<InviteCardProps> = ({ type, invite }) => {
    const { data, loading } = useQuery<{ getMembersOfAFamily: IMember[] }>(GET_MEMBERS_OF_A_FAMILY_QUERY, {
        variables: {
            input: {
                familyId: invite.family._id,
            }
        }
    });

    const renderFamilyMembers = (): React.ReactNode => {

        if (loading) {
            return <LoadingBouncers small />;
        }

        if (!data) {
            return null;
        }

        const memberList = data.getMembersOfAFamily;

        return (
            <>
                {memberList.slice(0, 3).map(member => (
                    <Avatar
                        key={member._id}
                        tiny
                        alt={member.name}
                        src={member.image.url}
                    />
                ))}
                {memberList.length > 3 && (
                    <span>
                        {`and ${memberList.length - 3} more members`}
                    </span>
                )}
            </>
        )
    }

    let avatarImgSrc = '';
    if (type === 'received') {
        avatarImgSrc = invite.from.image.url;
    } else if (type === 'sent') {
        avatarImgSrc = invite.to.image.url;
    }

    return (
        <Card>
            <InviteCardHeader>
                <Avatar
                    tiny
                    alt="user"
                    src={avatarImgSrc}
                />
                <InviteCardHeaderTitle>
                    {type === 'received' && (
                        <><HighlightedText>{invite.from.name}</HighlightedText> invited you to join</>
                    )}
                    {type === 'sent' && (
                        <>You invited <HighlightedText>{invite.to.name}</HighlightedText> to join</>
                    )}
                </InviteCardHeaderTitle>
            </InviteCardHeader>
            <InviteCardBody>
                <InviteCardFamilyName>
                    {invite.family.name}
                </InviteCardFamilyName>
                <InviteCardFamilyDescription>
                    {invite.family.description}
                </InviteCardFamilyDescription>
                <InviteCardFamilyMembersList>
                    {renderFamilyMembers()}
                </InviteCardFamilyMembersList>
            </InviteCardBody>
            <InviteCardFooter>
                {type === 'received' && (
                    <Button
                        type="button"
                        size="small"
                    >
                        ACCEPT
                    </Button>
                )}
                {type === 'sent' && (
                    <Button
                        type="button"
                        size="small"
                    >
                        CANCEL INVITE
                    </Button>
                )}
            </InviteCardFooter>
        </Card>
    );
};

export default InviteCard;
