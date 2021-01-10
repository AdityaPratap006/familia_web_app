import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { GET_ALL_LIKES_ON_POST, IS_POST_LIKED_BY_USER } from '../../../graphql/like/queries';
import { LikeButton, LikesData, LikesSectionContainer } from './style';
import LoadingBouncers from '../../LoadingBouncers';
import { ILike } from '../../../models/like';
import { CREATE_LIKE_MUTATION, DELETE_LIKE_MUTATION } from '../../../graphql/like/mutations';
import LoadingSpinner from '../../LoadingSpinner';

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
    deleteLike: string;
}

const LikesSection: React.FC<LikesSectionProps> = ({ postId }) => {
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

    const [createLikeMutation] = useMutation<CreateLikeMutationResult>(CREATE_LIKE_MUTATION, {
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
    });

    const [deleteLikeMutation] = useMutation<DeleteLikeMutationResult>(DELETE_LIKE_MUTATION, {
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
    });

    useEffect(() => {
        if (allLikesQuery.error) {
            toast.error(allLikesQuery.error.message);
        }
    }, [allLikesQuery.error]);

    useEffect(() => {
        if (isPostLikedQuery.error) {
            toast.error(isPostLikedQuery.error.message);
        }
    }, [isPostLikedQuery.error]);


    const renderLikesData = (): React.ReactNode => {
        const { called, loading, data, error } = allLikesQuery;

        if (called && loading) {
            return <LoadingBouncers small />;
        }

        if (error) {
            return null;
        }

        if (data) {
            const { allLikesOnPost } = data;

            const numOfLikes = allLikesOnPost.length;

            const isSingular = numOfLikes === 1;
            const isZero = numOfLikes === 0;

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
        try {
            setLocallyLiked(false);
            const { errors } = await deleteLikeMutation();

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

            const handleLikeButtonClick = () => {
                if (!isPostLikedByUser) {
                    likeHandler();
                } else {
                    unlikeHandler();
                }
            }

            return (
                <LikeButton type='button' onClick={handleLikeButtonClick}>
                    {!(locallyLiked) && <BsHeart className={`icon unliked`} />}
                    {(locallyLiked) && <BsHeartFill className={`icon liked`} />}
                </LikeButton>
            );
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
