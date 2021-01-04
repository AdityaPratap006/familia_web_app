import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { ProfileCardCSS, ProfileScreenContent } from './style';
import Screen from '../../components/ScreenComponents/Screen';
import { UserProfileContext } from '../../contexts/userProfile.context';
import Card from '../../components/Card';
import { TextAreaInput, TextFieldInput } from '../../components/Input';
import LoadingBouncers from '../../components/LoadingBouncers';
import { getLocalDateText } from '../../utils/dates';
import Button from '../../components/Button';
import { IUserProfile } from '../../models/user';
import { UPDATE_USER_MUTATION } from '../../graphql/user/mutations';
import ProfileImagePicker from '../../components/ProfileImagePicker';
import { resizeImageFile } from '../../utils/filesUpload';

interface IFormInput {
    name: string;
    about: string;
}

const ProfileScreen: React.FC = () => {
    const { profile, fetchUserProfile } = useContext(UserProfileContext);
    const { register, handleSubmit, errors, formState } = useForm<IFormInput>({
        mode: "all",
    });
    const [profilePic, setProfilePic] = useState<File>();
    const [updateUserMutation, updateUserMutationResult] = useMutation<{ updateUser: IUserProfile }>(UPDATE_USER_MUTATION, {
        onCompleted: () => {
            fetchUserProfile();
        },
    });

    useEffect(() => {
        console.log(`Profile Pic:`, profilePic);
    }, [profilePic]);

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

    const onProfilePicInput = (file: File) => {
        setProfilePic(file);
    }

    const onSubmit = async (input: IFormInput) => {
        let base64Image = '';
        try {
            base64Image = await resizeImageFile({ file: profilePic });
        } catch (error) {

            toast.error(`Error Loading Image`);
        }

        const resizedImageString = base64Image.trim() === 'File Not Found' ? '' : base64Image.trim();

        try {
            const { data, errors } = await updateUserMutation({
                variables: {
                    input: {
                        name: input.name,
                        about: input.about,
                        imageBase64String: resizedImageString,
                    },
                },
            });

            if (errors) {
                toast.error(errors[0]?.message);
                return;
            }

            if (data) {
                toast.success(`Profile Updated!`);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const { called, loading } = updateUserMutationResult;

    return (
        <Screen
            title="Profile"
            withGoBackButton
            withoutBottomAppBar
        >
            <ProfileScreenContent>
                <Card addcss={ProfileCardCSS}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ProfileImagePicker
                            id="profileImage"
                            name="profileImage"
                            initialPreviewImageURL={profile.image.url}
                            onFileInput={onProfilePicInput}
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
                        {!loading && (
                            <Button
                                type="submit"
                                disabled={!formState.isValid || !formState.touched}
                            >
                                SAVE
                            </Button>
                        )}
                        {called && loading && (
                            <LoadingBouncers small />
                        )}
                    </form>
                </Card>
            </ProfileScreenContent>
        </Screen>
    );
};

export default ProfileScreen;
