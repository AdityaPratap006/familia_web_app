import styled, { css } from 'styled-components';

export const SelectFamilyModalBody = styled.div`
    position: relative;
    width: 100%;
    /* margin: 0 auto 0 auto; */
`;

export const SelectFamilyCardStyles = css`
    box-shadow: none;
    width: 100%;
    margin: 0 0.25rem;
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