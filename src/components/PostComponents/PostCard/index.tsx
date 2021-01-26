import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'react-toastify';
import { IPost } from '../../../models/post';
import { getLocalDateText } from '../../../utils/dates';
import Avatar from '../../Avatar';
import Card from '../../Card';
import LikesSection from '../LikesSection';
import {
    PostBody, PostBodyTitle, PostBodyContent,
    PostCardCss, PostHeader, PostHeaderAuthorAvatar,
    PostHeaderAuthorName, PostFooter, PostBodyImage,
    PostBodyDate
} from './style';
import PostMenu from '../PostMenu';
import DeletePostModal from '../DeletePostModal';
import { DELETE_POST_MUTATION } from '../../../graphql/post/mutations';

interface PostCardProps {
    post: IPost;
    postIndex: number;
}

interface DeletePostResponse {
    deletePost: IPost;
}

interface DeletePostInput {
    input: {
        postId: string;
    }
}

let postAnimateTimer: number;

const PostCard: React.FC<PostCardProps> = ({ post, postIndex }) => {
    const [shouldDisplay, setShouldDisplay] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [deletePost, deletePostResponse] = useMutation<DeletePostResponse, DeletePostInput>(DELETE_POST_MUTATION)

    const { author } = post;

    useEffect(() => {
        postAnimateTimer = setTimeout(() => {
            setShouldDisplay(true);
        }, 200 * postIndex);

        return () => {
            clearTimeout(postAnimateTimer);
        }
    }, [postIndex]);

    const showDeleteWarningHandler = () => {
        setShowDeleteWarning(true);
    };

    const cancelDeleteWarningHandler = () => {
        setShowDeleteWarning(false);
    }

    const confirmPostDeleteHandler = async () => {
        const { errors, data } = await deletePost({
            variables: {
                input: {
                    postId: post._id,
                }
            }
        });

        setShowDeleteWarning(false);

        if (data) {
            toast.success('Post deleted!');
        }

        if (errors) {
            toast.error(errors[0]?.message);
        }
    }

    return (
        <React.Fragment>
            <DeletePostModal
                show={showDeleteWarning}
                onConfirm={confirmPostDeleteHandler}
                onCancel={cancelDeleteWarningHandler}
                deleteReponseLoading={deletePostResponse.loading}
            />
            <CSSTransition
                in={shouldDisplay}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames={{
                    enterActive: 'post-card-enter-active',
                    enterDone: 'post-card-enter-done',
                    exitActive: 'post-card-exit-active',
                    exit: 'post-card-exit',
                }}
            >
                <Card addcss={PostCardCss}>
                    <PostHeader>
                        <PostHeaderAuthorAvatar>
                            <Avatar alt={`author pic`} src={author.image.url} tiny />
                        </PostHeaderAuthorAvatar>
                        <PostHeaderAuthorName>{author.name}</PostHeaderAuthorName>
                        <PostMenu onDeleteRequest={showDeleteWarningHandler} />
                    </PostHeader>
                    <PostBody>
                        <PostBodyDate>{getLocalDateText(post.createdAt)}</PostBodyDate>
                        <PostBodyTitle>{post.title}</PostBodyTitle>
                        {post.image && <PostBodyImage alt={`picture`} src={post.image.url} />}
                        {post.content && <PostBodyContent>{post.content}</PostBodyContent>}
                    </PostBody>
                    <PostFooter>
                        <LikesSection postId={post._id} />
                    </PostFooter>
                </Card>
            </CSSTransition>
        </React.Fragment>
    );
};

export default PostCard;
