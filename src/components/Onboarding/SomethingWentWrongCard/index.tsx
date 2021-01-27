import React from 'react';
import Card from '../../Card';
import OnboardingContainer from '../OnboardingContainer';
import { CardCSS, StyledCardBody } from './style';

const SomethingWentWrongCard: React.FC = () => {
    return (
        <OnboardingContainer>
            <Card addcss={CardCSS}>
                <StyledCardBody>{`Something Went Wrong :(`}</StyledCardBody>
            </Card>
        </OnboardingContainer>
    );
};

export default SomethingWentWrongCard;
