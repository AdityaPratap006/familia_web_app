import React, { useState } from 'react';
import { StyledCardBody, StyledCardFooter, StyledText, StyledQuote, CardCSS } from './style';
import Card from '../../Card';
import Button from '../../Button';
import OnboardingContainer from '../OnboardingContainer';
import CreateFamilyModal from '../../FamilyComponents/CreateFamilyModal';

const CreateFamilyCard: React.FC = () => {
    const [showCreateFamilyModal, setShowCreateFamilyModal] = useState<boolean>(false);

    const closeCreateFamilyModal = () => {
        setShowCreateFamilyModal(false);
    }

    const openCreateFamilyModal = () => {
        setShowCreateFamilyModal(true);
    }

    return (
        <OnboardingContainer>
            <CreateFamilyModal
                show={showCreateFamilyModal}
                closeModal={closeCreateFamilyModal}
            />
            <Card addcss={CardCSS}>
                <StyledCardBody>
                    <StyledQuote>
                        " Family is not an important thing. It's everything. "
                    </StyledQuote>

                    <StyledText>
                        A life without family is a life without purpose.
                        <br />
                        Create a family and start spreading love!
                    </StyledText>

                </StyledCardBody>
                <StyledCardFooter>
                    <Button
                        type="button"
                        onClick={openCreateFamilyModal}
                    >
                        Create a Family
                </Button>
                </StyledCardFooter>
            </Card>
        </OnboardingContainer>
    );
};

export default CreateFamilyCard;
