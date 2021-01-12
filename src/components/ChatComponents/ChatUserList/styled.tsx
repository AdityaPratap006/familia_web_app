import styled from 'styled-components';

export const StyledChatUserList = styled.div`
    overflow-x: hidden;
    overflow-y: scroll;
    min-height: 100%;

    &::-webkit-scrollbar {
        width: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.primary};
        width: 3px;
        border-radius: 100px;
    }

    &::-webkit-scrollbar-track {
        background-color: ${props => props.theme.paper};
    }
`;