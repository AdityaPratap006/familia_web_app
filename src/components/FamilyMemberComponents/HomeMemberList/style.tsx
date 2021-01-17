import styled, { css } from  'styled-components';

export const MemberListContainerCSS = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const StyledMemberListTitle = styled.h4`
    padding: 0;
    margin: 0 0 1rem 0;
    font-size: 1.4rem;
    color: ${props => props.theme.text};
`;

export const StyledMemberList = styled.div`
    width: 100%;
    height: calc(100% - 3rem);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-y: scroll;
    overflow-x: hidden;
    
    &::-webkit-scrollbar {
        width: 3px;
    }

    &::-webkit-scrollbar-track {
        background-color: ${props => props.theme.background};
    }

    &::-webkit-scrollbar-thumb {
        width: 3px;
        background-color: ${props => props.theme.primary};
    }
`;

export const WarningMessage = styled.p`
    font-size: 1.2rem;
    color: ${props => props.theme.text};
`;

export const StyledMemberCard = styled.div`
    width: 100%;
    margin: 0.5rem 0;
    padding: 1rem;
    background: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.defaultBorderColor};
    border-radius: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const StyledMemberCardAvatarContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
`;

export const StyledMemberCardContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const MemberName = styled.span`
    font-size: 1rem;
    color: ${props => props.theme.text};
    margin: 0 0 0.5rem 0;
`;

export const MemberEmail = styled.span`
    font-size: 0.75rem;
    font-weight: bold;
    color: ${props => props.theme.primary};
    margin: 0.5rem 0 0 0;
`;
 