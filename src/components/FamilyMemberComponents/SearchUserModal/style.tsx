import styled from 'styled-components';

export const SearchResultsGrid = styled.div`
    width: 100%;
    height: 30vh;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(1, 1fr);
    overflow-y: scroll;
`;

export const NoResultText = styled.h5`
    font-size: 1rem;
    color: ${props => props.theme.primary};
`;