import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { SideDrawerProvider } from './contexts/sidedrawer.context';
import { CustomThemeContext } from './contexts/theme.context';
import MainNavigation from './navigation/MainNavigation';
import { NavigationRoutes } from './navigation/navRoutes';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import { getTheme } from './utils/theme';


const App: React.FC = () => {
  const themeValue = useContext(CustomThemeContext);

  const { state: themeState } = themeValue;
  const currentTheme = getTheme(themeState.theme, themeState.mode);

  const protectedRoutes = (
    <Switch>
      <Route exact path={`${NavigationRoutes.HOME}`}>
        <HomeScreen />
      </Route>
      <Redirect to={`${NavigationRoutes.HOME}`} />
    </Switch>
  );

  const authRoutes = (
    <Switch>
      <Route exact to={`${NavigationRoutes.AUTH}`}>
        <AuthScreen />
      </Route>
      <Redirect to={`${NavigationRoutes.AUTH}`} />
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
      {true && authRoutes}
      {false && protectedContent}
    </React.Fragment>
  );
}

export default App;
