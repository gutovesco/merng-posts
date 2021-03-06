/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import CreatePost from '../pages/CreatePost';
import Comments from '../pages/Comments';

const Stack = createStackNavigator();

const AppRoutes = () => {
    return (
        <Stack.Navigator
            initialRouteName="signin"
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#fff' },
            }}
        >
            <Stack.Screen name="signin" component={SignIn} />
            <Stack.Screen name="signup" component={SignUp} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="createPost" component={CreatePost}/>
            <Stack.Screen name="comments" component={Comments}/>
        </Stack.Navigator>
    );
};

export default AppRoutes;
