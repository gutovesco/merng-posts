import React, { useContext } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes, comments } }) => {
    const { user } = useContext(AuthContext);

    const commentPost = () => {
        console.log('commented')
    }

    return (
        <Card fluid>
            <Card.Content as={Link} to={`/posts/${id}`}>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Button
                    as={Link}
                    to={`/posts/${id}`}
                    onClick={commentPost}
                    basic={false}
                    color='teal'
                    icon='comment'
                    label={{
                        as: 'a',
                        basic: true,
                        color: 'teal',
                        pointing: 'left',
                        content: commentCount,
                    }}
                />
                {user && user.username === username && <DeleteButton postId={id} />}
            </Card.Content>
        </Card>
    )
}

export default PostCard;