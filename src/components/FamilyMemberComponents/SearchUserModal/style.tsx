import styled from 'styled-components';

export const SearchResultsGrid = styled.div`
    margin-top: 1rem;
    padding: 0.5rem;
    width: 100%;
    height: 30vh;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(1, 1fr);
    overflow-y: scroll;
`;

export const StatusText = styled.h5`
    font-size: 1rem;
    margin: 0.5rem;
    color: ${props => props.theme.primary};
`;