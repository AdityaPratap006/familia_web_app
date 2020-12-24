import React from 'react';
import { InvitesScreenContent } from './style';
import Screen from '../../components/ScreenComponents/Screen';

const InvitesScreen: React.FC = () => {
    return (
        <Screen
            title="Invites"
            withGoBackButton
            withoutBottomAppBar
        >
            <InvitesScreenContent>
                Invite
            </InvitesScreenContent>
        </Screen>
    );
};

export default InvitesScreen;
