import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const SwitchSelector = styled.button`
    outline: none;
    width: calc(7rem + 8px);
    height: calc(2.5rem + 12px);
    padding: 4px;
    border-radius: 200px;
    background-color: lightgray;
    border: 2px solid ${props => props.theme.defaultBorderColor};
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    transition: 0.5s ease;
    -webkit-tap-highlight-color: transparent;
    
    &.on {
        background-color: transparent;
        padding-left: calc(7rem - 2.5rem);
        border-color: ${props => props.theme.primary};
    }

    &:hover {
        cursor: pointer;
    } 
`;

interface ThumbProps {
    isOn: boolean;
}

export const Thumb = styled.div<ThumbProps>`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 2px solid ${props => props.theme.primary};
    background-color: ${props => props.isOn ? props.theme.primary : '#fff'};
    transition: 0.5s ease;
`;

export const IndicatorText = styled.span`
    font-size: 2rem;
    font-weight: bold;
    width: 6rem;
    padding: 0.5rem 1rem;
    color: ${props => props.theme.primary};
`;