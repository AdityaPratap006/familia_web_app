import React, { useContext } from 'react';
import { Switch, Route, Link, useRouteMatch, Redirect, useLocation } from 'react-router-dom';
import { NavigationRoutes } from '../../navigation/navRoutes';
import Screen from '../../components/ScreenComponents/Screen';
import CurrentFamilyIndicator from '../../components/FamilyComponents/CurrentFamilyIndicator';
import { FamilyContext } from '../../contexts/family.context';
import { ChatScreenContent, LobbyContent, LobbyUserListSection, LobbyWelcomeSection, MainChatContent, MainChatUserListSection, MainChatWindowSection } from './style';

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
                                <Link to={`${routeMatch.url}/room`}>Go To Room</Link>
                            </LobbyUserListSection>
                            <LobbyWelcomeSection>
                                <h1 >Welcome To Chat</h1>
                            </LobbyWelcomeSection>
                        </LobbyContent>
                    </Route>
                    <Route exact path={`${routeMatch.path}/room`}>
                        <MainChatContent>
                            <MainChatUserListSection>
                                <Link to={`${routeMatch.url}/room`} >Go To Room</Link>
                            </MainChatUserListSection>
                            <MainChatWindowSection>
                                <Link to={`${routeMatch.url}`} >Go Back</Link>
                                <h2 >Room</h2>
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
