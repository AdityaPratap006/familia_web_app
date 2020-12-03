import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import Modal from '../Modal';

interface CreateFamilyModalProps {
    show: boolean;
    closeModal: () => void;
}

interface IFormInput {
    name: string;
}

const CreateFamilyModal: React.FC<CreateFamilyModalProps> = ({ show, closeModal }) => {
    const { register, handleSubmit, errors, formState } = useForm<IFormInput>({
        mode: "all",
    });

    const onSubmit = (data: IFormInput) => {
        console.log(data, errors);
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
            <label>Family Name</label>
            <input
                name="name"
                type="text"
                ref={register({
                    pattern: { value: /.*\S.*/, message: "name cannot be empty" },
                    required: { value: true, message: "name is required" },
                    maxLength: { value: 30, message: "name is too long" },
                })}

            />
            {errors.name && errors.name.message}
        </Modal>
    );
};

export default CreateFamilyModal;