/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Div, Text } from 'react-native-magnus';
import HeaderComponent from '../components/Header';

export default function Comments({ route, navigation }) {
    const { params } = route;
    console.log(params);
    return (
        <SafeAreaView>
            <HeaderComponent isHome={false} navigation={navigation} />
            <Div px="md" mx="md">
                <Text fontWeight="bold" mt="2xl" mb="2xl" ml="sm" fontSize={30}>Comments</Text>
            </Div>
        </SafeAreaView>


    );
}
