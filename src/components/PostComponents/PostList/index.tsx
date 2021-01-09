import React, { useContext, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_POSTS_IN_FAMILY } from '../../../graphql/post/queries';
import { FamilyContext } from '../../../contexts/family.context';
import { IPost } from '../../../models/post';
import { PostsLoadingContainer, StyledPostList } from './style';
import LoadingBouncers from '../../LoadingBouncers';
import { toast } from 'react-toastify';
import PostCard from '../PostCard';
import { POST_ADDED_SUBSCRIPTION } from '../../../graphql/post/subscriptions';

interface PostsQueryResult {
    allPostsInFamily: IPost[];
}

interface PostAddedResult {
    onPostAdded: IPost;
}

const PostList: React.FC = () => {
    const { currentFamily } = useContext(FamilyContext);
    const [fetchPosts, { called, data, loading, error, subscribeToMore }] = useLazyQuery<PostsQueryResult>(GET_ALL_POSTS_IN_FAMILY);

    useEffect(() => {
        if (currentFamily) {
            fetchPosts({
                variables: {
                    input: {
                        familyId: currentFamily._id,
                    },
                },
            });
        }
    }, [currentFamily, fetchPosts]);

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);

    useEffect(() => {
        if (subscribeToMore) {
            subscribeToMore<PostAddedResult>({
                document: POST_ADDED_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    const existingPosts = prev.allPostsInFamily;
                    const newPost = subscriptionData.data.onPostAdded;

                    return {
                        allPostsInFamily: [newPost, ...existingPosts],
                    };
                }
            });
        }
    }, [subscribeToMore]);

    const renderPostCards = () => {
        if (!data) {
            return null;
        }

        const posts = data.allPostsInFamily;

        return posts.map(post => (
            <PostCard key={post._id} post={post} />
        ));
    }

    return (
        <StyledPostList>
            {called && loading && (
                <PostsLoadingContainer>
                    <LoadingBouncers />
                </PostsLoadingContainer>
            )}
            {!loading && renderPostCards()}
        </StyledPostList>
    );
};

export default PostList;
