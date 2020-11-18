import { MODE, THEME } from '../hooks/theme.hook';

interface ThemeColors {
    primary?: string;
    primaryLight?: string;
    primaryShadow?: string;
}

interface ModeColors {
    background?: string;
    text?: string;
    paper?: string;
    defaultBorderColor?: string;
    appBarBackground?: string;
}

export type ITheme = ThemeColors & ModeColors;

export const lightMode: ModeColors = {
    background: '#fff',
    text: '#141d26',
    paper: '#fafafa',
    defaultBorderColor: `rgb(159,159,159, 0.5)`,
    appBarBackground: `#fff`,
};

export const darkMode: ModeColors = {
    background: '#000',
    text: '#fff',
    paper: '#111',
    defaultBorderColor: `rgba(210, 210, 210, 0.2)`,
    appBarBackground: `#000`,
}

export const purpleTheme: ThemeColors = {
    primary: '#ab47bc',
    primaryLight: '#ba68c8',
    primaryShadow: 'rgba(171,71,188, 0.2)',
};

export const blueTheme: ThemeColors = {
    primary: '#2196f3',
    primaryLight: '#42a5f5',
    primaryShadow: 'rgba(33,150,243, 0.2)',
};

export const pinkTheme: ThemeColors = {
    primary: '#fc045c',
    primaryLight: '	#FC367B',
    primaryShadow: 'rgba(252, 4, 91, 0.2)',
};

export const greenTheme: ThemeColors = {
    primary: '#17BF63',
    primaryLight: '#17BF63',
    primaryShadow: 'rgba(23,191,99, 0.2)',
};

export const yellowTheme: ThemeColors = {
    primary: '#ffb300',
    primaryLight: '#ffc107',
    primaryShadow: 'rgba(255,179,0, 0.2)',
};

export const orangeTheme: ThemeColors = {
    primary: '#fb8c00',
    primaryLight: '#ff9800',
    primaryShadow: 'rgba(251,140,0, 0.2)',
};

export const getPrimary = (theme: THEME): ThemeColors => {
    switch (theme) {
        case THEME.PURPLE:
            return purpleTheme;
        case THEME.BLUE:
            return blueTheme;
        case THEME.PINK:
            return pinkTheme;
        case THEME.GREEN:
            return greenTheme;
        case THEME.YELLOW:
            return yellowTheme;
        case THEME.ORANGE:
            return orangeTheme;
        default:
            return blueTheme;
    }
}


export const getTheme = (theme: THEME, mode: MODE): ITheme => {
    if (mode === MODE.DARK) {
        return {
            ...getPrimary(theme),
            ...darkMode,
        };
    } else if (mode === MODE.LIGHT) {
        return {
            ...getPrimary(theme),
            ...lightMode,
        };
    }

    return {
        ...getPrimary(theme),
        ...lightMode,
    };
}


// export const lightTheme: ITheme = {
//     primary: '#ab47bc',
//     primaryLight: '#ba68c8',
//     background: '#fff',
//     primaryShadow: 'rgb(171,71,188, 0.2)',
//     text: '#141d26',
//     paper: '#fafafa',
//     defaultBorderColor: `rgb(159,159,159, 0.5)`,
// };

// export const darkTheme: ITheme = {
//     primary: '#ab47bc',
//     primaryLight: '#ba68c8',
//     background: '#000',
//     primaryShadow: 'rgb(171,71,188, 0.2)',
//     text: '#fff',
//     paper: '#111',
//     defaultBorderColor: `rgba(210, 210, 210, 0.2)`,
// };