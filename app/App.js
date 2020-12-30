import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  Text
} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <Text>This is my app</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
