import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Auth } from '@/src/pages/Auth';

const App = createStackNavigator();

const AuthRoutes = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <App.Navigator>
        <App.Screen name="Auth" component={Auth} />
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AuthRoutes;
