import React, { useContext, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_POSTS_IN_FAMILY } from '../../../graphql/post/queries';
import { FamilyContext } from '../../../contexts/family.context';
import { IPost } from '../../../models/post';
import { PostsLoadingContainer, StyledPostList } from './style';
import LoadingBouncers from '../../LoadingBouncers';
import { toast } from 'react-toastify';
import PostCard from '../PostCard';

interface PostsQueryResult {
    allPostsInFamily: IPost[];
}

const PostList: React.FC = () => {
    const { currentFamily } = useContext(FamilyContext);
    const [fetchPosts, { called, data, loading, error }] = useLazyQuery<PostsQueryResult>(GET_ALL_POSTS_IN_FAMILY);

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
