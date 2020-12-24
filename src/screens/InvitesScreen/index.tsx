import React, { useState } from 'react';
import { InvitesGrid, InvitesScreenContent, InvitesTab, InvitesTabsHeader } from './style';
import Screen from '../../components/ScreenComponents/Screen';
import Card from '../../components/Card';

enum InviteTab {
    SENT = 'SENT',
    RECEIVED = 'RECEIVED',
}

const InvitesScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<InviteTab>(InviteTab.RECEIVED);

    const handleTabChange = (tab: InviteTab) => {
        setActiveTab(tab);
    }

    return (
        <Screen
            title="Invites"
            withGoBackButton
            withoutBottomAppBar
        >
            <InvitesScreenContent>
                <InvitesTabsHeader>
                    <InvitesTab
                        type="button"
                        className={`${activeTab === InviteTab.RECEIVED && 'active'}`}
                        onClick={() => handleTabChange(InviteTab.RECEIVED)}
                    >
                        Received
                    </InvitesTab>
                    <InvitesTab
                        type="button"
                        className={`${activeTab === InviteTab.SENT && 'active'}`}
                        onClick={() => handleTabChange(InviteTab.SENT)}
                    >
                        Sent
                    </InvitesTab>
                </InvitesTabsHeader>
                <InvitesGrid>
                    <Card>
                        afafaa
                        afafsef
                        aefaesfaef
                        aefaesfes
                    </Card>
                </InvitesGrid>
            </InvitesScreenContent>
        </Screen>
    );
};

export default InvitesScreen;
