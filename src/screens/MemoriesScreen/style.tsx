import styled from 'styled-components';

export const MemoriesScreenContent = styled.div`
    padding: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const Section = styled.section`
    width: 100%;
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const SectionTitle = styled.h3`
    padding: 0;
    margin: 1rem 0;
    color: ${props => props.theme.primary};
`;