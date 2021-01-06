import React from 'react'
import { SafeAreaView } from 'react-native';
import { Div, Text, Button, Input, Image } from 'react-native-magnus';

const LOGO_URL = "https://i.ibb.co/mHcK0gG/Screenshot-1.png";

export default function SignIn({ navigation }) {
    return (
        <SafeAreaView>
            <Div px="md" mx="md" mt="3xl">
                <Image mt="xl" resizeMode="contain" w="100%" h={100} justifyContent="center" source={{ uri: LOGO_URL }} />
                <Div mt="md" pt="2xl">
                    <Text fontSize="md" mb="sm">Email / Username</Text>
                    <Input
                        rounded="sm"
                        bg="gray100"
                        borderWidth={0}
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
                <Button block bg="teal500" py="lg" mt="md">Login</Button>

                <Div justifyContent="center" alignItems="center" flexDir="row" mt="lg">
                    <Text fontSize="md">Don't have an account?</Text>
                    <Button onPress={() => navigation.push('signup')} bg="white" fontSize="md" color="blue500" fontWeight="bold">Register here</Button>
                </Div>
            </Div>
        </SafeAreaView>
    )
}
