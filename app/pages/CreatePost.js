/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import HeaderComponent from '../components/Header';
import { CREATE_POST_MUTATION } from '../graphql/mutations';
import { FETCH_POSTS_QUERY } from '../graphql/querry';
import { useMutation } from '@apollo/client';
import { Div, Text, Button, Input } from 'react-native-magnus';

export default function CreatePost({ navigation }) {
  const [postBody, setPostBody] = useState('');

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      body: postBody,
    },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [
            result.data.createPost,
            ...data.getPosts,
          ],
        },
      });
      navigation.push('home');
    },
  });

  return (
    <SafeAreaView>
      <HeaderComponent isHome={false} navigation={navigation} />
      <Div px="md" mx="md">
        <Text fontWeight="bold" mt="2xl" mb="2xl" ml="sm" fontSize={30}>
          Create a new post
        </Text>
        <Input
          style={{
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
          }}
          blurOnSubmit={true}
          placeholder="What do you have in mind ?"
          rounded="sm"
          bg="gray100"
          borderWidth={2}
          borderColor="teal500"
          defaultValue={postBody}
          onChangeText={text => setPostBody(text)}
        />
        <Button onPress={createPost} block bg="teal500" py="lg" mt="md">Publish</Button>
      </Div>
    </SafeAreaView>
  );
}
