import React, { useEffect, useRef, useState } from 'react';
import { RiCameraFill } from 'react-icons/ri';
import { ProfilePicPreviewContainer, ProfilePicUploadContainer, ProfilePicUpload, ProflePicPreviewImage, ProfilePicPreviewText, StyledIconButton } from './style';

interface ImageInputProps extends React.HTMLProps<HTMLInputElement> {
    errorText?: string;
    initialPreviewImageURL?: string;
    onFileInput: (file: File) => void;
}

const ProfileImagePicker: React.FC<ImageInputProps> = (props) => {
    const { errorText, onFileInput, initialPreviewImageURL, ...nativeProps } = props;

    const [file, setFile] = useState<File>();
    const [previewUrl, setPreviewUrl] = useState<string>(initialPreviewImageURL || '');
    const filePickerRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!file) {
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            if (typeof fileReader.result === 'string') {
                setPreviewUrl(fileReader.result);
            }
        };

        fileReader.readAsDataURL(file);

    }, [file]);

    const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let pickedFile: File | undefined;

        if (event.target.files?.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
        }

        if (pickedFile) {
            onFileInput(pickedFile);
        }

    }

    const pickImageHandler = () => {
        filePickerRef.current?.click();
    }

    return (
        <ProfilePicUploadContainer>
            <input
                id={nativeProps.id}
                name={nativeProps.name}
                type="file"
                accept=".jpg,.png,.jpeg"
                ref={filePickerRef}
                onChange={pickedHandler}
                {...nativeProps}
            />
            <ProfilePicUpload>
                <ProfilePicPreviewContainer>
                    {previewUrl && <ProflePicPreviewImage alt={`preview`} src={previewUrl} />}
                    {!previewUrl && <ProfilePicPreviewText>Please pick an image</ProfilePicPreviewText>}
                </ProfilePicPreviewContainer>
                <StyledIconButton type="button" onClick={pickImageHandler}>
                    <RiCameraFill className="icon" />
                </StyledIconButton>
            </ProfilePicUpload>
        </ProfilePicUploadContainer>
    );
};

export default ProfileImagePicker;
