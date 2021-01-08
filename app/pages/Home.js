import React from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import { Text, Button, Div } from 'react-native-magnus'
import { gql, useQuery } from '@apollo/client';
import HomeCard from '../components/HomeCard';
import HeaderComponent from '../components/Header'

export default function Home() {
    const { data } = useQuery(FETCH_POSTS_QUERY);

    return (
        <SafeAreaView>
            <HeaderComponent />
            <Div row alignItems="center">
                <Text fontWeight="bold" mt="2xl" mb="2xl" ml="lg" fontSize={30}>
                    New posts
                </Text>
                <Button style={{ marginBottom: 5 }} alignSelf="flex-end" bg="white" fontWeight="bold" mb="xl" fontSize={15} color="blue400">
                    Create new post
                </Button>
            </Div>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data ? data.getPosts : []}
                renderItem={({ item }) => {
                    return (
                        <HomeCard item={item} />
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