import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, SafeAreaView } from 'react-native';
import Routes from './routes/Route';
import { ThemeProvider } from 'react-native-magnus';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AuthProvider } from './hooks/auth'

const client = new ApolloClient({
  uri: 'http://localhost:5000',
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