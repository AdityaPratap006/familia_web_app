import styled, { css } from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

export const logoutBtnStyle = css`
    padding: 0.4rem 1rem 0.4rem 0.75rem !important;
    margin-top: 0.5rem;
    border-radius: 100rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon-container {
        margin-right: 0.5rem;
    }

    span {
        margin-left: 0.5rem;
        margin-top: 0.25rem;
    }

    // mobile
    @media (max-width: ${ScreenSize.XS_MAX}) {
        margin: 6rem auto 1rem auto;
        padding: 0.2rem;
        border-radius: 100rem;

        span {
            display: block;
            margin-right: 0.5rem;
        }
    }

    // tablet
    @media (max-width: ${ScreenSize.MD_MAX}) and (min-width: ${ScreenSize.SM_MIN}) {
        margin: 1.8rem auto 1rem auto;
        padding: 0.3rem !important;
        border-radius: 50%;

        span {
            display: none;
        }
    }
`;

export const LogoutIconContainer = styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    padding: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
        width: 100%;
        height: 100%;
        color: #fff;
    }

    //tablet
    @media (max-width: ${ScreenSize.SM_MAX}) {
        width: 2.4rem;
        height: 2.4rem;
    }

    // mobile
    @media (max-width: ${ScreenSize.XS_MAX}) {
        width: 2rem;
        height: 2rem;
    }
`;

export const LogoutWarningContent = styled.div`
    color: ${props => props.theme.text};
`;