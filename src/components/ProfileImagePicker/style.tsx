import styled from 'styled-components';

export const ProfilePicUploadContainer = styled.div`
    margin: 1rem 0;
    padding-bottom: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    input {
        display: none;
    }
`;

export const ProfilePicUpload = styled.div`
    width: 10rem;
    height: 10rem;
    position: relative;
`;

export const ProfilePicPreviewContainer = styled.div`
    width: 100%;
    height: 100%;
    border: 2px solid ${props => props.theme.primary};
    border-radius: 50%;
    overflow: hidden;
`;

export const ProflePicPreviewImage = styled.img`
    width: 100%;
    height: 100%;
`;

export const ProfilePicPreviewText = styled.p`
    font-size: small;
    font-weight: bold;
    color: ${props => props.theme.primary};
`;

export const StyledIconButton = styled.button`
    position: absolute;
    bottom: 0;
    right: -0.25rem;
    background: ${props => props.theme.primary};
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;

    .icon {
        width: 2rem;
        height: 2rem;
        color: #fff;
    }
`;