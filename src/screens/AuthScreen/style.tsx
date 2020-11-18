import styled, { css } from 'styled-components';

const facebookColor = `#1778f2`;
const twitterColor = `#00acee`;

export const Container = styled.div`
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const authCardStyle = css`
    border: none;
    background-color: #fff;
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