import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Home } from '@/src/pages/User/Home';

const App = createStackNavigator();

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <App.Navigator>
        <App.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            headerMode: 'screen',
            cardStyle: { backgroundColor: 'transparent' },
          }}
        />
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
