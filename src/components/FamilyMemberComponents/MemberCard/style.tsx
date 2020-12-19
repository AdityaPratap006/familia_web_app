import styled from 'styled-components';

export const StyledBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`; 

export const StyledName = styled.h4`
    padding: 0;
    margin: 0.5rem 0;
    color: ${props => props.theme.primary};
`;

export const StyledAbout = styled.p`
    padding: 0;
    margin-top: 0.5rem;
    color: ${props => props.theme.text};
`;