import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './app/src/components/forms/pacientes/login';
import Avaliador from './app/src/components/Avaliador';
import CadastroPaciente from './app/src/components/forms/pacientes/CadastroPaciente';
import HomePaciente from './app/src/components/screens/usuario/home';
import HomeAvaliador from './app/src/components/screens/avaliador/home';
import LoginAvaliador from './app/src/components/forms/Avaliadores/login';
import PacienteDetalhes from './app/src/components/screens/avaliador/PacienteDetalhes';
import RecuperarSenha from './app/src/components/forms/Avaliadores/RecuperarSenha';
import CadastrarAvaliador from './app/src/components/forms/Avaliadores/CadastrarAvaliador';
import AvaliacaoHemodinamica from './app/src/components/screens/avaliador/Forms/AvaliacaoHemodinamica';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ navigation }) => {
    const [userRole, setUserRole] = useState(null);

    // Função para obter o papel do usuário armazenado
    const fetchUserRole = async () => {
        try {
            const userData = await AsyncStorage.getItem('userToken');
            if (userData) {
                const user = JSON.parse(userData);
                setUserRole(user.role); // Assume que o role está incluído no token
            }
        } catch (error) {
            console.error('Erro ao buscar o papel do usuário:', error);
        }
    };

    useEffect(() => {
        fetchUserRole(); // Busca o papel do usuário ao montar o componente
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            navigation.navigate('MainTabs', { screen: 'Login' });
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <Drawer.Navigator initialRouteName="HomeAvaliador">
            <Drawer.Screen name="HomeAvaliador" component={HomeAvaliador} />
            <Drawer.Screen name="Cadastrar Paciente" component={CadastroPaciente} />
            {userRole === 'admin' && ( // Exibe apenas se o usuário for admin
                <Drawer.Screen name="Cadastrar Avaliador" component={CadastrarAvaliador} />
            )}
            <Drawer.Screen 
                name="Logout" 
                component={() => null}
                options={{
                    drawerLabel: () => (
                        <TouchableOpacity onPress={handleLogout}>
                            <Text>Sair</Text>
                        </TouchableOpacity>
                    ),
                }} 
            />
        </Drawer.Navigator>
    );
};

// Navegador de abas (Tab Navigator)
const MainTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="LoginAvaliador" component={LoginAvaliador} />
        </Tab.Navigator>
    );
};

// Navegador principal da aplicação
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MainTabs">
                <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="HomePaciente" component={HomePaciente} />
                <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="PacienteDetalhes" component={PacienteDetalhes} />
                <Drawer.Screen name="Avaliação Hemodinâmica" component={AvaliacaoHemodinamica} />
                <Stack.Screen name="Avaliador" component={Avaliador} />
                <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
