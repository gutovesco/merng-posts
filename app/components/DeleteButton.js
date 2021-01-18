/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Button, Div, Image, Overlay, Text } from 'react-native-magnus';
import { DELETE_POST_MUTATION, DELETE_COMMENT_MUTATION } from '../graphql/mutations';
import { FETCH_POSTS_QUERY } from '../graphql/querry';
import { useMutation } from '@apollo/client';

export default function DeleteButton({ id, callback, commentId, postId }) {
    const [overlayVisible, setOverlayVisible] = useState(false);
    console.log(commentId);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            });
            const filteredPosts = data.getPosts.filter(p => p.id !== id);
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: [
                        ...filteredPosts,
                    ],
                },
            });
            setOverlayVisible(false);
        },
        variables: {
            postId: postId,
            commentId: commentId,
        },
    });
    return (
        <>
            <Overlay visible={overlayVisible} p="xl">
                <Text mb="lg" textAlign="center">Are you sure you want to delete this post ?</Text>
                <Div row justifyContent="space-between">
                    <Button w={'40%'} onPress={() => setOverlayVisible(false)} block bg="teal500" py="lg" mt="md">No</Button>
                    <Button w={'40%'} onPress={deletePostOrMutation} block bg="teal500" py="lg" mt="md">Yes</Button>
                </Div>
            </Overlay>
            <Div position="absolute" mr="sm" style={{ right: 0 }}>
                <Button underlayColor="white" onPress={() => setOverlayVisible(true)} bg="white" rounded="circle">
                    <Image h={35} w={35} source={{ uri: 'https://cdn.icon-icons.com/icons2/1380/PNG/512/vcsconflicting_93497.png' }} />
                </Button>
            </Div>
        </>
    );
}




