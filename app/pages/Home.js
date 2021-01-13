/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { Text, Button, Div } from 'react-native-magnus';
import { FETCH_POSTS_QUERY } from '../graphql/querry';
import { useQuery } from '@apollo/client';
import HomeCard from '../components/HomeCard';
import HeaderComponent from '../components/Header';

export default function Home({ navigation }) {
    const { data } = useQuery(FETCH_POSTS_QUERY);

    return (
        <SafeAreaView>
            <HeaderComponent isHome={true} navigation={navigation} />
            <Div row alignItems="center">
                <Text fontWeight="bold" mt="xl" mb="xl" ml="lg" fontSize={30}>
                    New posts
                </Text>
                <Button underlayColor="white" onPress={() => navigation.push('createPost')} alignSelf="flex-end" bg="white" fontWeight="bold" mb="xl" fontSize={15} color="blue400">
                    Create new post
                </Button>
            </Div>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data ? data.getPosts : []}
                renderItem={({ item }) => {
                    return (
                        <HomeCard navigation={navigation} item={item} />
                    );
                }}
                keyExtractor={(post) => `${post.id}`}
            />
        </SafeAreaView >
    );
}
