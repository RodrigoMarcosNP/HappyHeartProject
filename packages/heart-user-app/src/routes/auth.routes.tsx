import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Auth } from '@/src/pages/Auth/Auth';

import BackgroundImageApp from '@/assets/bg-app-auth.png';

import { ImageBackground } from 'react-native';
import { ForgotPasswordChoose } from '@/src/pages/Auth/ForgotPasswordChoose';
import { ForgotPasswordEvaluator } from '../pages/Auth/ForgotPasswordEvaluator';

const App = createStackNavigator();

const AuthRoutes = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <App.Navigator initialRouteName='Authentication'>
        <App.Screen
          name="Authentication"
          component={Auth}
          options={{
            headerShown: false,
            headerMode: 'screen',
            cardStyle: { backgroundColor: 'transparent' },
          }}
        />
        <App.Screen
          name="ForgotPasswordChoose"
          component={ForgotPasswordChoose}
          options={{
            headerShown: false,
            headerMode: 'screen',
            cardStyle: { backgroundColor: 'transparent' },
          }}
        />
        <App.Screen
          name="EvaluatorForget"
          component={ForgotPasswordEvaluator}
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
