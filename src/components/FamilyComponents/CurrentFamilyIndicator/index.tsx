import React, { useContext, useState } from 'react';
import { Indicator, IndicatorText } from './style';
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
                {currentFamily && <IndicatorText onClick={openSelectFamilyModal}> {currentFamily.name}</IndicatorText>}
                {!currentFamily && families.length === 0 && <IndicatorText onClick={openCreateFamilyModal}>Create a Family</IndicatorText>}
            </Indicator>
        </React.Fragment>
    );
};

export default CurrentFamilyIndicator;
