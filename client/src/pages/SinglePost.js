import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useContext } from 'react'
import { Loader, Image, Grid, Card, Button } from 'semantic-ui-react'
import moment from 'moment'
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import { AuthContext } from '../context/auth'
import { Link } from 'react-router-dom'

export default function SinglePost(props) {
    const { user } = useContext(AuthContext)
    const postId = props.match.params.postId;

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
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
                    </Grid.Column>
                </Grid.Row>
            </Grid>
    }

    return postMarkup;
}

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