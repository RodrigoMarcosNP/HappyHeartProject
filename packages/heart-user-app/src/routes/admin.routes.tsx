import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Home } from '@/src/pages/Admin/Home';
import { EvaluatorOptions } from '@/src/pages/Admin/Evaluator/EvaluatorOptions';

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
        <App.Screen
          name="Avaliador"
          component={EvaluatorOptions}
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
