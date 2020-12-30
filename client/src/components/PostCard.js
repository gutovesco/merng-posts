import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes, comments } }) => {
    const likePost = () => {
        console.log('liked')
    }

    const commentPost = () => {
        console.log('commented')
    }

    return (
        <Card fluid>
            <Card.Content>
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
                <Button
                    onClick={likePost}
                    basic={likes.length > 0 ? false : true}
                    color='red'
                    icon='heart'
                    label={{ basic: true, color: 'red', pointing: 'left', content: likeCount }}
                />
                <Button
                    onClick={commentPost}
                    basic={comments.length > 0 ? false : true}
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
            </Card.Content>
        </Card>
    )
}

export default PostCard;