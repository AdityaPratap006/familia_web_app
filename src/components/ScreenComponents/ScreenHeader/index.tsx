import React, { ReactNode, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { HeaderBarWrapper, HeaderBar, Title, MenuButton, GoBackButton, HeaderContent, SubTitle, RightElement } from './style';
import { SideDrawerContext } from '../../../contexts/sidedrawer.context';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import Avatar from '../../Avatar';
import LoadingSpinner from '../../LoadingSpinner';

interface ScreenHeaderProps {
    title?: string;
    subTitle?: ReactNode;
    withGoBackButton?: boolean;
    rightComponent?: ReactNode;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = (props) => {
    const sideDrawerCTX = useContext(SideDrawerContext);
    const history = useHistory();
    const { profile } = useContext(UserProfileContext);

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
                        {!profile && <LoadingSpinner small />}
                        {profile && <Avatar tiny alt={'profile_pic'} src={profile.image.url} />}
                    </MenuButton>
                )}
                <HeaderContent>
                    <Title>{props.title}</Title>
                    <SubTitle>{props.subTitle}</SubTitle>
                </HeaderContent>
                <RightElement>
                    {props.rightComponent}
                </RightElement>
            </HeaderBar>
        </HeaderBarWrapper>
    );
};

export default ScreenHeader;
