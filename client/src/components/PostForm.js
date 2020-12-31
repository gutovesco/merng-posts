import gql from 'graphql-tag'
import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useForm } from '../utils/hooks'
import { useMutation } from '@apollo/react-hooks'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

export default function PostForm() {
    const { handleSubmit, onChange, values } = useForm(createPostCallback, {
        body: ''
    })

    const [createPost] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            })
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: [
                        result.data.createPost,
                        ...data.getPosts,
                    ],
                },
            })
            values.body = ''
        },
    })

    function createPostCallback() {
        createPost()
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Publish a new post"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                    />
                    <Button type="submit" color="teal">
                        Publish
                </Button>
                </Form.Field>
            </Form>
        </>
    )
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id
            body
            createdAt
            username
            likes{
                id
                username
                createdAt
            }
            likeCount
            comments{
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`;