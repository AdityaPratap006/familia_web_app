import styled from 'styled-components';

export const SearchResultsGrid = styled.div`
    margin-top: 1rem;
    padding: 0.5rem 0;
    width: 100%;
    height: 30vh;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(1, minmax(150px, 1fr));
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

export const StatusText = styled.h5`
    font-size: 1rem;
    margin: 0.5rem;
    color: ${props => props.theme.primary};
`;