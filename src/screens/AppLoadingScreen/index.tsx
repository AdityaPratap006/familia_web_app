import React from 'react';
import styled, { keyframes } from 'styled-components';
import Screen from '../../components/ScreenComponents/Screen';
import { AppLogoImage } from '../../navigation/AppLogo/style';
import FamiliaLogo from '../../assets/familia_logo.png';

const animation = (heightInRem: number) => keyframes`
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-${heightInRem}rem);
    }

    100% {
        transform: translateY(${heightInRem}rem);
    }
`;

const LogoContainer = styled.div`
    padding: 1rem;
    animation: ${animation(2)} 1s ease-in-out infinite alternate;
`;

const AppLoadingScreen: React.FC = () => {
    return (
        <Screen withoutHeader withoutBottomAppBar>
            <div className='app-loading-screen'>
                <LogoContainer>
                    <AppLogoImage
                        alt={`familia-logo`}
                        src={FamiliaLogo}
                        style={{
                            width: '8rem',
                            height: 'auto',
                        }}
                    />
                </LogoContainer>
            </div>
        </Screen>
    );
};

export default AppLoadingScreen;
