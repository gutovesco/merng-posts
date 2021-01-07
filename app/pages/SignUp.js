import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native';
import { Div, Text, Button, Input, Overlay } from 'react-native-magnus';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../hooks/auth'
import { gql, useMutation } from '@apollo/client';

export default function SignUp({ navigation }) {
    const context = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({})
    const [overlayVisible, setOverlayVisible] = useState(false);

    const values = {
        username: username,
        password: password,
        email: email,
        confirmPassword: confirmPassword
    }

    const [registerUser] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData)
            navigation.push('home')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
            console.log(errors)
            setOverlayVisible(true)
        },
        variables: values
    })

    function handleSubmit() {
        registerUser()
    }

    return (
        <SafeAreaView>
            {errors && (
                <Overlay visible={overlayVisible} p="xl">
                    {errors.username && <Text mt="md">{errors.username}</Text>}
                    {errors.general && <Text mt="md">{errors.general}</Text>}
                    {errors.email && <Text mt="md">{errors.email}</Text>}
                    {errors.password && <Text mt="md">{errors.password}</Text>}
                    {errors.confirmPassword && <Text mt="md">{errors.confirmPassword}</Text>}
                    <Button onPress={() => setOverlayVisible(false)} block bg="teal500" py="lg" mt="md">Close</Button>
                </Overlay>
            )}
            <Div px="md" mx="md" mt="xl">
                <Icon onPress={() => navigation.goBack()} name="arrow-left" size={30} color="#900" />
            </Div>

            <Div px="md" mx="md" mt="xl">
                <Div mt="md" pt="2xl">
                    <Text fontSize="md" mb="sm">Username</Text>
                    <Input
                        defaultValue={username}
                        rounded="sm"
                        bg="gray100"
                        borderWidth={0}
                        onChangeText={text => setUsername(text)}
                    />
                </Div>
                <Div mt="xl">
                    <Text fontSize="md" mb="sm">E-mail</Text>
                    <Input
                        rounded="sm"
                        bg="gray100"
                        borderWidth={0}
                        defaultValue={email}
                        onChangeText={text => setEmail(text)}
                    />
                </Div>
                <Div mt="xl">
                    <Text fontSize="md" mb="sm">Password</Text>
                    <Input
                        bg="gray100"
                        secureTextEntry
                        rounded="sm"
                        borderWidth={0}
                        defaultValue={password}
                        onChangeText={text => setPassword(text)}
                    />
                </Div>
                <Div mt="xl">
                    <Text fontSize="md" mb="sm">Confirm Password</Text>
                    <Input
                        bg="gray100"
                        secureTextEntry
                        rounded="sm"
                        borderWidth={0}
                        defaultValue={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                    />
                </Div>
                <Button onPress={handleSubmit} block bg="teal500" py="lg" mt="2xl">Register</Button>
            </Div>
        </SafeAreaView>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id email username createdAt token
        }
    }
`;