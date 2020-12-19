import React, { useContext } from 'react';
import { FamilyContext } from '../../../contexts/family.context';
import { IFamily } from '../../../models/family';
import Button from '../../Button';
import HorizontalList from '../../HorizontalList';
import LoadingBouncers from '../../LoadingBouncers';
import Modal from '../../Modal';
import SelectFamilyCard from './SelectFamilyCard';
import { SelectFamilyModalBody } from './styles';

interface SelectFamilyModalProps {
    show: boolean;
    closeModal: () => void;
    onCreateNewFamily: () => void;
}

const SelectFamilyModal: React.FC<SelectFamilyModalProps> = ({ show, closeModal, onCreateNewFamily }) => {
    const { families, setCurrentFamilyHandler, currentFamily } = useContext(FamilyContext);

    const onSelectHandler = (family: IFamily) => {
        setCurrentFamilyHandler(family);
        closeModal();
    }

    if (!currentFamily) {
        return (
            <Modal
                show={show}
                headerComponent={'Select a Family!'}
                onCancel={closeModal}
                footerComponent={
                    <>
                        <Button type="button" onClick={onCreateNewFamily}>CREATE NEW</Button>
                        <Button type="button" inverse onClick={closeModal}>CANCEL</Button>
                    </>
                }
            >
                <LoadingBouncers />
            </Modal>
        );
    }

    const familyList = [currentFamily, ...families.filter(fam => fam._id !== currentFamily._id)];

    return (
        <Modal
            show={show}
            headerComponent={'Select a Family!'}
            onCancel={closeModal}
            footerComponent={
                <>
                    <Button type="button" onClick={onCreateNewFamily}>CREATE NEW</Button>
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
                        familyList.map(family => (
                            <SelectFamilyCard key={family._id} family={family} onSelect={onSelectHandler} />
                        ))
                    }
                </HorizontalList>
            </SelectFamilyModalBody>
        </Modal>
    );
};

export default SelectFamilyModal;
