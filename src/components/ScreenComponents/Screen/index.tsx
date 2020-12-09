import React, { ReactNode } from 'react';
import ScreenHeader from '../ScreenHeader';
import ScreenWrapper from '../ScreenWrapper';
import { ScreenContent } from './style';

interface ScreenProps {
    title?: string;
    subTitle?: ReactNode;
    rightComponent?: ReactNode;
    withGoBackButton?: boolean;
    stackedUpScreen?: boolean;
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
            <ScreenContent stackedUpScreen={props.stackedUpScreen}>
                {props.children}
            </ScreenContent>
        </ScreenWrapper>
    )
};

export default Screen;
