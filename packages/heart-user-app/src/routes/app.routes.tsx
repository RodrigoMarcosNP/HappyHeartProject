import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { EvaluatorHome } from '@/src/pages/Admin/Home';
import { EvaluatorOptions } from '@/src/pages/Admin/Evaluator/EvaluatorOptions';
import { PatientOptions } from '@/src/pages/Admin/Patient/PatientOptions';
import { EvaluatorRegister } from '@/src/pages/Admin/Evaluator/EvaluatorRegister';
import { Auth } from '@/src/pages/Auth/Auth';
import { ForgotPasswordChoose } from '@/src/pages/Auth/ForgotPasswordChoose';
import { ForgotPasswordEvaluator } from '@/src/pages/Auth/ForgotPasswordEvaluator';
import { AccountManagement } from '@/src/pages/Admin/AccountManagement';
import { AnyDataUser } from '@/src/pages/User/AnyUserData';
import { PatientRegister } from '@/src/pages/Admin/Patient/PatientRegister';
import { PatientManagement } from '@/src/pages/Admin/Patient/PatientManagement';
import { SessionProvider } from '../components/Session/SessionProvider';
import { PatientHome } from '../pages/User/Home';

const App = createStackNavigator();

const screenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' },
};

export type RootStackParamList = {
  Authentication: undefined;
  ForgotPasswordChoose: undefined;
  EvaluatorForget: undefined;
  EvaluatorHome: undefined;
  EvaluatorOptions: undefined;
  EvaluatorRegister: undefined;
  AnyUserData: undefined;
  AccountManagement: undefined;
  PatientManagement: undefined;
  PatientRegister: undefined;
  PatientOptions: undefined;
  Home: undefined;
};

const AppRoutes = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <SessionProvider>
        <App.Navigator initialRouteName='Home'>
          <App.Screen name="Authentication" component={Auth} options={screenOptions} />
          <App.Screen name="ForgotPasswordChoose" component={ForgotPasswordChoose} options={screenOptions} />
          <App.Screen name="EvaluatorForget" component={ForgotPasswordEvaluator} options={screenOptions} />
          <App.Screen name="EvaluatorHome" component={EvaluatorHome} options={screenOptions} />
          <App.Screen name="EvaluatorOptions" component={EvaluatorOptions} options={screenOptions} />
          <App.Screen name="EvaluatorRegister" component={EvaluatorRegister} options={screenOptions} />
          <App.Screen name="AnyUserData" component={AnyDataUser} options={screenOptions} />
          <App.Screen name="AccountManagement" component={AccountManagement} options={screenOptions} />
          <App.Screen name="PatientManagement" component={PatientManagement} options={screenOptions} />
          <App.Screen name="PatientRegister" component={PatientRegister} options={screenOptions} />
          <App.Screen name="PatientOptions" component={PatientOptions} options={screenOptions} />
          <App.Screen name="Home" component={PatientHome} options={screenOptions} />
      </App.Navigator>
      </SessionProvider>
    </NavigationContainer>
  );
};

export default AppRoutes;