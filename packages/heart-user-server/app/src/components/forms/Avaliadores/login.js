import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage
import styles from './Styles/LoginAvaliadorStyles';

const LoginAvaliador = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            // Fazendo a requisição de login
            const response = await axios.post('http://localhost:5000/evaluators', {
                email: email,
                password: senha,
            });

            // Armazenando os dados do usuário no AsyncStorage
            await AsyncStorage.setItem('userToken', JSON.stringify(response.data.userData));

            // Navegando para o Drawer após o login bem-sucedido
            navigation.navigate('Drawer', {
                screen: 'HomeAvaliador',
                params: { usuario: response.data.userData.name },
            });
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            if (error.response) {
                Alert.alert('Erro', error.response.data.message || 'Email ou senha incorretos.');
            } else {
                Alert.alert('Erro', 'Erro de conexão. Tente novamente.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login do Avaliador</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            <Button title="Entrar" onPress={handleLogin} />
            <Text
                style={styles.link}
                onPress={() => navigation.navigate('RecuperarSenha')}
            >
                Esqueceu sua senha?
            </Text>
        </View>
    );
};

export default LoginAvaliador;
