import styled from 'styled-components';

export const Indicator = styled.div`
    border-radius: 200rem;
    background-color: transparent;
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
`;

export const IndicatorText = styled.span`
    font-size: 1.2rem;
    padding: 0.2rem 0 0 0;
    margin: 0 0.2rem;
    color: ${props => props.theme.primary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const IconContainer = styled.div`

    .icon {
        width: 1.8rem;
        height: 1.8rem;
        color: ${props => props.theme.primary};

        &:hover {
            color: ${props => props.theme.primaryLight};
        }
    }
`;