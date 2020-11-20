import React, { useContext } from 'react';
import { MdDone } from 'react-icons/md';
import { Container, ColorSelector, ColorCircle, ColorLabel } from './style';
import Card from '../Card';
import SettingsHeader from '../SettingsHeader';
import { getPrimary } from '../../utils/theme';
import { CustomThemeContext } from '../../contexts/theme.context';
import { THEME, ThemeActionType } from '../../hooks/theme.hook';

const colorOptions = [
    {
        theme: THEME.PINK,
        label: `Jaipur Pink`,
    },
    {
        theme: THEME.BLUE,
        label: `California Blue`,
    },
    {
        theme: THEME.YELLOW,
        label: `Mexican Yellow`,
    },
    {
        theme: THEME.PURPLE,
        label: `Thai Purple`,
    },
    {
        theme: THEME.GREEN,
        label: `Singapore Green`,
    },
    {
        theme: THEME.ORANGE,
        label: `Nagpur Orange`,
    },
];

const PrimaryColorSettings = () => {
    const { state: themeState, dispatch: themeDispatch } = useContext(CustomThemeContext);

    const selectThemeHandler = (theme: THEME) => {
        themeDispatch({
            type: ThemeActionType.SET_THEME,
            payload: theme,
        });
    }

    const renderedOptions = colorOptions.map(option => {
        const displayTheme = getPrimary(option.theme);
        const currentTheme = getPrimary(themeState.theme);

        const displayColor = displayTheme.primary;
        const isSelected = currentTheme.primary === displayColor;

        return (
            <ColorSelector
                key={option.label}
                className={`${isSelected && 'selected'}`}
                onClick={() => selectThemeHandler(option.theme)}
            >
                <ColorCircle displayColor={`${displayColor}`}>
                    {isSelected && <MdDone className="selected-icon" />}
                </ColorCircle>
                <ColorLabel displayColor={`${displayColor}`}>
                    {option.label}
                </ColorLabel>
            </ColorSelector>
        );
    });

    return (
        <Card>
            <SettingsHeader>Primary Color</SettingsHeader>
            <Container>
                {renderedOptions}
            </Container>
        </Card>
    );
};

export default PrimaryColorSettings;
