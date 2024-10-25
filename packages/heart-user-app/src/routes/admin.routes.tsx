import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';

import { Home } from '@/src/pages/Admin/Home';
import { EvaluatorOptions } from '@/src/pages/Admin/Evaluator/EvaluatorOptions';
import { PatientOptions } from '@/src/pages/Admin/Evaluator/PatientOptions';
import EvaluatorRegister from '@/src/pages/Admin/Evaluator/EvaluatorRegister';

const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  headerMode: 'screen',
  cardStyle: { backgroundColor: 'transparent' },
};

const AppRoutes = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="EvaluatorHome" component={Home} options={screenOptions} />
      <Stack.Screen name="EvaluatorOptions" component={EvaluatorOptions} options={screenOptions} />
      <Stack.Screen name="EvaluatorRegister" component={EvaluatorRegister} options={screenOptions} />
      <Stack.Screen name="AccountManagement" component={PatientOptions} options={screenOptions} />
      <Stack.Screen name="Paciente" component={PatientOptions} options={screenOptions} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppRoutes;
