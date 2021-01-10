import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { GET_ALL_LIKES_ON_POST, IS_POST_LIKED_BY_USER } from '../../../graphql/like/queries';
import { LikeButton, LikesData, LikesSectionContainer } from './style';
import LoadingBouncers from '../../LoadingBouncers';
import { ILike } from '../../../models/like';
import { CREATE_LIKE_MUTATION, DELETE_LIKE_MUTATION } from '../../../graphql/like/mutations';
import LoadingSpinner from '../../LoadingSpinner';
import { UserProfileContext } from '../../../contexts/userProfile.context';
import { ON_LIKED_SUBSCRIPTION, ON_UNLIKED_SUBSCRIPTION } from '../../../graphql/like/subscriptions';
interface LikesSectionProps {
    postId: string;
}

interface AllLikesQueryResult {
    allLikesOnPost: ILike[];
}

interface IsPostLikedQueryResult {
    isPostLikedByUser: boolean;
}

interface CreateLikeMutationResult {
    createLike: ILike;
}

interface DeleteLikeMutationResult {
    deleteLike: ILike;
}

interface OnLikedSubscriptionResult {
    onLiked: ILike;
}

interface OnUnlikedSubscriptionResult {
    onUnliked: ILike;
}

const LikesSection: React.FC<LikesSectionProps> = ({ postId }) => {
    const { profile } = useContext(UserProfileContext);
    const allLikesQuery = useQuery<AllLikesQueryResult>(GET_ALL_LIKES_ON_POST, {
        variables: {
            input: {
                postId: postId,
            },
        },
    });

    const isPostLikedQuery = useQuery<IsPostLikedQueryResult>(IS_POST_LIKED_BY_USER, {
        variables: {
            input: {
                postId: postId,
            },
        },
        onCompleted: (data) => {
            const { isPostLikedByUser } = data;
            setLocallyLiked(isPostLikedByUser);
        }
    });

    const [locallyLiked, setLocallyLiked] = useState(false);

    const [createLikeMutation, createLikeMutationResult] = useMutation<CreateLikeMutationResult>(CREATE_LIKE_MUTATION, {
        variables: {
            input: {
                postId: postId,
            },
        },
        refetchQueries: [
            {
                query: GET_ALL_LIKES_ON_POST,
                variables: {
                    input: {
                        postId: postId,
                    },
                },
            },
            {
                query: IS_POST_LIKED_BY_USER,
                variables: {
                    input: {
                        postId: postId,
                    },
                },
            },
        ],
        awaitRefetchQueries: true,
        optimisticResponse: {
            createLike: {
                _id: Date.now().toString(),
                createdAt: Date.now().toLocaleString(),
                likedBy: {
                    _id: profile?._id || '',
                    image: profile?.image || { url: '' },
                    name: profile?.name || 'User Name'
                },
                post: postId,
                updatedAt: Date.now().toLocaleString(),
            }
        },
        onCompleted: (data) => {
            setLocallyLiked(true);
        }
    });

    const [deleteLikeMutation, deleteLikeMutationResult] = useMutation<DeleteLikeMutationResult>(DELETE_LIKE_MUTATION, {
        refetchQueries: [
            {
                query: GET_ALL_LIKES_ON_POST,
                variables: {
                    input: {
                        postId: postId,
                    },
                },
            },
            {
                query: IS_POST_LIKED_BY_USER,
                variables: {
                    input: {
                        postId: postId,
                    },
                },
            },
        ],
        awaitRefetchQueries: true,
        optimisticResponse: (vars) => ({
            deleteLike: {
                _id: vars.input.likeId as string,
                createdAt: Date.now().toLocaleString(),
                updatedAt: Date.now().toLocaleString(),
                post: postId,
                likedBy: {
                    _id: profile?._id || '',
                    image: profile?.image || { url: '' },
                    name: profile?.name || '',
                },
            },
        }),
        onCompleted: (_data) => {
            setLocallyLiked(false);
        }
    });

    useEffect(() => {
        if (allLikesQuery.error) {
            toast.error(allLikesQuery.error.message);
            console.log(allLikesQuery.error);
        }
    }, [allLikesQuery.error]);

    useEffect(() => {
        if (isPostLikedQuery.error) {
            toast.error(isPostLikedQuery.error.message);
        }
    }, [isPostLikedQuery.error]);

    const { subscribeToMore: subscribeToMoreLikes } = allLikesQuery;
    useEffect(() => {
        subscribeToMoreLikes<OnLikedSubscriptionResult>({
            document: ON_LIKED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData: { data: { onLiked } } }) => {
                const prevLikes = prev.allLikesOnPost;
                const newLike = onLiked;

                let finalLikes: ILike[] = [];
                if (newLike.post === postId) {
                    finalLikes = [newLike, ...prevLikes];
                } else {
                    finalLikes = [...prevLikes];
                }

                return {
                    allLikesOnPost: finalLikes,
                };
            },
            variables: {
                input: {
                    postId: postId,
                },
            },
        });

        subscribeToMoreLikes<OnUnlikedSubscriptionResult>({
            document: ON_UNLIKED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData: { data: { onUnliked } } }) => {
                const prevLikes = prev.allLikesOnPost;
                const deletedLike = onUnliked;

                let finalLikes: ILike[] = [];
                if (deletedLike.post === postId) {
                    finalLikes = prevLikes.filter(like => like._id !== deletedLike._id);
                } else {
                    finalLikes = [...prevLikes];
                }

                return {
                    allLikesOnPost: finalLikes,
                };
            },
            variables: {
                input: {
                    postId: postId,
                },
            },
        });
    }, [subscribeToMoreLikes, postId]);


    const renderLikesData = (): React.ReactNode => {
        const { called, loading, data, error } = allLikesQuery;

        if (called && loading) {
            return <LoadingBouncers small />;
        }

        if (error) {
            return null;
        }

        // if ((createLikeMutationResult.called && createLikeMutationResult.loading) || (deleteLikeMutationResult.called && deleteLikeMutationResult.loading)) {
        //     return <LoadingBouncers small />;
        // }

        if (data) {
            const { allLikesOnPost } = data;

            let numOfLikes = allLikesOnPost.length;

            if ((createLikeMutationResult.called && createLikeMutationResult.loading)) {
                numOfLikes = allLikesOnPost.length + 1;
            }

            if ((deleteLikeMutationResult.called && deleteLikeMutationResult.loading)) {
                numOfLikes = allLikesOnPost.length - 1;
            }

            const isSingular = numOfLikes === 1;
            const isZero = numOfLikes <= 0;

            const text = isSingular ? `${numOfLikes} like` : (isZero ? `no likes yet` : `${numOfLikes} likes`);

            return (
                <LikesData>
                    {text}
                </LikesData>
            );
        }

        return null;
    }

    const likeHandler = async () => {
        try {
            setLocallyLiked(true);
            const { errors } = await createLikeMutation();

            if (errors) {
                throw Error(errors[0]?.message || `couldn't like post`);
            }

        } catch (error) {
            setLocallyLiked(false);
            toast.error(error.message);
        }
    }

    const unlikeHandler = async () => {
        const allLikes = allLikesQuery.data?.allLikesOnPost;

        if (!allLikes || !profile) {
            return;
        }

        try {
            setLocallyLiked(false);
            const like = allLikes.find(like => like.likedBy._id === profile._id);

            if (!like) {
                return;
            }

            const { errors } = await deleteLikeMutation({
                variables: {
                    input: {
                        likeId: like._id,
                    },
                },
            });

            if (errors) {
                throw Error(errors[0]?.message || `couldn't unlike post`);
            }

        } catch (error) {
            setLocallyLiked(true);
            toast.error(error.message);
        }
    }

    const renderLikeButton = (): React.ReactNode => {
        const { called, loading, data, error } = isPostLikedQuery;

        if (called && loading) {
            return <LoadingBouncers small />;
        }

        if (error) {
            return null;
        }

        if (data) {
            const { isPostLikedByUser } = data;

            const requestInProgress = (createLikeMutationResult.called && createLikeMutationResult.loading) || (deleteLikeMutationResult.called && deleteLikeMutationResult.loading);

            const handleLikeButtonClick = () => {

                if (requestInProgress) {
                    console.log(`network request already under way!`);
                    return;
                }

                if (!isPostLikedByUser) {
                    likeHandler();
                } else {
                    unlikeHandler();
                }
            }

            if (requestInProgress) {
                return (
                    <LikeButton type='button' onClick={handleLikeButtonClick}>
                        {!locallyLiked && <BsHeart className={`icon unliked`} />}
                        {locallyLiked && <BsHeartFill className={`icon liked`} />}
                    </LikeButton>
                );
            } else {
                return (
                    <LikeButton type='button' onClick={handleLikeButtonClick}>
                        {!isPostLikedByUser && <BsHeart className={`icon unliked`} />}
                        {isPostLikedByUser && <BsHeartFill className={`icon liked`} />}
                    </LikeButton>
                );
            }

        }

        return (
            <LoadingSpinner small />
        );
    }

    return (
        <LikesSectionContainer>
            {renderLikesData()}
            {renderLikeButton()}
        </LikesSectionContainer>
    );
};

export default LikesSection;
