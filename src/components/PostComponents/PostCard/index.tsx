import React from 'react';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { IPost } from '../../../models/post';
import Avatar from '../../Avatar';
import Card from '../../Card';
import {
    PostBody, PostBodyTitle, PostBodyContent,
    PostCardCss, PostHeader, PostHeaderAuthorAvatar,
    PostHeaderAuthorName, PostFooter, PostLikesData,
    PostLikeButton,
    PostBodyImage
} from './style';

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
                {post.image && <PostBodyImage alt={`picture`} src={post.image.url} />}
                {post.content && <PostBodyContent>{post.content}</PostBodyContent>}
            </PostBody>
            <PostFooter>
                <PostLikesData>
                    5 likes
                </PostLikesData>
                <PostLikeButton type='button'>
                    <BsHeart className={`icon unliked`} />
                </PostLikeButton>
            </PostFooter>
        </Card>
    );
};

export default PostCard;
