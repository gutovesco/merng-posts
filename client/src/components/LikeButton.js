import React, { useEffect, useState } from 'react'
import { Button, Popup } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/react-hooks'

export default function LikeButton({ post: { id, likeCount, likes }, user }) {
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        if (user && likes && likes.find(like => like.username === user.username)) {
            setLiked(true)
        } else setLiked(false)
    }, [likes, user])

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    })

    return (
        <Popup content={likes.map(like => (
            <p>{like.username}</p>
        ))} trigger={
            <Button
                onClick={user ? likePost : () => console.log('user not logged in')}
                basic={!liked ? true : false}
                color='red'
                icon='heart'
                label={{ basic: true, color: 'red', pointing: 'left', content: likeCount }}
            />
        } />
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id
                username
            }
            likeCount
        }
    }
`