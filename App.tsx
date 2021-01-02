import 'react-native-gesture-handler';

import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { configureStore } from './src/redux/store'
import { Containers } from './src/config/Const';
import { Home } from './src/containers';
import { HomeProps } from './src/redux/types/NavigationTypes'
import { HeaderHome } from './src/components'
import { CurrencyCodes } from './src/redux/types/CryptoTypes';

const Stack = createStackNavigator();
const defaultCurrency = CurrencyCodes.EUR;

const App = () => {
  return (
    <Provider store={configureStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            initialParams={{ currency: defaultCurrency }}
            options={(props) => HeaderHome(props as HomeProps, defaultCurrency)}
            name={Containers.HOME}
            component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
