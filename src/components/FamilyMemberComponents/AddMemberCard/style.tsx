import styled from 'styled-components';

export const StyledCard = styled.div`
    border: 2px dashed ${props => props.theme.primary};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const StyledIconContainer = styled.div`
    .icon {
        width: 3rem;
        height: 3rem;
        color:${props => props.theme.primary};
        margin: 0.25rem;
    }
`;

export const StyledText = styled.p`
    font-size: 1rem;
    margin: 0.5rem 0 1rem 0;
    color:${props => props.theme.primary}; 
`;