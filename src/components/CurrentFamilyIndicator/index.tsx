import React, { useContext, useState } from 'react';
import { Indicator, IndicatorText } from './style';
import { FamilyContext } from '../../contexts/family.context';
import LoadingBouncers from '../LoadingBouncers';
import CreateFamilyModal from '../CreateFamilyModal';

const CurrentFamilyIndicator: React.FC = () => {
    const { currentFamily, loadingFamilies, families } = useContext(FamilyContext);
    const [showCreateFamilyModal, setShowCreateFamilyModal] = useState<boolean>(false);

    if (loadingFamilies) {
        return <LoadingBouncers small />;
    }

    const closeCreateFamilyModal = () => {
        setShowCreateFamilyModal(false);
    }

    const openCreateFamilyModal = () => {
        setShowCreateFamilyModal(true);
    }

    return (
        <React.Fragment>
            <CreateFamilyModal
                show={showCreateFamilyModal}
                closeModal={closeCreateFamilyModal}
            />
            <Indicator>
                {currentFamily && <IndicatorText> {currentFamily.name}</IndicatorText>}
                {!currentFamily && families.length === 0 && <IndicatorText onClick={openCreateFamilyModal}>Create a Family</IndicatorText>}
            </Indicator>
        </React.Fragment>
    );
};

export default CurrentFamilyIndicator;
