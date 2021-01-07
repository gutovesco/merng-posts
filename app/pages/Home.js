import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text, Button, Overlay } from 'react-native-magnus'
import { AuthContext } from '../hooks/auth'

export default function Home({ navigation }) {
    const context = useContext(AuthContext);
    const [overlayVisible, setOverlayVisible] = useState(false);

    if (!context.user) {
        useEffect(() => {
            setOverlayVisible(true)
        }, [])
        return (
            <Overlay visible={overlayVisible} p="xl">
                <Text mt="md">You're not logged in, click in the button below and log in to continue!</Text>
                <Button onPress={() => navigation.push('signin')} block bg="teal500" py="lg" mt="md">Log in</Button>
            </Overlay>
        )
    }

    function logoff() {
        context.logout()
        navigation.push('signin')
    }

    return (
        <View>
            <Text>Home</Text>
            <Button onPress={logoff} bg="teal500">Logoff</Button>
        </View>
    )
}
