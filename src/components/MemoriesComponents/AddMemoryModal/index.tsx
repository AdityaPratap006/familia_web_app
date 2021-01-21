import React, { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Controller, useForm } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Button from '../../Button';
import { CustomInput, TextAreaInput, TextSelectInput, TextSelectOption } from '../../Input';
import Modal from '../../Modal';
import { AddMemoryModalCSS } from './style';
import { FamilyContext } from '../../../contexts/family.context';
import LoadingBouncers from '../../LoadingBouncers';
import { CREATE_MEMORY_MUTATION } from '../../../graphql/memory/mutations';
import { IMemory } from '../../../models/memory';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../LoadingSpinner';
import { GET_ALL_MEMORIES_IN_FAMILY } from '../../../graphql/memory/queries';

interface AddMemoryModalProps {
    show: boolean;
    closeModal: () => void;
}

const typeOptions: TextSelectOption[] = [
    {
        key: 'birthday',
        value: 'birthday',
    },
    {
        key: 'anniversary',
        value: 'anniversary',
    },
    {
        key: 'first job',
        value: 'first job',
    },
    {
        key: 'graduated',
        value: 'graduated',
    },
    {
        key: 'promotion',
        value: 'promotion',
    },
];

interface FormValues {
    type: string;
    date: string;
    content: string;
}

interface CreateMemoryResponse {
    createMemory: IMemory;
}

const AddMemoryModal: React.FC<AddMemoryModalProps> = ({ show, closeModal }) => {
    const { errors, handleSubmit, formState, control, register } = useForm<FormValues>({
        mode: 'all',
    });
    const { currentFamily } = useContext(FamilyContext);
    const [createMemoryMutaion, { loading, error }] = useMutation<CreateMemoryResponse>(CREATE_MEMORY_MUTATION);

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);

    if (!currentFamily) {
        return (
            <Modal
                show={show}
                headerComponent={`Please Wait!`}
                addcss={AddMemoryModalCSS}
                onCancel={closeModal}
                footerComponent={
                    <>
                        <Button type="button" inverse onClick={closeModal}>CANCEL</Button>
                    </>
                }
            >
                <LoadingBouncers />
            </Modal>
        );
    }

    const onFormSubmit = async (formValues: FormValues) => {
        const inputData = {
            familyId: currentFamily._id,
            type: formValues.type,
            content: formValues.content,
            date: formValues.date,
        }

        const { data } = await createMemoryMutaion({
            variables: {
                input: inputData,
            },
            refetchQueries: [
                {
                    query: GET_ALL_MEMORIES_IN_FAMILY,
                    variables: {
                        input: {
                            familyId: currentFamily._id,
                        }
                    },
                },
            ],
            awaitRefetchQueries: true,
        });

        if (data) {
            toast.success('Memory created!!');
            closeModal();
        }
    }

    return (
        <Modal
            show={show}
            headerComponent={`Add a Memory!`}
            addcss={AddMemoryModalCSS}
            onCancel={closeModal}
            footerComponent={
                <>
                    {!loading && (
                        <>
                            <Button type="button" disabled={!formState.isValid} onClick={handleSubmit(onFormSubmit)}>ADD</Button>
                            <Button type="button" inverse onClick={closeModal}>CANCEL</Button>
                        </>
                    )}
                    {loading && <LoadingSpinner small />}
                </>
            }
        >
            <TextSelectInput
                id="type"
                name="type"
                label="Type"
                ref={register({
                    pattern: { value: /.*\S.*/, message: "Type cannot be empty" },
                    required: { value: true, message: "Type is required" },
                })}
                optionList={typeOptions}
                errorText={errors.type?.message}
            />
            <TextAreaInput
                id="content"
                name="content"
                rows={3}
                label="Content"
                ref={register({
                    pattern: { value: /.*\S.*/, message: "Content cannot be empty" },
                    required: { value: true, message: "Content is required" },
                    maxLength: { value: 400, message: "Content is too long" },
                })}
                errorText={errors.content?.message}
            />
            <CustomInput
                id="date"
                label="Date"
                errorText={errors.date?.message}
            >
                <Controller
                    control={control}
                    name="date"
                    rules={{
                        pattern: { value: /.*\S.*/, message: "Date cannot be empty" },
                        required: { value: true, message: "Date is required" },
                    }}
                    render={({ onBlur, onChange, value }) => (
                        <ReactDatePicker
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                        />
                    )}
                />
            </CustomInput>
        </Modal>
    );
};

export default AddMemoryModal;
