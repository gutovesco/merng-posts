/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { View } from 'react-native';
import { Text, Button, Div, Image, Avatar } from 'react-native-magnus';
import LikeButton from '../components/LikedButton';
import { AuthContext } from '../hooks/auth';
import DeleteButton from './DeleteButton';

export default function HomeCard({ item, navigation }) {
    const { user } = useContext(AuthContext);

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{
                width: '93%',
                backgroundColor: 'white',
                borderRadius: 15,
                padding: 10,
                marginBottom: 20,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
            }}>
                <Div row alignItems="center">
                    <Avatar bg="red300" size={40} color="red800">{(item.username).substr(0, 1).toUpperCase()}</Avatar>
                    <Div>
                        <Text fontSize={15} ml="lg">{item.username}</Text>
                        <Text ml="lg" color="gray500" fontSize={12}>{(item.createdAt)}</Text>
                    </Div>
                </Div>
                <Text ml="xs" mt="sm">{item.body}</Text>
                <Div row alignItems="center" mt="lg">
                    <LikeButton user={user} post={item} />
                    <Button onPress={() => navigation.push('comments', {item, navigation})} underlayColor="white" bg="gray100" borderColor="#e6e6e6" borderWidth={1} rounded="circle" size={50}>
                        <Image h={24} w={24} source={{ uri: 'https://cdn.icon-icons.com/icons2/806/PNG/512/chat-26_icon-icons.com_65943.png' }} />
                    </Button>
                    {user && user.username === item.username && <DeleteButton postId={item.id}/>}
                </Div>
            </View>
        </View>
    );
}
