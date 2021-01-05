import React from 'react'
import { View } from 'react-native'
import { Button, Div, Text } from 'react-native-magnus';

export default function SignIn({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen - login page</Text>
            <Div row flexWrap="wrap">
                <Button
                onPress={() => navigation.push('signup')}
                    mt="lg"
                    ml="lg"
                    px="xl"
                    py="lg"
                    bg="red500"
                    color="white"
                    underlayColor="red600">Contact Us</Button>
            </Div>
        </View>
    )
}
