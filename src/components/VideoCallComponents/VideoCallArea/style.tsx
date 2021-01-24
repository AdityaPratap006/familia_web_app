import styled from 'styled-components';
import { ScreenSize } from '../../../utils/screenSizes';

export const StyledVideoCallArea = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const MyVideoContainer = styled.div`
    border-radius: 20px;
    border: 3px solid ${props => props.theme.primary};
    background: ${props => props.theme.background};
    overflow: hidden;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    width: 10rem;
    height: 10rem;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);

    @media (max-width: ${ScreenSize.XS_MAX}) {
        width: 6rem;
        height: 6rem;
    }
`;

export const MyVideo = styled.video`
    width: 100%;
    height: 100%;
`;

export const PartnerVideo = styled.video`
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
`;

export const WaitingMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem;
`;

export const WaitingMessageText = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    color: ${props => props.theme.text};
    padding: 0;
    margin: 2rem 1rem;
`;