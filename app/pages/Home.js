import React, { useContext } from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import { Text, Button, Div, Header, Image } from 'react-native-magnus'
import { AuthContext } from '../hooks/auth'
import { gql, useQuery } from '@apollo/client';
import HomeCard from '../components/HomeCard';

export default function Home({ navigation }) {
    const context = useContext(AuthContext);
    const { data } = useQuery(FETCH_POSTS_QUERY);

    function logoff() {
        context.logout()
        navigation.push('signin')
    }

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
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data ? data.getPosts : []}
                renderItem={({ item }) => {
                    return (
                        <HomeCard item={item}/>
                    )
                }}
                keyExtractor={(post) => `${post.id}`}
            />
        </SafeAreaView >
    )
}

export const FETCH_POSTS_QUERY = gql`
{
   getPosts{
    id 
    body 
    createdAt 
    username 
    likeCount
    likes{
       username
    }
    commentCount
    comments{
       id username createdAt body
    }
}
}
`