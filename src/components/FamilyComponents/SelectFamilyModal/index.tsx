import React, { useContext } from 'react';
import { FamilyContext } from '../../../contexts/family.context';
import Button from '../../Button';
import Modal from '../../Modal';

interface SelectFamilyModalProps {
    show: boolean;
    closeModal: () => void;
}

const SelectFamilyModal: React.FC<SelectFamilyModalProps> = ({ show, closeModal }) => {

    const { families } = useContext(FamilyContext);

    return (
        <Modal
            show={show}
            headerComponent={'Select a Family!'}
            onCancel={closeModal}
            footerComponent={
                <>
                    <Button type="button" inverse onClick={closeModal}>CANCEL</Button>
                </>
            }
        >
            {
                families.map(family => (
                    <h1 key={family._id}> {family.name}</h1>
                ))
            }
        </Modal>
    );
};

export default SelectFamilyModal;
