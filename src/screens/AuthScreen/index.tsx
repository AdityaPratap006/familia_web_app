import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { SiFacebook, SiTwitter } from 'react-icons/si';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Container, authCardStyle, btnStyle, IconContainer } from './style';
import { useLogin } from './service';

const AuthScreen = () => {
    const {
        loading,
        loginWithGoogleHandler,
        loginWithFacebookHandler,
    } = useLogin();

    const authCardContent = (
        <React.Fragment>
            <Button authBtn addcss={btnStyle} onClick={loginWithGoogleHandler}>
                <IconContainer>
                    <FcGoogle className='icon' />
                </IconContainer>
                <span>Continue with Google</span>
            </Button>
            <Button authBtn addcss={btnStyle} onClick={loginWithFacebookHandler}>
                <IconContainer>
                    <SiFacebook className='icon facebook' />
                </IconContainer>
                <span className='facebook'>Continue with Facebook</span>
            </Button>
            <Button authBtn addcss={btnStyle}>
                <IconContainer>
                    <SiTwitter className='icon twitter' />
                </IconContainer>
                <span className='twitter'>Continue with Twitter</span>
            </Button>
        </React.Fragment>
    )

    return (
        <Container>
            <Card addcss={authCardStyle}>
                {!loading && authCardContent}
                {loading && `...loading`}
            </Card>
        </Container>
    );
};

export default AuthScreen;
