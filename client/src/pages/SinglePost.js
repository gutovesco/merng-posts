import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useContext, useRef, useState } from 'react'
import { Loader, Image, Grid, Card, Button, Form } from 'semantic-ui-react'
import moment from 'moment'
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import { AuthContext } from '../context/auth'
import { Link } from 'react-router-dom'

export default function SinglePost(props) {
    const { user } = useContext(AuthContext)
    const postId = props.match.params.postId;
    const commentInputRef = useRef(null);

    const [comment, setComment] = useState('')

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('')
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: comment
        }
    })

    function deletePostCallback() {
        props.history.push('/')
    }

    let postMarkup;
    if (data === undefined || data.getPost === undefined) {
        postMarkup = <Loader active inline='centered' />
    } else {
        const { id, body, createdAt, username, comments, likes, commentCount, likeCount } = data.getPost;

        postMarkup =
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                            size="small"
                            float="right" />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likes, likeCount }} />
                                <Button
                                    as={Link}
                                    to={`/posts/${id}`}
                                    onClick={() => { }}
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
                                {user && user.username === username && <DeleteButton callback={deletePostCallback} postId={id} />}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment</p>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input
                                                ref={commentInputRef}
                                                type="text"
                                                placeholder="Write your comment here.."
                                                name="comment" value={comment}
                                                onChange={e => setComment(e.target.value)} />
                                            <button type="submit" className="ui button teal" disabled={comment.trim() === ''} onClick={submitComment}>
                                                Submit
                                        </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton postId={id} commentId={comment.id} />
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
    }

    return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
    mutation createComment($postId: ID!, $body: String!){
        createComment(postId: $postId, body: $body){
            id
            comments{
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id
            body
            createdAt
            username
            likeCount
            likes{
                username
            }
            comments{
                id
                username
                createdAt
                body
            }
            commentCount
        }
    }
`