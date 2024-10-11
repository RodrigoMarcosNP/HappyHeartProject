import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '@/src/pages/Home';

const App = createStackNavigator();

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <App.Navigator>
        <App.Screen name="Home" component={Home} />
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
