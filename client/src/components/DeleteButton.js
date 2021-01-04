import React, { useState } from 'react'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/react-hooks'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

export default function DeleteButton({ postId, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy, result) {
            setConfirmOpen(false);
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            const filteredPosts = data.getPosts.filter(p => p.id !== postId);
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: [
                        ...filteredPosts
                    ]
                }
            })
            if (callback) callback();
        },
        variables: {
            postId
        }
    })
    return (
        <>
            <Button as="div" color="red" floated="right" onClick={() => setConfirmOpen(true)}>
                <Icon style={{ margin: 0 }} color="white" name="trash" />
            </Button>
            <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePost} />
        </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`