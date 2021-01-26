import React from 'react';
import Button from '../../Button';
import LoadingBouncers from '../../LoadingBouncers';
import Modal from '../../Modal';
import { DeleteWarningMessage } from './style';

interface DeletePostModalProps {
    show: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    deleteReponseLoading: boolean;
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({
    show,
    onCancel,
    onConfirm,
    deleteReponseLoading,
}) => {
    return (
        <Modal
            show={show}
            onCancel={onCancel}
            headerComponent="Are you sure?"
            footerComponent={
                <React.Fragment>
                    {!deleteReponseLoading && (
                        <React.Fragment>
                            <Button inverse onClick={onCancel}>CANCEL</Button>
                            <Button danger onClick={onConfirm}>DELETE</Button>
                        </React.Fragment>
                    )}
                    {deleteReponseLoading && <LoadingBouncers />}
                </React.Fragment>
            }
        >
            <DeleteWarningMessage>
                Do you want to delete this post permanently?
            </DeleteWarningMessage>
        </Modal>
    );
};

export default DeletePostModal;
