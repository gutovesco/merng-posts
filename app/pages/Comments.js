/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Div } from 'react-native-magnus';
import CommentsCard from '../components/CommentsCard';
import HeaderComponent from '../components/Header';

export default function Comments({ route, navigation }) {
    const { params } = route;
    return (
        <SafeAreaView>
            <HeaderComponent isHome={false} navigation={navigation} />
            <Div px="md" mx="md">
                <CommentsCard item={params.item} />
            </Div>
        </SafeAreaView>
    );
}
