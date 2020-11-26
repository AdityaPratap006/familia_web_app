import React from 'react';
import { Arc, SpinnerContainer } from './style';

interface LoadingSpinnerProps {
    small?: boolean;
    medium?: boolean;
    large?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = (props) => {
    let sizeClass = `medium`;

    if (props.small) {
        sizeClass = `small`;
    } else if (props.large) {
        sizeClass = `large`;
    }

    return (
        <SpinnerContainer className={`${sizeClass}`}>
            <Arc />
            <Arc className='second' />
        </SpinnerContainer>
    );
};

export default LoadingSpinner;
