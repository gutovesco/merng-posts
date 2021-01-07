import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, FlatList, View } from 'react-native'
import { Text, Button, Div, Icon, Header, Image, Avatar } from 'react-native-magnus'
import { AuthContext } from '../hooks/auth'

export default function Home({ navigation }) {
    const [liked, setLiked] = useState(false)
    const context = useContext(AuthContext);

    function logoff() {
        context.logout()
        navigation.push('signin')
    }

    const unlikedURL = 'https://cdn.icon-icons.com/icons2/38/PNG/512/like_favorite_heart_5759.png'
    const likedURL = 'https://cdn.icon-icons.com/icons2/2073/PNG/512/heart_like_love_twitter_icon_127132.png'

    return (
        <SafeAreaView>
            <Header suffix={
                <Button alignItems="center" bg="white" onPress={logoff}>
                    <Image h={25} w={25} mr='md' source={{ uri: 'https://cdn.icon-icons.com/icons2/1456/PNG/512/mbrilogout_99583.png' }} />
                    <Text>Exit</Text>
                </Button>}
                prefix={
                    <Div row alignItems="center">
                        <Button bg="gray200" p="none" rounded="circle">
                            <Image h={50} w={50} source={{ uri: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80' }} />
                        </Button>
                        <Text fontSize={17} ml="lg">{context && context.user ? context.user.username : ''}</Text>
                    </Div>} />
            <Text fontWeight="bold" mt="2xl" mb="2xl" ml="lg" fontSize={30}>
                New posts
                </Text>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{
                    height: 170,
                    width: "93%",
                    backgroundColor: "white",
                    borderRadius: 15,
                    padding: 10,
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
                        <Avatar bg="red300" size={40} color="red800">A</Avatar>
                        <Text fontSize={15} ml="lg">Nome</Text>
                    </Div>
                    <Text mt="sm">dawoindwaodnawdawnawiodnawuidnawiudwbawidbawiawdbuiawbdidawbuiubidawuibdabuawd</Text>
                    <Div row alignItems="center" mt="lg">
                        <Button onPress={() => setLiked(!liked)} bg="gray100" borderColor="#e6e6e6" borderWidth={1} mr="md" rounded="circle" size={50} color="red800">
                            <Image h={23} w={23} source={{ uri: liked ? likedURL : unlikedURL }} />
                        </Button>
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

        </SafeAreaView >
    )
}
