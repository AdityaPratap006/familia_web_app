import styled, { css } from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

export const UserProfileCardCSS = css`
    margin-top: 0.7rem;
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    @media (max-width: ${ScreenSize.MD_MAX}) {
       padding: 0.1rem;
    }

    @media (max-width: ${ScreenSize.XS_MAX}) {
        padding: 0.5rem;
    }
`;

export const UserProfileCardBody = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    @media (max-width: ${ScreenSize.LMD_MAX}) {
       flex-direction: column;
       align-items: flex-start;
    }
`;

export const UserProfileCardFooter = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const UserProfileAvatarContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0.5rem;

    @media (max-width: ${ScreenSize.MD_MAX}) {
       margin: 0.25rem 0;
    }
`;

export const UserProfileContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0.5rem;

    @media (max-width: ${ScreenSize.MD_MAX}) {
        display: none;
    }

    @media (max-width: ${ScreenSize.XS_MAX}) {
        display: flex;
    }
`;

export const UserProfileName = styled.span`
    font-size: 1.2rem;
    padding: 0;
    margin: 0.25rem 0;
    color: ${props => props.theme.text};
`;

export const UserProfileEmail = styled.span`
    font-size: 1rem;
    font-weight: bold;
    padding: 0;
    margin: 0.25rem 0;
    color: ${props => props.theme.primary};
`;