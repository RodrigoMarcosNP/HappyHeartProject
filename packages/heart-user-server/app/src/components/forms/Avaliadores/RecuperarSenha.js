import React, { useState } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from './Styles/RecuperarSenhaStyles';

const RecuperarSenha = () => {
    const [email, setEmail] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [token, setToken] = useState('');

    const handleRecuperarSenha = async () => {
        if (!email) {
            Alert.alert('Atenção', 'Por favor, insira seu email.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/password/forgot-password', { email });
            Alert.alert('Sucesso', response.data.message);
            setToken(response.data.token);
        } catch (error) {
            console.error('Erro ao recuperar senha:', error);
            if (error.response) {
                Alert.alert('Erro', error.response.data.message || 'Erro ao tentar recuperar a senha.');
            } else {
                Alert.alert('Erro', 'Erro de conexão. Tente novamente.');
            }
        }
    };

    const handleResetarSenha = async () => {
        if (!novaSenha || !token) {
            Alert.alert('Atenção', 'Por favor, insira a nova senha.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/password/reset-password', { token, novaSenha });
            Alert.alert('Sucesso', response.data.message);
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            if (error.response) {
                Alert.alert('Erro', error.response.data.message || 'Erro ao tentar redefinir a senha.');
            } else {
                Alert.alert('Erro', 'Erro de conexão. Tente novamente.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleRecuperarSenha}>
                <Text style={styles.buttonText}>Enviar Token</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Nova Senha"
                value={novaSenha}
                onChangeText={setNovaSenha}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleResetarSenha}>
                <Text style={styles.buttonText}>Redefinir Senha</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RecuperarSenha;
