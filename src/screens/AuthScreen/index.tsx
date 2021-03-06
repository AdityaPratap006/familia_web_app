import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { SiFacebook, SiTwitter } from 'react-icons/si';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Container, authCardStyle, btnStyle, IconContainer, AuthenticatingText } from './style';
import { useLogin } from './service';
import LoadingBouncers from '../../components/LoadingBouncers';

const AuthScreen = () => {
    const {
        loading,
        loginWithGoogleHandler,
        loginWithFacebookHandler,
        loginWithTwitterHandler,
    } = useLogin();

    useEffect(() => {
        document.title = `Login | Familia`;
    }, []);

    const authCardContent = (
        <React.Fragment>
            <Button inverse addcss={btnStyle} onClick={loginWithGoogleHandler}>
                <IconContainer>
                    <FcGoogle className='icon' />
                </IconContainer>
                <span>Continue with Google</span>
            </Button>
            <Button inverse addcss={btnStyle} onClick={loginWithFacebookHandler}>
                <IconContainer>
                    <SiFacebook className='icon facebook' />
                </IconContainer>
                <span className='facebook'>Continue with Facebook</span>
            </Button>
            <Button inverse addcss={btnStyle} onClick={loginWithTwitterHandler}>
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
                {loading && <AuthenticatingText>Authenticating...</AuthenticatingText>}
                {loading && <LoadingBouncers medium />}
            </Card>
        </Container>
    );
};

export default AuthScreen;
