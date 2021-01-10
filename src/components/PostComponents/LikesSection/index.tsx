import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { BsHeart } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { GET_ALL_LIKES_ON_POST } from '../../../graphql/like/queries';
import { LikeButton, LikesData, LikesSectionContainer } from './style';
import LoadingBouncers from '../../LoadingBouncers';
import { ILike } from '../../../models/like';

interface LikesSectionProps {
    postId: string;
}

interface AllLikesQueryResult {
    allLikesOnPost: ILike[];
}

const LikesSection: React.FC<LikesSectionProps> = ({ postId }) => {
    const allLikesQuery = useQuery<AllLikesQueryResult>(GET_ALL_LIKES_ON_POST, {
        variables: {
            input: {
                postId: postId,
            },
        },
    });

    useEffect(() => {
        if (allLikesQuery.error) {
            toast.error(allLikesQuery.error.message);
        }
    }, [allLikesQuery.error]);


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

    return (
        <LikesSectionContainer>
            {renderLikesData()}
            <LikeButton type='button'>
                <BsHeart className={`icon unliked`} />
            </LikeButton>
        </LikesSectionContainer>
    );
};

export default LikesSection;
