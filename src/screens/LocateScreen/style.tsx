import styled from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

export const LocateScreenContent = styled.div`
    width: 100%;
    height: calc(100vh - 4.7rem);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    @media (max-width: ${ScreenSize.XS_MAX}) {
        height: calc(100vh - 4.52rem);
    }
`;

export const NavigationControlContainer = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
`;