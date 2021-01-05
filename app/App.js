import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, SafeAreaView } from 'react-native';
import Routes from './routes/Route';
import { ThemeProvider } from 'react-native-magnus';

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" backgroundColor="#312e38" />
          <Routes />
        </SafeAreaView>
      </ThemeProvider>
    </NavigationContainer>
  );
}