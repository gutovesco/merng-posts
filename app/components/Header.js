/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { Text, Button, Div, Header, Image, Avatar } from 'react-native-magnus';
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
                <Div row alignItems="center" mt="sm">
                    {!isHome &&
                    <Button alignItems="center" bg="white" onPress={() => navigation.goBack()}>
                        <Image mr="lg" h={25} w={25} source={{ uri: 'https://cdn.icon-icons.com/icons2/38/PNG/512/back_arrow_5821.png' }} />
                    </Button>}
                    <Button bg="gray200" p="none" rounded="circle">
                        <Avatar bg="red300" size={40} color="red800">{context.user ? (context.user.username).substr(0, 1).toUpperCase() : ''}</Avatar>
                    </Button>
                    <Text fontSize={17} pb="md" ml="lg">{context && context.user ? context.user.username : ''}</Text>
                </Div>}
        />
    );
}
