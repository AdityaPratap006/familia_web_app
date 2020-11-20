import React from 'react';
import { TitleText } from './style';

const SettingsHeader: React.FC = (props) => {
    return (
        <TitleText>
            {props.children}
        </TitleText>
    );
}

export default SettingsHeader;
