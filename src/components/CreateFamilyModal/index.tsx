import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { TextAreaInput, TextFieldInput } from '../Input';
import Modal from '../Modal';

interface CreateFamilyModalProps {
    show: boolean;
    closeModal: () => void;
}

interface IFormInput {
    familyName: string;
    familyDescription: string;
}

const CreateFamilyModal: React.FC<CreateFamilyModalProps> = ({ show, closeModal }) => {
    const { register, handleSubmit, errors, formState } = useForm<IFormInput>({
        mode: "all",
    });

    const onSubmit = (data: IFormInput) => {
        console.log(data);
    }

    return (
        <Modal
            show={show}
            headerComponent={'Create a new Family!'}
            onCancel={closeModal}
            onSubmit={handleSubmit(onSubmit)}
            footerComponent={
                <>
                    <Button type="submit" disabled={!formState.isValid}>CREATE</Button>
                    <Button type="button" inverse onClick={closeModal}>CANCEL</Button>
                </>
            }
        >
            <TextFieldInput
                id="familyName"
                name="familyName"
                label="Family Name"
                type="text"
                ref={register({
                    pattern: { value: /.*\S.*/, message: "Family name cannot be empty" },
                    required: { value: true, message: "A name is required" },
                    maxLength: { value: 30, message: "The name is too long" },
                })}
                errorText={errors.familyName && errors.familyName.message}
            />
            <TextAreaInput
                id="familyDescription"
                name="familyDescription"
                label="Description"
                rows={4}
                ref={register({
                    maxLength: { value: 200, message: "The description is too long" },
                })}
                errorText={errors.familyDescription && errors.familyDescription.message}
            />
        </Modal>
    );
};

export default CreateFamilyModal;