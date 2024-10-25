import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import styles from './Styles/CadastroPacienteStyles';

const CadastroPaciente = ({ navigation }) => {  
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cpf, setCpf] = useState('');
    const [usuario, setUsuario] = useState(''); // Estado para armazenar o nome do usuário

    useEffect(() => {
        // Recupera o nome do usuário do AsyncStorage
        const getUsuarioLogado = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                if (userToken) {
                    const userData = JSON.parse(userToken);
                    setUsuario(userData.name); // Armazena o nome do usuário
                }
            } catch (error) {
                console.error('Erro ao recuperar o nome do usuário:', error);
            }
        };
        getUsuarioLogado();
    }, []);

    const formatarData = (value) => {
        const apenasNumeros = value.replace(/\D/g, '');
        if (apenasNumeros.length <= 2) return apenasNumeros; // Dia
        if (apenasNumeros.length <= 4) return `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2)}`; // Dia/Mês
        return `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2, 4)}/${apenasNumeros.slice(4, 8)}`; // Dia/Mês/Ano
    };

    const handleDataChange = (value) => {
        const dataFormatada = formatarData(value);
        setDataNascimento(dataFormatada);
    };

    const cadastrarPaciente = async () => {
        try {
            const partesData = dataNascimento.split('/');
            if (partesData.length !== 3) {
                Alert.alert('Erro', 'Por favor, insira uma data válida no formato DD/MM/AAAA.');
                return;
            }
    
            const [dia, mes, ano] = partesData;
            if (!dia || !mes || !ano) {
                Alert.alert('Erro', 'Por favor, insira uma data válida.');
                return;
            }
    
            const dataFormatada = `${ano}-${mes}-${dia}`;
            const response = await fetch('http://localhost:5000/pacientes/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome_completo: nomeCompleto,
                    data_nascimento: dataFormatada,
                    cpf: cpf,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                Alert.alert('Cadastro realizado com sucesso', `Paciente ID: ${data.id}`);
                setNomeCompleto('');
                setDataNascimento('');
                setCpf('');
    
                // Redireciona para a tela HomeAvaliador e passa o nome do usuário logado
                navigation.navigate('HomeAvaliador', { usuario: usuario }); // Passa o nome do usuário logado
            } else {
                Alert.alert('Erro', 'Não foi possível cadastrar o paciente');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Erro ao conectar com o servidor');
        }
    };    

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome Completo:</Text>
            <TextInput
                style={styles.input}
                value={nomeCompleto}
                onChangeText={setNomeCompleto}
            />
            <Text style={styles.label}>Data de Nascimento:</Text>
            <TextInput
                style={styles.input}
                value={dataNascimento}
                onChangeText={handleDataChange}
                placeholder="DD/MM/AAAA"
                keyboardType="numeric"
            />
            <Text style={styles.label}>CPF:</Text>
            <TextInput
                style={styles.input}
                value={cpf}
                onChangeText={setCpf}
                placeholder="000.000.000-00"
            />
            <TouchableOpacity style={styles.button} onPress={cadastrarPaciente}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CadastroPaciente;
