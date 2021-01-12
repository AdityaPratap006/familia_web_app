import React, { useContext } from 'react';
import { Switch, Route, useRouteMatch, Redirect, useLocation } from 'react-router-dom';
import { NavigationRoutes } from '../../navigation/navRoutes';
import Screen from '../../components/ScreenComponents/Screen';
import CurrentFamilyIndicator from '../../components/FamilyComponents/CurrentFamilyIndicator';
import { FamilyContext } from '../../contexts/family.context';
import { ChatScreenContent, LobbyContent, LobbyUserListSection, LobbyWelcomeSection, MainChatContent, MainChatUserListSection, MainChatWindowSection } from './style';
import ChatUserList from '../../components/ChatComponents/ChatUserList';
import ChatWindow from '../../components/ChatComponents/ChatWindow';
import ChatWelcome from '../../components/ChatComponents/ChatWelcome';

const ChatsScreen: React.FC = () => {
    const { currentFamily } = useContext(FamilyContext);
    const routeMatch = useRouteMatch();
    const browserLocation = useLocation();

    return (
        <Screen
            title="Chats"
            subTitle={currentFamily?.name}
            rightComponent={<CurrentFamilyIndicator />}
            withoutBottomAppBar={browserLocation.pathname !== `${NavigationRoutes.CHATS}`}
        >
            <ChatScreenContent>
                <Switch>
                    <Route exact path={`${routeMatch.path}`}>
                        <LobbyContent>
                            <LobbyUserListSection>
                                <ChatUserList />
                            </LobbyUserListSection>
                            <LobbyWelcomeSection>
                                <ChatWelcome />
                            </LobbyWelcomeSection>
                        </LobbyContent>
                    </Route>
                    <Route exact path={`${routeMatch.path}/:roomId`}>
                        <MainChatContent>
                            <MainChatUserListSection>
                                <ChatUserList />
                            </MainChatUserListSection>
                            <MainChatWindowSection>
                                <ChatWindow />
                            </MainChatWindowSection>
                        </MainChatContent>
                    </Route>
                    <Redirect to={`${routeMatch.path}`} />
                </Switch>
            </ChatScreenContent>
        </Screen>
    );
};

export default ChatsScreen;
