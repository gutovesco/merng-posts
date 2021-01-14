/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, View } from 'react-native';
import { Avatar, Button, Div, Input, Text, Image } from 'react-native-magnus';
import { AuthContext } from '../hooks/auth';
import DeleteButton from './DeleteButton';
import LikedButton from './LikedButton';

const cardStyle = {
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
};

export default function CommentsCard({ item }) {
    const { user } = useContext(AuthContext);
    const [commentBody, setCommentBody] = useState('');
    console.log(item);
    return (
        <SafeAreaView >
            <View style={{ alignItems: 'center' }}>
                <View style={cardStyle}>
                    <Div row alignItems="center" >
                        <Avatar bg="red300" size={50} color="red800">{(item.username).substr(0, 1).toUpperCase()}</Avatar>
                        <Div>
                            <Text fontSize={20} ml="lg">{item.username}</Text>
                            <Text ml="lg" color="gray500" fontSize={14}>{(item.createdAt)}</Text>
                        </Div>
                    </Div>
                    <Text mb="md" mt="lg" fontSize={16}>{item.body}</Text>
                    <Div borderBottomWidth={2} borderBottomColor="gray500" mt="lg" mb="lg" />
                    <Div row alignItems="center">
                        <LikedButton showLikes={true} user={user} post={item} />
                        {user && user.username === item.username && <DeleteButton post={item} />}
                    </Div>
                </View>
                <Div pb="xl" mb="sm" style={cardStyle}>
                    <Text p={4} fontSize={14}>Post a comment</Text>
                    <Div row alignItems="center" mt="md">
                        <Input
                            h={40}
                            w={250}
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
                <FlatList
                    showsVerticalScrollIndicator={true}
                    data={item ? item.comments : []}
                    renderItem={({ item }) => {
                        return (
                            <Div key={item.id} style={cardStyle}>
                                <Div row alignItems="center" >
                                    <Avatar bg="red300" size={50} color="red800">{(item.username).substr(0, 1).toUpperCase()}</Avatar>
                                    <Div row justifyContent="space-between">
                                        <Div>
                                            <Text fontSize={20} ml="lg">{item.username}</Text>
                                            <Text ml="lg" color="gray500" fontSize={14}>{(item.createdAt)}</Text>
                                        </Div>
                                        <Button ml="2xl" underlayColor="white" bg="white" rounded="circle">
                                            <Image h={35} w={35} source={{ uri: 'https://cdn.icon-icons.com/icons2/1380/PNG/512/vcsconflicting_93497.png' }} />
                                        </Button>
                                    </Div>
                                </Div>
                                <Text mb="md" mt="lg" fontSize={16}>{item.body}</Text>
                            </Div>
                        );
                    }}
                    keyExtractor={(comment) => `${comment.id}`}
                />
            </View>
        </SafeAreaView>
    );
}

