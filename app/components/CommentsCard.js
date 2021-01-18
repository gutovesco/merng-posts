/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import { useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { Avatar, Button, Div, Input, Text, Skeleton } from 'react-native-magnus';
import { FETCH_POST_QUERY } from '../graphql/querry';
import { AuthContext } from '../hooks/auth';
import Comment from './Comment';
import DeleteButton from './DeleteButton';
import LikedButton from './LikedButton';

export default function CommentsCard({ item, navigation }) {
    const { user } = useContext(AuthContext);
    const [commentBody, setCommentBody] = useState('');

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId: item.id,
        },
    });

    let commentMarkup;

    if (data === undefined || data.getPost === undefined) {
        commentMarkup =
            <>
                <Div flexDir="row" mt="md">
                    <Skeleton.Circle h={40} w={40} />
                    <Div ml="md" flex={1}>
                        <Skeleton.Box mt="sm" />
                        <Skeleton.Box mt="sm" w="80%" />
                        <Skeleton.Box mt="sm" />
                    </Div>
                </Div>
                <Div flexDir="row" mt="md">
                    <Skeleton.Circle h={20} w={20} rounded="lg" />
                    <Skeleton.Circle h={20} w={20} rounded="lg" ml="md" />
                    <Div alignItems="flex-end" flex={1}>
                        <Skeleton.Box h={20} w={100} />
                    </Div>
                </Div>
            </>;
    } else {
        const { username, createdAt, likes, likeCount, body, comments, id } = data.getPost;
        const post = {
            id,
            likeCount,
            likes,
        };

        function deleteCallback(){
            navigation.popToTop();
        }

        commentMarkup =
            <SafeAreaView >
                <View style={{ alignItems: 'center', marginBottom: 40 }}>
                    <View style={{
                        width: '93%',
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
                    }}>
                        <Div row alignItems="center" >
                            <Avatar bg="red300" size={50} color="red800">{(username).substr(0, 1).toUpperCase()}</Avatar>
                            <Div>
                                <Text fontSize={20} ml="lg">{username}</Text>
                                <Text ml="lg" color="gray500" fontSize={14}>{(createdAt)}</Text>
                            </Div>
                        </Div>
                        <Text mb="md" mt="lg" fontSize={16}>{body}</Text>
                        <Div borderBottomWidth={2} borderBottomColor="gray500" mt="lg" mb="lg" />
                        <Div row alignItems="center">
                            <LikedButton showLikes={true} user={user} post={post} />
                            {user && user.username === username && <DeleteButton postId={id} />}
                        </Div>
                    </View>
                    <Div w="93%" pb="xl" mt="xl">
                        <Text p={4} fontSize={14}>Post a comment</Text>
                        <Div row alignItems="center" mt="md">
                            <Input
                                h={40}
                                w={270}
                                defaultValue={commentBody}
                                onChangeText={(text) => setCommentBody(text)}
                                placeholder="Write your comment here"
                                focusBorderColor="blue700"
                                borderColor="black"
                                borderWidth={1}
                            />
                            <Button bg="teal400" w={80} h={40}>Publish</Button>
                        </Div>
                    </Div>
                    <Div w="93%">
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={comments}
                            renderItem={({ item }) => {
                                return (
                                    <Comment postId={post.id} user={user} item={item} />
                                );
                            }}
                            keyExtractor={(item) => `${item.id}`}
                        />
                    </Div>
                </View>
            </SafeAreaView>;
    }
    return commentMarkup;
}

