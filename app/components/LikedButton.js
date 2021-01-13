/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Button, Image } from 'react-native-magnus';
import { LIKE_POST_MUTATION } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const unlikedURL = 'https://cdn.icon-icons.com/icons2/38/PNG/512/like_favorite_heart_5759.png';
const likedURL = 'https://cdn.icon-icons.com/icons2/2073/PNG/512/heart_like_love_twitter_icon_127132.png';

export default function LikedButton({ post: { id, likeCount, likes }, user }) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user && likes && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else { setLiked(false); }
    }, [likes, user]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id },
    });

    return (
        <Button
            onPress={() => user ? likePost() : () => console.log('user not logged in')}
            bg="white"
            borderColor="#e6e6e6"
            borderWidth={1}
            mr="md"
            rounded="circle"
            size={50}
            color="red800"
            underlayColor="white">
            <Image h={23} w={23} source={{ uri: liked ? likedURL : unlikedURL }} />
        </Button>
    );
}


