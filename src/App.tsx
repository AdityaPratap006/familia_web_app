import React, { useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { SideDrawerProvider } from './contexts/sidedrawer.context';
import { CustomThemeContext } from './contexts/theme.context';
import MainNavigation from './navigation/MainNavigation';
import { getTheme } from './utils/theme';


const App: React.FC = () => {
  const themeValue = useContext(CustomThemeContext);

  const { state: themeState } = themeValue;
  const currentTheme = getTheme(themeState.theme, themeState.mode);

  return (
    <React.Fragment>
      <StyledThemeProvider theme={currentTheme}>
        <SideDrawerProvider>
          <MainNavigation>
            <h1>Home Screen</h1>
          </MainNavigation>
        </SideDrawerProvider>
      </StyledThemeProvider>
    </React.Fragment>
  );
}

export default App;
