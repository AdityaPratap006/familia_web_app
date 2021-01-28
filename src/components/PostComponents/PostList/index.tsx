import React, { useContext, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_POSTS_IN_FAMILY } from '../../../graphql/post/queries';
import { FamilyContext } from '../../../contexts/family.context';
import { IPost } from '../../../models/post';
import { PostsLoadingContainer, StyledPostList } from './style';
import LoadingBouncers from '../../LoadingBouncers';
import { toast } from 'react-toastify';
import PostCard from '../PostCard';
import { POST_ADDED_SUBSCRIPTION, POST_DELETED_SUBSCRIPTION } from '../../../graphql/post/subscriptions';

interface PostsQueryResult {
    allPostsInFamily: IPost[];
}

interface PostAddedResult {
    onPostAdded: IPost;
}

interface PostDeletedResult {
    onPostDeleted: IPost;
}

const PostList: React.FC = () => {
    const { currentFamily } = useContext(FamilyContext);
    const [fetchPosts, { called, data, loading, error, subscribeToMore }] = useLazyQuery<PostsQueryResult, { input: { familyId: string } }>(GET_ALL_POSTS_IN_FAMILY);

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
        if (data) {
            // console.group();
            // data.allPostsInFamily.slice(0, 3).forEach((post) => {
            //     console.log(post);
            // });
            // console.groupEnd();
        }
    }, [data]);

    useEffect(() => {
        if (subscribeToMore) {
            const unsubscribePostAdded = subscribeToMore<PostAddedResult>({
                document: POST_ADDED_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    const existingPosts = prev.allPostsInFamily;
                    const newPost = subscriptionData.data.onPostAdded;

                    return {
                        allPostsInFamily: [newPost, ...existingPosts],
                    };
                },
            });

            const unsubscribePostDeleted = subscribeToMore<PostDeletedResult>({
                document: POST_DELETED_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    const existingPosts = prev.allPostsInFamily;
                    const deletedPost = subscriptionData.data.onPostDeleted;

                    return {
                        allPostsInFamily: existingPosts.filter(post => post._id !== deletedPost._id),
                    }
                },
            });

            return () => {
                unsubscribePostAdded();
                unsubscribePostDeleted();
            };
        }
    }, [subscribeToMore]);

    const renderPostCards = () => {
        if (!data) {
            return null;
        }

        const posts = data.allPostsInFamily;

        return posts.map((post, index) => (
            <PostCard key={post._id} post={post} postIndex={index + 1} />
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
