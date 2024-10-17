import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Auth } from '@/src/pages/Auth';

import BackgroundImageApp from '@/assets/bg-app-auth.png';

import { ImageBackground } from 'react-native';

const App = createStackNavigator();

const AuthRoutes = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <App.Navigator>
        <App.Screen
          name="Auth"
          component={Auth}
          options={{
            headerShown: false,
            headerMode: 'screen',
            cardStyle: { backgroundColor: 'transparent' },
          }}
        />
      </App.Navigator>
      <ImageBackground source={BackgroundImageApp}></ImageBackground>
    </NavigationContainer>
  );
};


export default AuthRoutes;
