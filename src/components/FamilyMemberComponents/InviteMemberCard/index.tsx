import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { FamilyContext } from '../../../contexts/family.context';
import { CREATE_INVITE_MUTATION } from '../../../graphql/invite/mutation';
import { FamilyMember } from '../../../models/family';
import { IInvite } from '../../../models/invite';
import Avatar from '../../Avatar';
import Button from '../../Button';
import Card from '../../Card';
import LoadingSpinner from '../../LoadingSpinner';
import { AvatarContainer, StyledBody, StyledAbout, StyledContent, StyledName, StyledActionContainer, StyledEmail } from './style';

interface InviteMemberCardProps {
    user: FamilyMember;
}

const InviteMemberCard: React.FC<InviteMemberCardProps> = ({ user }) => {
    const { currentFamily } = useContext(FamilyContext);

    const [createInviteMutation, createInviteMutationResult] = useMutation<{ createInvite: IInvite }>(CREATE_INVITE_MUTATION);

    const sendInviteHandler = async () => {

        if (!currentFamily) {
            return;
        }

        try {
            const result = await createInviteMutation({
                variables: {
                    input: {
                        family: currentFamily._id,
                        to: user._id,
                    },
                }
            });

            if (result.data) {
                toast.success(`Invite sent to ${user.name}`);
            }

            if (result.errors) {
                toast.error(result.errors[0]?.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <Card>
            <StyledBody>
                <AvatarContainer>
                    <Avatar alt={user.name} src={user.image.url} />
                </AvatarContainer>
                <StyledContent>
                    <StyledName>
                        {user.name}
                    </StyledName>
                    <StyledEmail>
                        {user.email}
                    </StyledEmail>
                    <StyledAbout>
                        {user.about}
                    </StyledAbout>
                    <StyledActionContainer>
                        {createInviteMutationResult.called && createInviteMutationResult.loading && <LoadingSpinner />}
                        {!(createInviteMutationResult.called && createInviteMutationResult.loading) && (
                            <Button
                                type="button"
                                size="small"
                                onClick={sendInviteHandler}
                            >
                                SEND INVITE
                            </Button>
                        )}
                    </StyledActionContainer>
                </StyledContent>
            </StyledBody>
        </Card>
    );
};

export default InviteMemberCard;
