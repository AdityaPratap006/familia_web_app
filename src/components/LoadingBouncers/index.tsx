import React from 'react';
import { BouncerContainer, BouncingBall } from './style';

const LoadingBouncers = () => {
    return (
        <BouncerContainer>
            {Array.from({ length: 4 }, (_, i) => i + 1).map(key => (
                <BouncingBall key={key} />
            ))}
        </BouncerContainer>
    );
};

export default LoadingBouncers;
