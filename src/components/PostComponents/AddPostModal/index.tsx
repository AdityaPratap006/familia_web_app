import React from 'react';
import Button from '../../Button';
import Modal from '../../Modal';
import AddPostForm from '../AddPostForm';
import { AddPostModalCSS } from './style';

interface AddPostModalProps {
    onCancel: () => void;
    show: boolean;
}

const AddPostModal: React.FC<AddPostModalProps> = ({ onCancel, show }) => {

    return (
        <Modal
            addcss={AddPostModalCSS}
            headerComponent={`Share something!`}
            onCancel={onCancel}
            show={show}
            footerComponent={
                <React.Fragment>
                    <Button size="small" inverse onClick={onCancel}>CANCEL</Button>
                    <Button onClick={() => console.log('sharing post')}>SHARE</Button>
                </React.Fragment>
            }
        >
            <AddPostForm />
        </Modal>
    );
};

export default AddPostModal;
