import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { InvitesGrid, InvitesScreenContent, InvitesTab, InvitesTabsHeader } from './style';
import Screen from '../../components/ScreenComponents/Screen';
import Card from '../../components/Card';
import { GET_INVITES_RECEIVED_BY_USER } from '../../graphql/invite/queries';
import { IInvite } from '../../models/invite';

enum InviteTab {
    SENT = 'SENT',
    RECEIVED = 'RECEIVED',
}

const InvitesScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<InviteTab>(InviteTab.RECEIVED);
    const receviedInvites = useQuery<{ getInvitesReceivedByUser: IInvite[] }>(GET_INVITES_RECEIVED_BY_USER);

    useEffect(() => {
        if (receviedInvites.data) {
            console.log(receviedInvites.data);
        }
    }, [receviedInvites.data]);

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
