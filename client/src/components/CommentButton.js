import React from 'react'
import { Button, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function CommentButton({ post: { id, commentCount, comments }, user }) {
    return (
        <Popup content={comments.map(comment => (
            <p>{comment.username}</p>
        ))} trigger={
            <Button
                as={Link}
                to={`/posts/${id}`}
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
        } />
    )
}