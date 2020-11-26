import React, { useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
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

const cache = new InMemoryCache({ resultCaching: true });

const App: React.FC = () => {
  const themeValue = useContext(CustomThemeContext);
  const auth = useContext(AuthContext);
  const isOnline = useNetworkStatus();

  useEffect(() => {
    console.log(auth.state.user);
  }, [auth.state.user]);

  if (auth.loading) {
    return <h1>checking auth state...</h1>;
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
        {authRoutes}
      </React.Fragment>
    );
  }

  const { state: themeState } = themeValue;
  const currentTheme = getTheme(themeState.theme, themeState.mode);

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT as string,
    headers: {
      authorization: auth.state.user.token,
    },
  });

  const apolloClient = new ApolloClient({
    link: httpLink,
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
      <Route exact path={`${NavigationRoutes.SETTINGS}`}>
        <SettingsScreen />
      </Route>
      <Redirect to={`${NavigationRoutes.HOME}`} />
    </Switch>
  );

  const protectedContent = (
    <StyledThemeProvider theme={currentTheme}>
      <SideDrawerProvider>
        <MainNavigation>
          {protectedRoutes}
        </MainNavigation>
      </SideDrawerProvider>
    </StyledThemeProvider>
  );

  return (
    <React.Fragment>
      <ApolloProvider client={apolloClient}>
        {protectedContent}
      </ApolloProvider>
    </React.Fragment>
  );
}

export default App;
