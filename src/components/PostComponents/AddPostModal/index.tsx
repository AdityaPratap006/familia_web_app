import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdInsertPhoto } from 'react-icons/md';
import { FamilyContext } from '../../../contexts/family.context';
import Button from '../../Button';
import { TextFieldInput, TextAreaInput } from '../../Input';
import LoadingBouncers from '../../LoadingBouncers';
import Modal from '../../Modal';
import { AddPostModalCSS, PicturePreviewContainer, PicturePreview, PictureInput, AddPictureButton } from './style';

interface AddPostModalProps {
    onCancel: () => void;
    show: boolean;
}

interface IFormInput {
    title: string;
    content: string;
}

const AddPostModal: React.FC<AddPostModalProps> = ({ onCancel, show }) => {
    const { currentFamily } = useContext(FamilyContext);
    const [file, setFile] = useState<File>();
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const filePickerRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit, errors, formState } = useForm<IFormInput>({
        mode: "all",
    });

    const { isValid: isFormValid } = formState;


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

    if (!currentFamily) {
        return <LoadingBouncers />;
    }

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

    const onSubmitHandler = (input: IFormInput) => {
        console.log({
            input,
            file,
        });
    }

    return (
        <Modal
            addcss={AddPostModalCSS}
            headerComponent={`Share something!`}
            onCancel={onCancel}
            show={show}
            footerComponent={
                <React.Fragment>
                    <Button size="small" inverse onClick={onCancel}>CANCEL</Button>
                    <Button disabled={!isFormValid} onClick={handleSubmit(onSubmitHandler)}>SHARE</Button>
                </React.Fragment>
            }
        >
            <TextFieldInput
                id="title"
                name="title"
                label="Title"
                type="text"
                ref={register({
                    pattern: { value: /.*\S.*/, message: "Title cannot be empty" },
                    required: { value: true, message: "A title is required" },
                    maxLength: { value: 120, message: "The title is too long" },
                })}
                errorText={errors.title && errors.title.message}
            />
            <TextAreaInput
                id="content"
                name="content"
                label="Content (Optional)"
                rows={3}
                ref={register({
                    maxLength: { value: 800, message: "The content is too long" },
                })}
                errorText={errors.content && errors.content.message}
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
        </Modal>
    );
};

export default AddPostModal;
