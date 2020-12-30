import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { InvitesLoadingContainer, InvitesScreenContent, InvitesTab, InvitesTabsHeader, NoInvitesText } from './style';
import Screen from '../../components/ScreenComponents/Screen';
import { GET_INVITES_RECEIVED_BY_USER, GET_INVITES_SENT_BY_USER } from '../../graphql/invite/queries';
import { IInvite } from '../../models/invite';
import InviteList from '../../components/InviteComponents/InviteList';
import LoadingBouncers from '../../components/LoadingBouncers';
import { INVITE_CREATED_SUBSCRIPTION } from '../../graphql/invite/subscriptions';

enum InviteTab {
    SENT = 'SENT',
    RECEIVED = 'RECEIVED',
}

interface IInviteCreatedResult {
    inviteCreated: IInvite;
}

const InvitesScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<InviteTab>(InviteTab.RECEIVED);
    const receivedInvitesQuery = useQuery<{ getInvitesReceivedByUser: IInvite[] }>(GET_INVITES_RECEIVED_BY_USER);
    const sentInvitesQuery = useQuery<{ getInvitesSentByUser: IInvite[] }>(GET_INVITES_SENT_BY_USER);

    const { subscribeToMore: subscribeToMoreReceivedInvites } = receivedInvitesQuery;
    useEffect(() => {
        const unsubscribe = subscribeToMoreReceivedInvites<IInviteCreatedResult>({
            document: INVITE_CREATED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                console.log(prev);
                const existingInvites = prev.getInvitesReceivedByUser;
                const newInvite = subscriptionData.data.inviteCreated;

                return {
                    getInvitesReceivedByUser: [newInvite, ...existingInvites],
                };
            }
        });

        return () => {
            unsubscribe();
        }
    }, [subscribeToMoreReceivedInvites]);

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
                {((activeTab === InviteTab.RECEIVED && receivedInvitesQuery.loading) || (activeTab === InviteTab.SENT && sentInvitesQuery.loading)) && (
                    <InvitesLoadingContainer>
                        <LoadingBouncers />
                    </InvitesLoadingContainer>
                )}
                {activeTab === InviteTab.RECEIVED && receivedInvitesQuery.data && receivedInvitesQuery.data.getInvitesReceivedByUser.length === 0 && (
                    <NoInvitesText>
                        No Invites
                    </NoInvitesText>
                )}
                {activeTab === InviteTab.SENT && sentInvitesQuery.data && sentInvitesQuery.data.getInvitesSentByUser.length === 0 && (
                    <NoInvitesText>
                        No Invites
                    </NoInvitesText>
                )}
                {activeTab === InviteTab.RECEIVED && receivedInvitesQuery.data && (
                    <InviteList
                        invites={receivedInvitesQuery.data.getInvitesReceivedByUser}
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
