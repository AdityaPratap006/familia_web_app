import React, { useContext } from 'react';
import { FamilyContext } from '../../../contexts/family.context';
import Button from '../../Button';
import Modal from '../../Modal';
import SelectFamilyCard from './SelectFamilyCard';
import { SelectFamilyModalBody } from './styles';

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
            <SelectFamilyModalBody>
                {
                    families.map(family => (
                        <SelectFamilyCard key={family._id} family={family} />
                    ))
                }
                {
                    families.map(family => (
                        <SelectFamilyCard key={family._id} family={family} />
                    ))
                }

            </SelectFamilyModalBody>
        </Modal>
    );
};

export default SelectFamilyModal;
