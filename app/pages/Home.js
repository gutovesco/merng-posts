import React, { useContext } from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-magnus'
import { AuthContext } from '../hooks/auth'

export default function Home({ navigation }) {
    const context = useContext(AuthContext);

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
