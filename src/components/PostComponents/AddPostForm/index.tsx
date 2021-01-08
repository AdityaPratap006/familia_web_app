import React, { useContext, useState, useRef, useEffect } from 'react';
import { MdInsertPhoto } from 'react-icons/md';
import { FamilyContext } from '../../../contexts/family.context';
import { TextAreaInput, TextFieldInput } from '../../Input';
import LoadingBouncers from '../../LoadingBouncers';
import { AddPictureButton, PictureInput, PicturePreview, PicturePreviewContainer } from './style';

const AddPostForm: React.FC = () => {
    const { currentFamily } = useContext(FamilyContext);
    const [file, setFile] = useState<File>();
    const [previewUrl, setPreviewUrl] = useState<string>('');
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
    }

    const pickImageHandler = () => {
        filePickerRef.current?.click();
    }

    if (!currentFamily) {
        return <LoadingBouncers />;
    }

    return (
        <React.Fragment>
            <TextFieldInput
                id="title"
                name="title"
                label="Title"
                type="text"

            />
            <TextAreaInput
                id="content"
                name="content"
                label="Content (Optional)"
                rows={3}

            />
            {previewUrl && (
                <PicturePreviewContainer>
                    <PicturePreview alt='image-preview' src={previewUrl} />
                </PicturePreviewContainer>
            )}
            <PictureInput
                id="image"
                name="image"
                type="file"
                accept=".jpg,.png,.jpeg"
                ref={filePickerRef}
                onChange={pickedHandler}

            />
            <AddPictureButton type="button" onClick={pickImageHandler}>
                <MdInsertPhoto className="icon" />
            </AddPictureButton>
        </React.Fragment>
    );
};

export default AddPostForm;
