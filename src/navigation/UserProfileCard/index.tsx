import React, { useContext } from 'react';
import Avatar from '../../components/Avatar';
import Card from '../../components/Card';
import LoadingBouncers from '../../components/LoadingBouncers';
import { UserProfileContext } from '../../contexts/userProfile.context';
import LogoutButton from '../../components/LogoutButton';
import { UserProfileAvatarContainer, UserProfileCardBody, UserProfileCardCSS, UserProfileContent, UserProfileEmail, UserProfileCardFooter, UserProfileName } from './style';

const UserProfileCard: React.FC = () => {
    const { profile } = useContext(UserProfileContext);

    if (!profile) {
        return <LoadingBouncers />;
    }

    return (
        <Card addcss={UserProfileCardCSS}>
            <UserProfileCardBody>
                <UserProfileAvatarContainer>
                    <Avatar
                        alt={`avatar`}
                        src={profile.image.url}
                        small
                    />
                </UserProfileAvatarContainer>
                <UserProfileContent>
                    <UserProfileName>{profile.name}</UserProfileName>
                    <UserProfileEmail>{profile.email}</UserProfileEmail>
                </UserProfileContent>
            </UserProfileCardBody>
            <UserProfileCardFooter>
                <LogoutButton />
            </UserProfileCardFooter>
        </Card>
    );
};

export default UserProfileCard;
