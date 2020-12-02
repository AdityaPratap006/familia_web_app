import React, { useContext } from 'react';
import { Indicator, IndicatorText } from './style';
import { FamilyContext } from '../../contexts/family.context';
import LoadingBouncers from '../LoadingBouncers';

const CurrentFamilyIndicator: React.FC = () => {
    const { currentFamily, loadingFamilies } = useContext(FamilyContext);

    if (loadingFamilies || !currentFamily) {
        return <LoadingBouncers small />
    }

    return (
        <Indicator>
            <IndicatorText> {currentFamily.name}</IndicatorText>
        </Indicator>
    );
};

export default CurrentFamilyIndicator;
