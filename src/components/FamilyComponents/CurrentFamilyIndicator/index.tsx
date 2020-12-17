import React, { useContext, useState } from 'react';
import { FaBorderAll } from 'react-icons/fa';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { Indicator, IconContainer } from './style';
import { FamilyContext } from '../../../contexts/family.context';
import LoadingBouncers from '../../LoadingBouncers';
import CreateFamilyModal from '../CreateFamilyModal';
import SelectFamilyModal from '../SelectFamilyModal';

const CurrentFamilyIndicator: React.FC = () => {
    const { currentFamily, loadingFamilies, families } = useContext(FamilyContext);
    const [showCreateFamilyModal, setShowCreateFamilyModal] = useState<boolean>(false);
    const [showSelectFamilyModal, setShowSelectFamilyModal] = useState<boolean>(false);

    if (loadingFamilies) {
        return <LoadingBouncers small />;
    }

    const closeCreateFamilyModal = () => {
        setShowCreateFamilyModal(false);
    }

    const openCreateFamilyModal = () => {
        setShowCreateFamilyModal(true);
    }

    const closeSelectFamilyModal = () => {
        setShowSelectFamilyModal(false);
    }

    const openSelectFamilyModal = () => {
        setShowSelectFamilyModal(true);
    }

    const createNewFamilyHandler = () => {
        setShowSelectFamilyModal(false);
        setShowCreateFamilyModal(true);
    }

    return (
        <React.Fragment>
            <CreateFamilyModal
                show={showCreateFamilyModal}
                closeModal={closeCreateFamilyModal}
            />
            <SelectFamilyModal
                show={showSelectFamilyModal}
                closeModal={closeSelectFamilyModal}
                onCreateNewFamily={createNewFamilyHandler}
            />
            <Indicator>
                {currentFamily && (
                    <IconContainer >
                        <FaBorderAll
                            className="icon"
                            onClick={openSelectFamilyModal}
                        />
                    </IconContainer>
                )}
                {!currentFamily && families.length === 0 && (
                    <IconContainer>
                        <AiOutlineAppstoreAdd
                            className="icon"
                            onClick={openCreateFamilyModal}
                        />
                    </IconContainer>
                )}
            </Indicator>
        </React.Fragment>
    );
};

export default CurrentFamilyIndicator;
