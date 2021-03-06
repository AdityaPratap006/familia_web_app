import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, split, from } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { AuthContext } from './contexts/auth.context';
import { SideDrawerProvider } from './contexts/sidedrawer.context';
import { CustomThemeContext } from './contexts/theme.context';
import MainNavigation from './navigation/MainNavigation';
import { NavigationRoutes } from './navigation/navRoutes';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import { getTheme } from './utils/theme';
import { useNetworkStatus } from './hooks/networkStatus.hook';
import UserProfileProvider from './contexts/userProfile.context';
import FamilyProvider from './contexts/family.context';
import AppLoadingScreen from './screens/AppLoadingScreen';
import MemoriesScreen from './screens/MemoriesScreen';
import InvitesScreen from './screens/InvitesScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatsScreen from './screens/ChatsScreen';
import { ChatProvider } from './contexts/chat.context';
import LocateScreen from './screens/LocateScreen';
import PWAInstallPrompt from './components/PWAInstallPrompt';

const cache = new InMemoryCache({ resultCaching: true });

const App: React.FC = () => {
  const themeValue = useContext(CustomThemeContext);
  const auth = useContext(AuthContext);
  const isOnline = useNetworkStatus();

  const { state: themeState } = themeValue;
  const currentTheme = getTheme(themeState.theme, themeState.mode);

  if (auth.loading) {
    return (
      <StyledThemeProvider theme={currentTheme}>
        <AppLoadingScreen />
      </StyledThemeProvider>

    );
  }

  const authRoutes = (
    <Switch>
      <Route exact to={`${NavigationRoutes.AUTH}`}>
        <AuthScreen />
      </Route>
      <Redirect to={`${NavigationRoutes.AUTH}`} />
    </Switch>
  );

  if (!auth.state.user) {
    return (
      <React.Fragment>
        <StyledThemeProvider theme={currentTheme}>
          <PWAInstallPrompt />
          {authRoutes}
        </StyledThemeProvider>
      </React.Fragment>
    );
  }

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT as string,
    headers: {
      authorization: auth.state.user.token,
    },
  });

  const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_GRAPHQL_WEBSOCKET_URL as string,
    options: {
      reconnect: true,
      connectionParams: {
        authorization: auth.state.user.token,
      },
    },
  });

  const splitLink = split(({ query }) => {
    const definition = getMainDefinition(query);
    return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
  }, wsLink, httpLink);

  const link = from([
    splitLink,
  ]);

  const apolloClient = new ApolloClient({
    link: link,
    connectToDevTools: true,
    cache: cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: isOnline ? "network-only" : "cache-only",
        errorPolicy: "all",
      },
      mutate: {
        fetchPolicy: "no-cache",
      },
    },
  });

  const protectedRoutes = (
    <Switch>
      <Route exact path={`${NavigationRoutes.HOME}`}>
        <HomeScreen />
      </Route>
      <Route path={`${NavigationRoutes.CHATS}`}>
        <ChatProvider>
          <ChatsScreen />
        </ChatProvider>
      </Route>
      <Route exact path={`${NavigationRoutes.LOCATE}`} >
        <LocateScreen />
      </Route>
      <Route exact path={`${NavigationRoutes.MEMORIES}`}>
        <MemoriesScreen />
      </Route>
      <Route exact path={`${NavigationRoutes.INVITES}`}>
        <InvitesScreen />
      </Route>
      <Route exact path={`${NavigationRoutes.PROFILE}`}>
        <ProfileScreen />
      </Route>
      <Route exact path={`${NavigationRoutes.SETTINGS}`}>
        <SettingsScreen />
      </Route>
      <Redirect to={`${NavigationRoutes.HOME}`} />
    </Switch>
  );

  const protectedContent = (
    <SideDrawerProvider>
      <MainNavigation>
        {protectedRoutes}
      </MainNavigation>
    </SideDrawerProvider>
  );


  return (
    <React.Fragment>
      <StyledThemeProvider theme={currentTheme}>
        <PWAInstallPrompt />
        <ApolloProvider client={apolloClient}>
          <UserProfileProvider>
            <FamilyProvider>
              {protectedContent}
            </FamilyProvider>
          </UserProfileProvider>
        </ApolloProvider>
      </StyledThemeProvider>
    </React.Fragment>
  );
}

export default App;
