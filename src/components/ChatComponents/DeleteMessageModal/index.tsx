import React from 'react';
import Button from '../../Button';
import Modal from '../../Modal';
import { DeleteWarningMessage } from './style';

interface DeleteMessageModalProps {
    show: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const DeleteMessageModal: React.FC<DeleteMessageModalProps> = ({
    show,
    onCancel,
    onConfirm,
}) => {
    return (
        <Modal
            show={show}
            onCancel={onCancel}
            headerComponent="Are you sure?"
            footerComponent={
                <React.Fragment>
                    <Button inverse onClick={onCancel}>CANCEL</Button>
                    <Button danger onClick={onConfirm}>DELETE</Button>
                </React.Fragment>
            }
        >
            <DeleteWarningMessage>
                Do you want to delete this message permanently?
            </DeleteWarningMessage>
        </Modal>
    );
};

export default DeleteMessageModal;
