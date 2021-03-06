import styled, { css } from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';

export const AddPostModalCSS = css`
    max-width: 95vw;
    top: 2vh;
    max-height: 96vh;

    @media (min-width: ${ScreenSize.SM_MIN}) {
        width: 50rem;
    }

`;

export const PictureInput = styled.input`
    display: none;
`;

export const AddPictureButton = styled.button`
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    padding: 0;
    background: transparent;
    cursor: pointer;

    .icon {
        width: 2.4rem;
        height: 2.4rem;
        color: ${props => props.theme.primary};
    }
`;

export const PicturePreviewContainer = styled.div`
    width: 100%;
`;

export const PicturePreview = styled.img`
    margin: 0.5rem 0;
    width: 100%;
    height: auto;
    overflow: hidden;
    border-radius: 20px;
`;