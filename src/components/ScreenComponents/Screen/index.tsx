import React, { ReactNode } from 'react';
import BottomAppBar from '../../../navigation/BottomAppBar';
import ScreenHeader from '../ScreenHeader';
import ScreenWrapper from '../ScreenWrapper';
import { ScreenContent } from './style';

interface ScreenProps {
    title?: string;
    subTitle?: ReactNode;
    rightComponent?: ReactNode;
    withGoBackButton?: boolean;
    withoutBottomAppBar?: boolean;
    withoutHeader?: boolean;
}

const Screen: React.FC<ScreenProps> = (props) => {
    return (
        <ScreenWrapper>
            {!props.withoutHeader && (
                <ScreenHeader
                    title={props.title}
                    subTitle={props.subTitle}
                    rightComponent={props.rightComponent}
                    withGoBackButton={props.withGoBackButton}
                />
            )}
            <ScreenContent withoutBottomAppBar={props.withoutBottomAppBar}>
                {props.children}
            </ScreenContent>
            {!props.withoutBottomAppBar && <BottomAppBar />}
        </ScreenWrapper>
    )
};

export default Screen;
