import React, { useContext } from 'react';
import { ProfileCardCSS, ProfileScreenContent } from './style';
import Screen from '../../components/ScreenComponents/Screen';
import { UserProfileContext } from '../../contexts/userProfile.context';
import Card from '../../components/Card';
import { TextAreaInput, TextFieldInput } from '../../components/Input';
import LoadingBouncers from '../../components/LoadingBouncers';
import Avatar from '../../components/Avatar';
import { getLocalDateText } from '../../utils/dates';

const ProfileScreen: React.FC = () => {
    const { profile } = useContext(UserProfileContext);

    if (!profile) {
        return (
            <Screen
                title="Profile"
                withGoBackButton
                withoutBottomAppBar
            >
                <LoadingBouncers />
            </Screen>

        );
    }

    return (
        <Screen
            title="Profile"
            withGoBackButton
            withoutBottomAppBar
        >
            <ProfileScreenContent>
                <Card addcss={ProfileCardCSS}>
                    <Avatar
                        alt={profile.name}
                        src={profile.image.url}
                        medium
                    />
                    <TextFieldInput
                        id="name"
                        type="text"
                        label="Name"
                        defaultValue={profile.name}
                    />
                    <TextFieldInput
                        id="email"
                        type="email"
                        label="Email"
                        defaultValue={profile.email}
                    />
                    <TextAreaInput
                        id="about"
                        type="text"
                        label="About"
                        defaultValue={profile.about}
                    />
                    <TextFieldInput
                        id="createdAt"
                        type="text"
                        label="Created Familia Account on"
                        defaultValue={getLocalDateText(profile.createdAt)}
                        disabled
                    />
                    <TextFieldInput
                        id="updatedAt"
                        type="text"
                        label="Last Profile Update on"
                        defaultValue={getLocalDateText(profile.updatedAt)}
                        disabled
                    />
                </Card>
            </ProfileScreenContent>
        </Screen>
    );
};

export default ProfileScreen;
