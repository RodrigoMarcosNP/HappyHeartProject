import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import styles from './Styles/LoginStyles';

const Login = ({ navigation }) => {
    const [cpf, setCpf] = useState(''); // Alterado para CPF
    const [dataNascimento, setDataNascimento] = useState('');

    // Função para manipular o login
    const handleLogin = async () => {
        if (cpf && dataNascimento) {
            try {
                const response = await axios.post('http://localhost:5000/login', {
                    cpf: cpf, // Usando CPF no login
                    senha: dataNascimento, // Supondo que isso seja a senha
                });

                navigation.navigate('HomePaciente', {
                    usuario: response.data.nome_completo,
                    pacienteId: response.data.id, // Passando o id do paciente aqui
                });
            } catch (error) {
                if (error.response) {
                    Alert.alert('Erro', error.response.data.message);
                } else {
                    Alert.alert('Erro', 'Erro ao conectar ao servidor');
                }
            }
        } else {
            Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Paciente</Text>
            <TextInput
                style={styles.input}
                placeholder="CPF"
                value={cpf} // Usando CPF no input
                onChangeText={setCpf}
                keyboardType="numeric" // Teclado numérico para CPF
            />
            <TextInput
                style={styles.input}
                value={dataNascimento}
                onChangeText={setDataNascimento}
                placeholder="Data de nascimento (DD/MM/AAAA)"
                secureTextEntry={true} // Esconde o texto digitado com asteriscos
            />
            <Button title="Entrar" onPress={handleLogin} />
        </View>
    );
};

export default Login;
