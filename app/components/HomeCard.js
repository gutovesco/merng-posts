import React, { useContext } from 'react'
import { View } from 'react-native'
import { Text, Button, Div, Image, Avatar } from 'react-native-magnus'
import LikeButton from '../components/LikedButton'
import { AuthContext } from '../hooks/auth'

export default function HomeCard({ item }) {
    const { user } = useContext(AuthContext);

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{
                minHeight: 150,
                width: "93%",
                backgroundColor: "white",
                borderRadius: 15,
                padding: 10,
                marginBottom: 20,
                shadowColor: "#000",
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
                        <Text ml="lg" color="gray500" fontSize={12}>{item.createdAt}</Text>
                    </Div>
                </Div>
                <Text mt="sm">{item.body}</Text>
                <Div row alignItems="center" mt="lg">
                    <LikeButton user={user} post={item} />
                    <Button bg="gray100" borderColor="#e6e6e6" borderWidth={1} rounded="circle" size={50}>
                        <Image h={24} w={24} source={{ uri: 'https://cdn.icon-icons.com/icons2/806/PNG/512/chat-26_icon-icons.com_65943.png' }} />
                    </Button>
                    <Div position="absolute" mr="sm" style={{ right: 0 }}>
                        <Button bg="white" rounded="circle">
                            <Image h={40} w={40} source={{ uri: 'https://cdn.icon-icons.com/icons2/1380/PNG/512/vcsconflicting_93497.png' }} />
                        </Button>
                    </Div>
                </Div>
            </View>
        </View>
    )
}
