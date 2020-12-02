import React from 'react';
import { BouncerContainer, BouncingBall } from './style';

interface LoadingBouncerProps {
    small?: boolean;
    medium?: boolean;
    large?: boolean;
}

const LoadingBouncers: React.FC<LoadingBouncerProps> = (props) => {
    let sizeClass = `medium`;

    if (props.small) {
        sizeClass = `small`;
    } else if (props.large) {
        sizeClass = `large`;
    }

    return (
        <BouncerContainer className={`${sizeClass}`}>
            {Array.from({ length: 4 }, (_, i) => i + 1).map(key => (
                <BouncingBall key={key} className={`${sizeClass}`} />
            ))}
        </BouncerContainer>
    );
};

export default LoadingBouncers;
