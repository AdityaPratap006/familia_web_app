import React, { useContext } from 'react';
import { FamilyContext } from '../../../contexts/family.context';
import { IFamily } from '../../../models/family';
import Button from '../../Button';
import HorizontalList from '../../HorizontalList';
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
            <SelectFamilyModalBody >
                <HorizontalList
                    itemsToShow={families.length > 1 ? 1.25 : 1}
                    itemsToScroll={1}
                    pagination={false}
                    enableMouseSwipe={true}
                    preventDefaultTouchmoveEvent={true}
                >
                    {
                        families.map(family => (
                            <SelectFamilyCard key={family._id} family={family} onSelect={onSelectHandler} />
                        ))
                    }
                </HorizontalList>
            </SelectFamilyModalBody>
        </Modal>
    );
};

export default SelectFamilyModal;
