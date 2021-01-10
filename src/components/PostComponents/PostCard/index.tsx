import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { IPost } from '../../../models/post';
import Avatar from '../../Avatar';
import Card from '../../Card';
import LikesSection from '../LikesSection';
import {
    PostBody, PostBodyTitle, PostBodyContent,
    PostCardCss, PostHeader, PostHeaderAuthorAvatar,
    PostHeaderAuthorName, PostFooter, PostBodyImage
} from './style';

interface PostCardProps {
    post: IPost;
}

let postAnimateTimer: number;

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const [shouldDisplay, setShouldDisplay] = useState(false);

    const { author } = post;

    useEffect(() => {
        postAnimateTimer = setTimeout(() => {
            setShouldDisplay(true);
        }, 200);

        return () => {
            clearTimeout(postAnimateTimer);
        }
    }, []);

    return (
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
                </PostHeader>
                <PostBody>
                    <PostBodyTitle>{post.title}</PostBodyTitle>
                    {post.image && <PostBodyImage alt={`picture`} src={post.image.url} />}
                    {post.content && <PostBodyContent>{post.content}</PostBodyContent>}
                </PostBody>
                <PostFooter>
                    <LikesSection postId={post._id} />
                </PostFooter>
            </Card>
        </CSSTransition>
    );
};

export default PostCard;
