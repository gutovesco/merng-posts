/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Avatar, Button, Div, Image, Text } from 'react-native-magnus';
import { FETCH_POSTS_QUERY } from '../graphql/querry';

export default function Comment({ item, user, postId }) {
    const commentId = item.id;

    const [deletePostOrMutation] = useMutation(DELETE_COMMENT_MUTATION, {
        update(proxy) {
            if (!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY,
                });
                const filteredPosts = data.getPosts.filter(p => p.id !== postId);
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        getPosts: [
                            ...filteredPosts,
                        ],
                    },
                });
            }
        },
        variables: {
            postId,
            commentId,
        },
    });

    return (
        <Div style={{
            backgroundColor: 'white',
            borderRadius: 15,
            padding: 10,
            marginTop: 20,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
        }} mt="xl" p={10} key={item.id}>
            <Div row alignItems="center"  >
                <Avatar bg="red300" size={50} color="red800">{(item.username).substr(0, 1).toUpperCase()}</Avatar>
                <Div row justifyContent="space-between">
                    <Div>
                        <Text fontSize={20} ml="lg">{item.username}</Text>
                        <Text ml="lg" color="gray500" fontSize={14}>{(item.createdAt)}</Text>
                    </Div>
                    {item.username === user.username && (
                        <Button onPress={deletePostOrMutation} ml="2xl" underlayColor="white" bg="white" rounded="circle">
                            <Image h={35} w={35} source={{ uri: 'https://cdn.icon-icons.com/icons2/1380/PNG/512/vcsconflicting_93497.png' }} />
                        </Button>
                    )}
                </Div>
            </Div>
            <Text mb="md" mt="lg" fontSize={16}>{item.body}</Text>
        </Div>
    );
}


const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            id
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
    ;
