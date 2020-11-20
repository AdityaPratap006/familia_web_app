import React, { useContext, useState } from 'react';
import { Container, SwitchSelector, Thumb, IndicatorText } from './style';
import Card from '../Card';
import { ThemeActionType, MODE } from '../../hooks/theme.hook';
import { CustomThemeContext } from '../../contexts/theme.context';
import SettingsHeader from '../SettingsHeader';


const BackgroundSettings = () => {
    const theme = useContext(CustomThemeContext);
    const mode = theme.state.mode;
    const [isOn, setIsOn] = useState(mode === MODE.DARK);

    const toggleSwitchHandler = () => {
        setIsOn(prevValue => !prevValue);
        if (!isOn) {
            theme.dispatch({
                type: ThemeActionType.SET_MODE,
                payload: MODE.DARK,
            });
        } else {
            theme.dispatch({
                type: ThemeActionType.SET_MODE,
                payload: MODE.LIGHT,
            });
        }
    }

    return (
        <Card>
            <SettingsHeader>Dark Mode</SettingsHeader>
            <Container>
                <SwitchSelector
                    className={`${isOn && 'on'}`}
                    onClick={toggleSwitchHandler}
                >
                    <Thumb isOn={isOn} />
                </SwitchSelector>
                <IndicatorText>
                    {isOn ? `ON` : `OFF`}
                </IndicatorText>
            </Container>
        </Card>
    );
};

export default BackgroundSettings;
