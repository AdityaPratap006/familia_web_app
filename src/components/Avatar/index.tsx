import React from 'react';
import { ImageContainer } from './style';

interface AvatarProps {
    alt: string;
    src: string;  
    small?: boolean;
    tiny?: boolean;
    medium?: boolean;
    large?: boolean;
}

const Avatar: React.FC<AvatarProps> = (props) => {

    let sizeClass = `small`;
    if (props.tiny) {
        sizeClass = `tiny`;
    } else if (props.medium) {
        sizeClass = `medium`;
    } else if (props.large) {
        sizeClass = `large`;
    }

    return (
        <ImageContainer className={`${sizeClass}`}>
            <img
                alt={props.alt}
                src={props.src}
            />
        </ImageContainer>
    );
};

export default Avatar;
