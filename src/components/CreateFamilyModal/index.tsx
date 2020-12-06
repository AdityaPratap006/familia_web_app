import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FamilyContext } from '../../contexts/family.context';
import Button from '../Button';
import { TextAreaInput, TextFieldInput } from '../Input';
import LoadingSpinner from '../LoadingSpinner';
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
    const { sendCreateFamilyRequest, sendSetDefaultFamilyRequest, setCurrentFamily } = useContext(FamilyContext);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (inputs: IFormInput) => {
        console.log(inputs);

        setLoading(true);

        try {
            const { data, errors } = await sendCreateFamilyRequest({
                name: inputs.familyName,
                description: inputs.familyDescription,
            });

            if (errors) {
                toast.error(errors[0].message);
                setLoading(false);
                return;
            }

            if (data) {
                await sendSetDefaultFamilyRequest(data.createFamily._id);
                setCurrentFamily(data.createFamily);
                setLoading(false);
                toast.success(`You created family: ${data.createFamily.name}`);
                closeModal();
            }

        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(`Something went wrong, please try again`);
        }
    }

    return (
        <Modal
            show={show}
            headerComponent={'Create a new Family!'}
            onCancel={closeModal}
            onSubmit={handleSubmit(onSubmit)}
            footerComponent={
                !loading ? <>
                    <Button type="submit" disabled={!formState.isValid}>CREATE</Button>
                    <Button type="button" inverse onClick={closeModal}>CANCEL</Button>
                </> : <LoadingSpinner />
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