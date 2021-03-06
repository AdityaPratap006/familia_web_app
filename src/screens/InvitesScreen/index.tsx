import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { InviteButtonContainer, InvitesLoadingContainer, InvitesScreenContent, InvitesTab, InvitesTabsHeader, NoInvitesText } from './style';
import Screen from '../../components/ScreenComponents/Screen';
import { GET_INVITES_RECEIVED_BY_USER, GET_INVITES_SENT_BY_USER } from '../../graphql/invite/queries';
import { IInvite } from '../../models/invite';
import InviteList from '../../components/InviteComponents/InviteList';
import LoadingBouncers from '../../components/LoadingBouncers';
import { INVITE_CREATED_SUBSCRIPTION, INVITE_DELETED_SUBSCRIPTION } from '../../graphql/invite/subscriptions';
import Button from '../../components/Button';
import SearchUserModal from '../../components/FamilyMemberComponents/SearchUserModal';
import SomethingWentWrongCard from '../../components/Onboarding/SomethingWentWrongCard';
import { FamilyContext } from '../../contexts/family.context';
import CreateFamilyModal from '../../components/FamilyComponents/CreateFamilyModal';

enum InviteTab {
    SENT = 'SENT',
    RECEIVED = 'RECEIVED',
}

interface IInviteCreatedResult {
    onInviteCreated: IInvite;
}

interface IInviteDeletedResult {
    onInviteDeleted: string;
}

const InvitesScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<InviteTab>(InviteTab.RECEIVED);
    const receivedInvitesQuery = useQuery<{ getInvitesReceivedByUser: IInvite[] }>(GET_INVITES_RECEIVED_BY_USER);
    const sentInvitesQuery = useQuery<{ getInvitesSentByUser: IInvite[] }>(GET_INVITES_SENT_BY_USER);
    const [showModal, setShowModal] = useState(false);
    const { families, errorWhileFetchingFamilies, loadingFamilies } = useContext(FamilyContext);
    const [showCreateFamilyModal, setShowCreateFamilyModal] = useState<boolean>(false);

    const closeCreateFamilyModal = () => {
        setShowCreateFamilyModal(false);
    }

    const openCreateFamilyModal = () => {
        setShowCreateFamilyModal(true);
    }

    const { subscribeToMore: subscribeToMoreReceivedInvites } = receivedInvitesQuery;
    const { subscribeToMore: subscribeToMoreSentInvites } = sentInvitesQuery;

    useEffect(() => {
        document.title = `Invites | Familia`;
    }, []);

    useEffect(() => {
        subscribeToMoreReceivedInvites<IInviteCreatedResult>({
            document: INVITE_CREATED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                const existingInvites = prev.getInvitesReceivedByUser;
                const newInvite = subscriptionData.data.onInviteCreated;

                return {
                    getInvitesReceivedByUser: [newInvite, ...existingInvites],
                };
            }
        });

        subscribeToMoreReceivedInvites<IInviteDeletedResult>({
            document: INVITE_DELETED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                // console.log(subscriptionData);
                const existingInvites = prev.getInvitesReceivedByUser;
                const deletedInviteId = subscriptionData.data.onInviteDeleted;

                return {
                    getInvitesReceivedByUser: existingInvites.filter(invite => invite._id !== deletedInviteId),
                }
            }
        });

    }, [subscribeToMoreReceivedInvites, families]);

    useEffect(() => {
        subscribeToMoreSentInvites<IInviteCreatedResult>({
            document: INVITE_CREATED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                const existingInvites = prev.getInvitesSentByUser;
                const newInvite = subscriptionData.data.onInviteCreated;

                return {
                    getInvitesSentByUser: [newInvite, ...existingInvites],
                };
            }
        });

        subscribeToMoreSentInvites<IInviteDeletedResult>({
            document: INVITE_DELETED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                // console.log(subscriptionData);
                const existingInvites = prev.getInvitesSentByUser;
                const deletedInviteId = subscriptionData.data.onInviteDeleted;

                return {
                    getInvitesSentByUser: existingInvites.filter(invite => invite._id !== deletedInviteId),
                }
            }
        });
    }, [subscribeToMoreSentInvites]);

    const handleTabChange = (tab: InviteTab) => {
        setActiveTab(tab);
    }

    const handleDisplayModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    if (errorWhileFetchingFamilies) {
        return (
            <Screen
                title="Invites"
            >
                <SomethingWentWrongCard />
            </Screen>
        );
    }

    return (
        <React.Fragment>
            <CreateFamilyModal
                show={showCreateFamilyModal}
                closeModal={closeCreateFamilyModal}
            />
            <SearchUserModal
                show={showModal}
                closeModal={handleCloseModal}
            />
            <Screen
                title="Invites"
                withGoBackButton
                withoutBottomAppBar
            >
                <InvitesScreenContent>
                    <InviteButtonContainer>
                        {(!loadingFamilies && !errorWhileFetchingFamilies && families.length === 0) && (
                            <Button type="button" onClick={openCreateFamilyModal}>
                                Create a Family
                            </Button>
                        )}
                        {(!loadingFamilies && !errorWhileFetchingFamilies && families.length > 0) && (
                            <Button type="button" onClick={handleDisplayModal}>
                                Invite Someone
                            </Button>
                        )}
                    </InviteButtonContainer>
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
        </React.Fragment>
    );
};

export default InvitesScreen;
