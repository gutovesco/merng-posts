/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { Text, Button, Div, Header, Image } from 'react-native-magnus';
import { AuthContext } from '../hooks/auth';

export default function HeaderComponent({ navigation, isHome }) {
    const context = useContext(AuthContext);

    function logoff() {
        context.logout();
        navigation.push('signin');
    }
    return (
        <Header
            suffix={
                <Button alignItems="center" bg="white" onPress={logoff}>
                    <Image h={25} w={25} mr="md" source={{ uri: 'https://cdn.icon-icons.com/icons2/1456/PNG/512/mbrilogout_99583.png' }} />
                    <Text>Exit</Text>
                </Button>}
            prefix={
                <Div row alignItems="center">
                    {!isHome && <Image onMagicTap={() => navigation.goBack()} mr="lg" h={25} w={25} source={{ uri: 'https://cdn.icon-icons.com/icons2/38/PNG/512/back_arrow_5821.png' }} />}
                    <Button bg="gray200" p="none" onPress={() => navigation.goBack()} rounded="circle">
                        <Image h={50} w={50} source={{ uri: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80' }} />
                    </Button>
                    <Text fontSize={17} ml="lg">{context && context.user ? context.user.username : ''}</Text>
                </Div>}
        />
    );
}
