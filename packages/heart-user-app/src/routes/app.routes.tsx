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
import { SessionProvider } from '@/src/components/Session/SessionProvider';
import { PatientHome } from '@/src/pages/User/Home';
import { PatientExercises } from '@/src/pages/User/PatientExercises';
import { ExerciseRegister } from '@/src/pages/User/ExerciseRegister';
import { ExerciseList } from '@/src/pages/User/ExerciseList';
import { EvaluatorReport } from '@/src/pages/Admin/Evaluator/EvaluatorReport';
import { Hemodynamics } from '@/src/pages/Admin/Evaluator/Reports/Hemodynamics';
import { ExerciseUserData } from '../pages/User/ExerciseUserData';

const App = createStackNavigator();
const Stack = createStackNavigator();

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
        <Stack.Navigator initialRouteName='PatientManagement'>
          <Stack.Screen name="Authentication" component={Auth} options={screenOptions} />
          <Stack.Screen name="ForgotPasswordChoose" component={ForgotPasswordChoose} options={screenOptions} />
          <Stack.Screen name="EvaluatorForget" component={ForgotPasswordEvaluator} options={screenOptions} />
          <Stack.Screen name="EvaluatorHome" component={EvaluatorHome} options={screenOptions} />
          <Stack.Screen name="Hemodynamics" component={Hemodynamics} options={screenOptions} />
          <Stack.Screen name="EvaluatorOptions" component={EvaluatorOptions} options={screenOptions} />
          <Stack.Screen name="EvaluatorReports" component={EvaluatorReport} options={screenOptions} />
          <Stack.Screen name="EvaluatorRegister" component={EvaluatorRegister} options={screenOptions} />
          <Stack.Screen name="AnyUserData" component={AnyDataUser} options={screenOptions} />
          <Stack.Screen name="ExerciseUserData" component={ExerciseUserData} options={screenOptions} />
          <Stack.Screen name="AccountManagement" component={AccountManagement} options={screenOptions} />
          <Stack.Screen name="PatientManagement" component={PatientManagement} options={screenOptions} />
          <Stack.Screen name="PatientExercises" component={PatientExercises} options={screenOptions} />
          <Stack.Screen name="ExercisesList" component={ExerciseList} options={screenOptions} />
          <Stack.Screen name="PatientExerciseRegister" component={ExerciseRegister} options={screenOptions} />
          <Stack.Screen name="PatientRegister" component={PatientRegister} options={screenOptions} />
          <Stack.Screen name="PatientOptions" component={PatientOptions} options={screenOptions} />
          <Stack.Screen name="Home" component={PatientHome} options={screenOptions} />
        </Stack.Navigator>
      </SessionProvider>
    </NavigationContainer>
  );
};

export default AppRoutes;