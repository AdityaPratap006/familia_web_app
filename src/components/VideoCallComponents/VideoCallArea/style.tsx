import styled from 'styled-components';

export const StyledVideoCallArea = styled.div`
    width: 100%;
    height: 80vh;
    overflow: hidden;
    background: transparent;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const MyVideo = styled.video`
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    position: absolute;
    bottom: 4rem;
    right: 1rem;
    width: 10rem;
    height: 10rem;
    border-radius: 20px;
    overflow: hidden;
`;

export const PartnerVideo = styled.video`
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
`;