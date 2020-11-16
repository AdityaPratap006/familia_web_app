import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MdAccountCircle, MdArrowBack } from 'react-icons/md';
import { HeaderBarWrapper, HeaderBar, Title, MenuButton, GoBackButton } from './style';
import { SideDrawerContext } from '../../contexts/sidedrawer.context';

interface ScreenHeaderProps {
    title?: string;
    subTitle?: string;
    withGoBackButton?: boolean;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = (props) => {
    const sideDrawerCTX = useContext(SideDrawerContext);
    const history = useHistory();

    const goBackHandler = () => {
        history.goBack();
    }

    return (
        <HeaderBarWrapper>
            <HeaderBar>
                {props.withGoBackButton && (
                    <GoBackButton onClick={goBackHandler}>
                        <MdArrowBack className="icon" />
                    </GoBackButton>
                )}
                {!props.withGoBackButton && (
                    <MenuButton onClick={sideDrawerCTX.open}>
                        <MdAccountCircle className="icon" />
                    </MenuButton>
                )}
                <Title>{props.title}</Title>
            </HeaderBar>
        </HeaderBarWrapper>
    );
};

export default ScreenHeader;
