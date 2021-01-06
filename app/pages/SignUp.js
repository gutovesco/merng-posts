import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native';
import { Div, Text, Button, Input } from 'react-native-magnus';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({ navigation }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        const getToken = async () => {
            const token = await AsyncStorage.getItem("token")
            console.log(token)
        }
        getToken()
    }, [])

    function handleSubmit() {
        console.log('values')
    }

    return (
        <SafeAreaView>
            <Div px="md" mx="md" mt="xl">
                <Icon onPress={() => navigation.goBack()} name="rocket" size={30} color="#900" />
            </Div>

            <Div px="md" mx="md" mt="xl">
                <Div mt="md" pt="2xl">
                    <Text fontSize="md" mb="sm">Username</Text>
                    <Input
                        defaultValue={name}
                        rounded="sm"
                        bg="gray100"
                        borderWidth={0}
                        onChangeText={text => setName(text)}
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
                    />
                </Div>
                <Div mt="xl">
                    <Text fontSize="md" mb="sm">Confirm Password</Text>
                    <Input
                        bg="gray100"
                        secureTextEntry
                        rounded="sm"
                        borderWidth={0}
                    />
                </Div>
                <Button onPress={handleSubmit} block bg="teal500" py="lg" mt="2xl">Register</Button>
            </Div>
        </SafeAreaView>
    )
}
