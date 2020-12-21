import styled from 'styled-components';

export const StyledBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const AvatarContainer = styled.div`
     
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    
`;

export const StyledContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const StyledName = styled.h4`
    padding: 0;
    margin: 0.5rem 0;
    color: ${props => props.theme.text};
`;

export const StyledEmail = styled.small`
    padding: 0;
    margin: 0.2rem 0 0.5rem 0;
    font-size: 0.8rem;
    letter-spacing: 0.05rem;
    color: ${props => props.theme.primary};
`;

export const StyledAbout = styled.p`
    padding: 0;
    margin-top: 0.5rem;
    color: ${props => props.theme.text};
`;

export const StyledActionContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;