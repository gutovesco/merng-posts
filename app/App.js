import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Routes from './routes/Route';
import { ThemeProvider } from 'react-native-magnus';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AuthProvider } from './hooks/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
})

const authLink = setContext(async () => {
  const token = await AsyncStorage.getItem("token");
  const formattedToken = token.replace(/['"]+/g, '');
  console.log(`Bearer ${formattedToken}`)
  return {
    headers: {
      Authorization: token ? `Bearer ${formattedToken}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NavigationContainer>
          <ThemeProvider>
            <StatusBar barStyle="light-content" backgroundColor="#312e38" />
            <Routes />
          </ThemeProvider>
        </NavigationContainer>
      </AuthProvider>
    </ApolloProvider>
  );
}