import styled from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';
import { pinkTheme } from '../../utils/theme';

export const AppLogoContainer = styled.div`
    padding: 0.5rem;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    @media (max-width: ${ScreenSize.XS_MAX}) {
        padding: 1.5rem;
    }
`;

export const AppLogoImage = styled.img`
    width: 3.6rem;
    height: auto;

    @media (max-width: ${ScreenSize.MD_MAX}) {
        width: 3rem;
    }

    @media (max-width: ${ScreenSize.XS_MAX}) {
        width: 3.6rem;
    }
`;

export const AppTitle = styled.span`
    font-size: 1.6rem;
    padding: 0;
    margin: 0 1rem;
    color: ${pinkTheme.primary};

    @media (max-width: ${ScreenSize.MD_MAX}) {
        display: none;
    }

    @media (max-width: ${ScreenSize.XS_MAX}) {
        display: block;
    }
`;