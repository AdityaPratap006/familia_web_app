import React from 'react';
import Card from '../../Card';
import { WelcomeCardCSS, WelcomeWindowContainer } from './style';

const ChatWelcome: React.FC = () => {
    return (
        <WelcomeWindowContainer>
            <Card addcss={WelcomeCardCSS}>
                <h1>Welcome To Chat</h1>
            </Card>
        </WelcomeWindowContainer>
    );
};

export default ChatWelcome;
