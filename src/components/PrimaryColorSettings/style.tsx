import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(auto, minmax(5rem, 1fr));

    @media (max-width: 1100px) {
        grid-template-columns: 1fr;
    }
`;

export const ColorSelector = styled.div`
    width: 100%;
    padding: 0.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid ${props => props.theme.defaultBorderColor};
    border-radius: 10px;
    cursor: pointer;

    &.selected {
        border: 2px solid ${props => props.theme.primary};
    }
`;

interface ColorCircleProps {
    displayColor: string;
}

export const ColorCircle = styled.div<ColorCircleProps>`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: ${props => props.displayColor};
    display: flex;
    justify-content: center;
    align-items: center;

    .selected-icon {
        width: 2rem;
        height: 2rem;
        color: white;
    }
`;

interface ColorLabelProps {
    displayColor: string;
}

export const ColorLabel = styled.p<ColorLabelProps>`
    font-size: 1rem;
    font-weight: 600;
    padding: 0 0 0 1rem;
    color: ${props => props.displayColor};
`;

