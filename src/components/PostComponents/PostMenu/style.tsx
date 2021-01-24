import styled from 'styled-components';

export const StyledPostMenu = styled.div`
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    background: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.primary};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 6rem;
    height: 6rem;

    &.hidden {
        display: none;
    }
`;