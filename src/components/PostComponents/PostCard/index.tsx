import React from 'react';
import { IPost } from '../../../models/post';
import Avatar from '../../Avatar';
import Card from '../../Card';
import { PostBody, PostBodyTitle, PostBodyContent, PostCardCss, PostHeader, PostHeaderAuthorAvatar, PostHeaderAuthorName } from './style';

interface PostCardProps {
    post: IPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {

    const { author } = post;

    return (
        <Card addcss={PostCardCss}>
            <PostHeader>
                <PostHeaderAuthorAvatar>
                    <Avatar alt={`author pic`} src={author.image.url} tiny />
                </PostHeaderAuthorAvatar>
                <PostHeaderAuthorName>{author.name}</PostHeaderAuthorName>
            </PostHeader>
            <PostBody>
                <PostBodyTitle>{post.title}</PostBodyTitle>
                {/*Post Image goes here*/}
                {post.content && <PostBodyContent>{post.content}</PostBodyContent>}
            </PostBody>
        </Card>
    );
};

export default PostCard;
