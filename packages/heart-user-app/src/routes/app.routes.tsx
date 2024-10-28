import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '@/src/pages/Admin/Home';
import { EvaluatorOptions } from '@/src/pages/Admin/Evaluator/EvaluatorOptions';
import { PatientOptions } from '@/src/pages/Admin/Evaluator/PatientOptions';
import EvaluatorRegister from '@/src/pages/Admin/Evaluator/EvaluatorRegister';
import { Auth } from '@/src/pages/Auth/Auth';
import { ForgotPasswordChoose } from '@/src/pages/Auth/ForgotPasswordChoose';
import { ForgotPasswordEvaluator } from '../pages/Auth/ForgotPasswordEvaluator';

const App = createStackNavigator();

const screenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' },
};

const AppRoutes = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <App.Navigator initialRouteName='Authentication'>
        <App.Screen name="Authentication" component={Auth} options={screenOptions} />
        <App.Screen name="ForgotPasswordChoose" component={ForgotPasswordChoose} options={screenOptions} />
        <App.Screen name="EvaluatorForget" component={ForgotPasswordEvaluator} options={screenOptions} />
        <App.Screen name="EvaluatorHome" component={Home} options={screenOptions} />
        <App.Screen name="EvaluatorOptions" component={EvaluatorOptions} options={screenOptions} />
        <App.Screen name="EvaluatorRegister" component={EvaluatorRegister} options={screenOptions} />
        <App.Screen name="AccountManagement" component={PatientOptions} options={screenOptions} />
        <App.Screen name="Paciente" component={PatientOptions} options={screenOptions} />
        <App.Screen name="Home" component={Home} options={screenOptions} />
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
