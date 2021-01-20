import styled from 'styled-components';

export const MemoryType = styled.h4`
    color: ${props => props.theme.text};
    font-size: 1.1rem;
    margin: 0;
    padding: 0;
    text-transform: capitalize;
`;

export const MemoryIconContainer = styled.div`
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MemoryIconImage = styled.img`
    width: 6.8rem;
    height: 6.8rem;
`;

export const MemoryDate = styled.span`
    margin: 0;
    padding: 0;
    color: ${props => props.theme.primary};
    font-size: 1.2rem;
    font-weight: bold;
`;

export const MemoryContent = styled.p`
    margin: 1rem 0 0 0;
    padding: 0;
    color: ${props => props.theme.text};
    font-size: 1rem;
`;