/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Div, Text, Button, Input, Image, Overlay } from 'react-native-magnus';
import { LOGIN_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../hooks/auth';

const LOGO_URL = 'https://i.ibb.co/mHcK0gG/Screenshot-1.png';

export default function SignIn({ navigation }) {
    const context = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [overlayVisible, setOverlayVisible] = useState(false);

    const values = {
        username: username,
        password: password,
    };

    const [loginUser] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            navigation.push('home');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
            setOverlayVisible(true);
        },
        variables: values,
    });

    function loginUserCallback() {
        loginUser();
    }

    return (
        <SafeAreaView>
            {errors && (
                <Overlay visible={overlayVisible} p="xl">
                    {errors.username && <Text mt="md">{errors.username}</Text>}
                    {errors.password && <Text mt="md">{errors.password}</Text>}
                    {errors.general && <Text mt="md">{errors.general}</Text>}
                    <Button onPress={() => setOverlayVisible(false)} block bg="teal500" py="lg" mt="md">Close</Button>
                </Overlay>
            )}
            <ScrollView>
                <Div px="md" mx="md" mt="3xl">
                    <Image mt="xl" resizeMode="contain" w="100%" h={100} justifyContent="center" source={{ uri: LOGO_URL }} />
                    <Div mt="md" pt="2xl">
                        <Text fontSize="md" mb="sm">Username</Text>
                        <Input
                            rounded="sm"
                            bg="gray100"
                            borderWidth={0}
                            defaultValue={username}
                            onChangeText={text => setUsername(text)}
                        />
                    </Div>
                    <Div mt="xl">
                        <Text fontSize="md" mb="sm">Password</Text>
                        <Input
                            mb="2xl"
                            bg="gray100"
                            secureTextEntry
                            rounded="sm"
                            borderWidth={0}
                            defaultValue={password}
                            onChangeText={text => setPassword(text)}
                        />
                    </Div>
                    <Button onPress={loginUserCallback} block bg="teal500" py="lg" mt="md">Login</Button>

                    <Div justifyContent="center" alignItems="center" flexDir="row" mt="lg">
                        <Text fontSize="md">Don't have an account?</Text>
                        <Button onPress={() => navigation.push('signup')} bg="white" fontSize="md" color="blue500" fontWeight="bold">Register here</Button>
                    </Div>
                </Div>
            </ScrollView>
        </SafeAreaView>
    );
}

