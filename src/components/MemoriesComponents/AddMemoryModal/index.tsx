import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Button from '../../Button';
import { CustomInput, TextAreaInput, TextSelectInput, TextSelectOption } from '../../Input';
import Modal from '../../Modal';
import { AddMemoryModalCSS } from './style';

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

const AddMemoryModal: React.FC<AddMemoryModalProps> = ({ show, closeModal }) => {
    const { errors, handleSubmit, formState, control, register } = useForm<FormValues>({
        mode: 'all',
    });

    const onFormSubmit = (formValues: FormValues) => {
        console.log(formValues);
    }

    return (
        <Modal
            show={show}
            headerComponent={`Add a Memory!`}
            addcss={AddMemoryModalCSS}
            onCancel={closeModal}
            footerComponent={
                <>
                    <Button type="button" disabled={!formState.isValid} onClick={handleSubmit(onFormSubmit)}>ADD</Button>
                    <Button type="button" inverse onClick={closeModal}>CANCEL</Button>
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
                    maxLength: { value: 30, message: "Content is too long" },
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
