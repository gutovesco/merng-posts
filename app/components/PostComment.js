/* eslint-disable prettier/prettier */
import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Div, Input, Text } from 'react-native-magnus';

export default function PostComment({ post, navigation }) {
    const [commentBody, setCommentBody] = useState('');

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setCommentBody('');
        },
        variables: {
            postId: post.id,
            body: commentBody,
        },
    });

    return (
        <Div w="93%" pb="xl" mt="xl">
            <Text p={4} fontSize={14}>Post a comment</Text>
            <Div row alignItems="center" mt="md">
                <Input
                    h={50}
                    w={270}
                    defaultValue={commentBody}
                    onChangeText={(text) => setCommentBody(text)}
                    placeholder="Write your comment here"
                    focusBorderColor="blue700"
                    borderColor="black"
                    borderWidth={1}
                />
                <Button onPress={submitComment} bg="teal400" w={80} h={50}>Publish</Button>
            </Div>
        </Div>
    );
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
;
