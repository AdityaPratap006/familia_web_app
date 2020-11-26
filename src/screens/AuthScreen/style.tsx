import styled, { css } from 'styled-components';
import { pinkTheme } from '../../utils/theme';

const facebookColor = `#1778f2`;
const twitterColor = `#00acee`;

export const Container = styled.div`
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.background || '#fff'};
`;

export const authCardStyle = css`
    border: none;
    background-color: ${({ theme }) => theme.paper || '#fff'};
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: 'space-around';
    align-items: center;
    max-width:  90vw;
`;

export const btnStyle = css`
    border-radius: 100rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 1rem 0;

    &:hover, &:focus {
        span {
            color: #fff !important;
        }
    }

    .icon {
        width: 100%;
        height: 100%;
    }

    .icon.facebook {
        color: ${facebookColor};
    }

    .icon.twitter {
        color: ${twitterColor};
    }

    span {
        margin-left: 0.5rem;
        font-weight: 600;
    }

    span.facebook {
        color: ${facebookColor};
    }

    span.twitter {
        color: ${twitterColor};
    }
`;

export const IconContainer = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.4rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
`;

export const MergeAccountContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const MergeAccountTitle = styled.h3`
    font-size: 1.4rem;
    color: ${pinkTheme.primary};
    margin: 0.5rem 0;
    padding: 0;
`;

export const MergeAccountBody = styled.p`
    font-size: 1rem;
    color: #000;
`;

export const MergeAccountFooter = styled.footer`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;

    button {
        background-color: ${pinkTheme.primary};

        &:hover {
            background-color: ${pinkTheme.primaryLight};
        }
    }

    button.button--inverse {
        color: ${pinkTheme.primary};
        border-color: ${pinkTheme.primary};

        &:hover {
            color: '#fff';
            background-color: ${pinkTheme.primaryLight};
        }
    }
`;