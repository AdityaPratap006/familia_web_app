import React, { useContext } from 'react';
import { FamilyContext } from '../../../contexts/family.context';
import { IFamily } from '../../../models/family';
import Button from '../../Button';
import Modal from '../../Modal';
import SelectFamilyCard from './SelectFamilyCard';
import { SelectFamilyModalBody } from './styles';

interface SelectFamilyModalProps {
    show: boolean;
    closeModal: () => void;
}

const SelectFamilyModal: React.FC<SelectFamilyModalProps> = ({ show, closeModal }) => {

    const { families, setCurrentFamilyHandler } = useContext(FamilyContext);

    const onSelectHandler = (family: IFamily) => {
        setCurrentFamilyHandler(family);
        closeModal();
    }

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
                        <SelectFamilyCard key={family._id} family={family} onSelect={onSelectHandler} />
                    ))
                }
            </SelectFamilyModalBody>
        </Modal>
    );
};

export default SelectFamilyModal;
