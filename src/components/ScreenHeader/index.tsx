import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { HeaderBarWrapper, HeaderBar, Title, MenuButton, GoBackButton } from './style';
import { SideDrawerContext } from '../../contexts/sidedrawer.context';
import { UserProfileContext } from '../../contexts/userProfile.context';
import Avatar from '../Avatar';
import LoadingSpinner from '../LoadingSpinner';

interface ScreenHeaderProps {
    title?: string;
    subTitle?: string;
    withGoBackButton?: boolean;
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
                <Title>{props.title}</Title>
            </HeaderBar>
        </HeaderBarWrapper>
    );
};

export default ScreenHeader;
