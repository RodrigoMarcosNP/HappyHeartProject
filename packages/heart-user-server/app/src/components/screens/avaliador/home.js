import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import styles from './Styles/HomeAvaliadorStyles';

const HomeAvaliador = ({ route, navigation }) => {
    const { usuario } = route.params || {};
    const [pacientes, setPacientes] = useState([]);
    const [saudacao, setSaudacao] = useState(''); // Estado para armazenar a saudação

    // Função para buscar pacientes do backend
    const fetchPacientes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/pacientes/listar');
            setPacientes(response.data);
        } catch (error) {
            console.error('Erro ao buscar pacientes:', error);
        }
    };

    // Usar useFocusEffect para buscar pacientes sempre que a tela ganhar foco
    useFocusEffect(
        useCallback(() => {
            fetchPacientes();
        }, [])
    );

    // Função para determinar a saudação com base na hora atual
    const determinarSaudacao = () => {
        const agora = new Date();
        const horas = agora.getHours();

        if (horas >= 0 && horas < 12) {
            setSaudacao('Bom dia');
        } else if (horas >= 12 && horas < 18) {
            setSaudacao('Boa tarde');
        } else {
            setSaudacao('Boa noite');
        }
    };

    useEffect(() => {
        determinarSaudacao(); // Define a saudação ao carregar a tela
    }, []);

    const handlePacientePress = (paciente) => {
        navigation.navigate('PacienteDetalhes', { paciente, avaliador: usuario });
    };

    const renderPaciente = ({ item }) => (
        <TouchableOpacity onPress={() => handlePacientePress(item)} style={styles.paciente}>
            <Text style={styles.pacienteText}>{item.nome}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text>{saudacao}, {usuario ? usuario : 'Usuário desconhecido'}!</Text>
            <Text style={styles.title}>Pacientes Cadastrados:</Text>
            <FlatList
                data={pacientes}
                renderItem={renderPaciente}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default HomeAvaliador;
