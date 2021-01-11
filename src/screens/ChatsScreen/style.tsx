import styled from 'styled-components';
import { ScreenSize } from '../../utils/screenSizes';

export const ChatScreenContent = styled.div`
    width: 100%;
    min-height: 70vh;
`;

export const LobbyContent = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: 'lobbyUserList welcome welcome welcome';

    @media (max-width: ${ScreenSize.SM_MAX}) {
        grid-template-areas: 'lobbyUserList lobbyUserList lobbyUserList lobbyUserList';
    }
`;

export const LobbyUserListSection = styled.div`
    grid-area: lobbyUserList;
    width: 100%;
`;

export const LobbyWelcomeSection = styled.div`
    grid-area: welcome;
    width: 100%;
    background-color: #00e1ff;

    @media (max-width: ${ScreenSize.SM_MAX}) {
        display: none;
    }
`;

export const MainChatContent = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: 'mainChatUserList chat chat chat';

    @media (max-width: ${ScreenSize.SM_MAX}) {
        grid-template-areas: 'chat chat chat chat';
    }
`;

export const MainChatUserListSection = styled.div`
    grid-area: mainChatUserList;
    width: 100%;

    @media (max-width: ${ScreenSize.SM_MAX}) {
        display: none;
    }
`;

export const MainChatWindowSection = styled.div`
    grid-area: chat;
    width: 100%;
    background-color:  #cc00ff;
`;