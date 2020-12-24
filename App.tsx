import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {CONTAINERS} from './src/config/Const';
import Splash from './src/containers/Splash';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={CONTAINERS.SPLASH} component={Splash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
