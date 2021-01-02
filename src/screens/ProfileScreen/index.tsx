import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ProfileCardCSS, ProfileScreenContent } from './style';
import Screen from '../../components/ScreenComponents/Screen';
import { UserProfileContext } from '../../contexts/userProfile.context';
import Card from '../../components/Card';
import { TextAreaInput, TextFieldInput } from '../../components/Input';
import LoadingBouncers from '../../components/LoadingBouncers';
import Avatar from '../../components/Avatar';
import { getLocalDateText } from '../../utils/dates';
import Button from '../../components/Button';

interface IFormInput {
    name: string;
    about: string;
}

const ProfileScreen: React.FC = () => {
    const { profile } = useContext(UserProfileContext);
    const { register, handleSubmit, errors, formState } = useForm<IFormInput>({
        mode: "all",
    });

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

    const onSubmit = async (input: IFormInput) => {
        console.log(input);
    }

    return (
        <Screen
            title="Profile"
            withGoBackButton
            withoutBottomAppBar
        >
            <ProfileScreenContent>
                <Card addcss={ProfileCardCSS}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Avatar
                            alt={profile.name}
                            src={profile.image.url}
                            medium
                        />
                        <TextFieldInput
                            id="name"
                            name="name"
                            type="text"
                            label="Name"
                            defaultValue={profile.name}
                            ref={register({
                                pattern: { value: /.*\S.*/, message: "Name cannot be empty" },
                                required: { value: true, message: "A name is required" },
                                maxLength: { value: 120, message: "The name is too long" },
                            })}
                            errorText={errors.name?.message}
                        />
                        <TextFieldInput
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            value={profile.email}
                            readOnly
                        />
                        <TextAreaInput
                            id="about"
                            name="about"
                            type="text"
                            label="About"
                            rows={4}
                            defaultValue={profile.about}
                            ref={register({
                                maxLength: { value: 200, message: "About is too long" },
                            })}
                            errorText={errors.about && errors.about.message}
                        />
                        <TextFieldInput
                            id="createdAt"
                            name="createdAt"
                            type="text"
                            label="Created Familia Account on"
                            value={getLocalDateText(profile.createdAt)}
                            readOnly
                        />
                        <TextFieldInput
                            id="updatedAt"
                            name="updatedAt"
                            type="text"
                            label="Last Profile Update on"
                            value={getLocalDateText(profile.updatedAt)}
                            readOnly
                        />
                        <Button
                            type="submit"
                            disabled={!formState.isValid}
                        >
                            SAVE
                        </Button>
                    </form>
                </Card>
            </ProfileScreenContent>
        </Screen>
    );
};

export default ProfileScreen;
