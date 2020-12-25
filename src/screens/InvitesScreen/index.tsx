import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { InvitesLodingContainer, InvitesScreenContent, InvitesTab, InvitesTabsHeader } from './style';
import Screen from '../../components/ScreenComponents/Screen';
import { GET_INVITES_RECEIVED_BY_USER, GET_INVITES_SENT_BY_USER } from '../../graphql/invite/queries';
import { IInvite } from '../../models/invite';
import InviteList from '../../components/InviteComponents/InviteList';
import LoadingBouncers from '../../components/LoadingBouncers';

enum InviteTab {
    SENT = 'SENT',
    RECEIVED = 'RECEIVED',
}

const InvitesScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<InviteTab>(InviteTab.RECEIVED);
    const receviedInvitesQuery = useQuery<{ getInvitesReceivedByUser: IInvite[] }>(GET_INVITES_RECEIVED_BY_USER);
    const sentInvitesQuery = useQuery<{ getInvitesSentByUser: IInvite[] }>(GET_INVITES_SENT_BY_USER);


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
                {((activeTab === InviteTab.RECEIVED && receviedInvitesQuery.loading) || (activeTab === InviteTab.SENT && sentInvitesQuery.loading)) && (
                    <InvitesLodingContainer>
                        <LoadingBouncers />
                    </InvitesLodingContainer>
                )}
                {activeTab === InviteTab.RECEIVED && receviedInvitesQuery.data && (
                    <InviteList
                        invites={receviedInvitesQuery.data.getInvitesReceivedByUser}
                        type='received'
                    />
                )}
                {activeTab === InviteTab.SENT && sentInvitesQuery.data && (
                    <InviteList
                        invites={sentInvitesQuery.data.getInvitesSentByUser}
                        type='sent'
                    />
                )}
            </InvitesScreenContent>
        </Screen>
    );
};

export default InvitesScreen;
