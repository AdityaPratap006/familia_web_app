import styled, { css } from 'styled-components';

export const SelectFamilyModalBody = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto, minmax(4rem, 1fr));
    gap: 1rem;
    max-height: 40vh;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.primary};
        border-radius: 100px;
    }
`;



export const SelectFamilyCardStyles = css`
    box-shadow: none;
`;

export const SelectFamilyCardTitle = styled.h4`
    margin: 0 0 0.5rem 0;
    padding: 0;
    color: ${props => props.theme.primary};
    font-size: 1.2rem;
`;

export const SelectFamilyCardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    span {
        font-size: 1rem;
        color: ${props => props.theme.text};
        margin: 0.5rem 0 1rem 0;
    }
`;

export const SelectFamilyCardMemberList = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    /* height: 4rem; */
`;

export const SelectFamilyCardFooter = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1rem;
`;