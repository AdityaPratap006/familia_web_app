import React from 'react';
import Screen from '../../components/ScreenComponents/Screen';
import LoadingBouncers from '../../components/LoadingBouncers';

const AppLoadingScreen: React.FC = () => {
    return (
        <Screen withoutHeader>
            <div className='app-loading-screen'>
                <LoadingBouncers />
            </div>
        </Screen>
    );
};

export default AppLoadingScreen;
