import React, { createContext } from 'react';
import { useThemeAndMode, ThemeState, ThemeAction, INITIAL_STATE } from '../hooks/theme.hook';

interface IThemeContext {
    state: ThemeState;
    dispatch: React.Dispatch<ThemeAction>;
}

export const CustomThemeContext = createContext<IThemeContext>({
    state: INITIAL_STATE,
    dispatch: () => null,
});

interface CustomThemeProviderProps {
    children?: React.ReactNode;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = (props) => {
    const themeValue = useThemeAndMode();

    return (
        <CustomThemeContext.Provider value={themeValue}>
            {props.children}
        </CustomThemeContext.Provider>
    );
}