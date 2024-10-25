import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AvaliacaoHemodinamica from './Forms/AvaliacaoHemodinamica';
import AvaliacaoAntropometrica from './Forms/AvaliacaoAntropometrica';
import styles from './Styles/PacienteDetalhesStyles';

// Função para formatar o CPF no formato 000.000.000-00
const formatarCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Função para formatar a data no formato DD/MM/AAAA
const formatarDataNascimento = (data) => {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
};

const Drawer = createDrawerNavigator();

// Componente PacienteDetalhes com o Drawer embutido
const PacienteDetalhesDrawer = ({ paciente, avaliador }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes do Paciente</Text>
            <Text style={styles.detailText}>Id: {paciente.id}</Text>
            <Text style={styles.detailText}>Nome: {paciente.nome}</Text>
            <Text style={styles.detailText}>CPF: {formatarCPF(paciente.cpf)}</Text>
            <Text style={styles.detailText}>Data de nascimento: {formatarDataNascimento(paciente.data_nascimento)}</Text>
            <Text style={styles.detailText}>Avaliador: {avaliador}</Text> {/* Exibe o nome do avaliador */}
        </View>
    );
};

const PacienteDetalhes = ({ route }) => {
    const { paciente, avaliador } = route.params || { paciente: {}, avaliador: {} };

    // Validação de dados
    if (!paciente || !avaliador) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Dados do paciente ou avaliador não disponíveis.</Text>
            </View>
        );
    }

    return (
        <Drawer.Navigator initialRouteName="DetalhesPaciente">
            <Drawer.Screen 
                name="DetalhesPaciente" 
                component={() => <PacienteDetalhesDrawer paciente={paciente} avaliador={avaliador} />} 
                options={{ drawerLabel: 'Detalhes do Paciente' }} 
            />
            <Drawer.Screen 
            name="Avaliação Hemodinâmica" 
            component={AvaliacaoHemodinamica} 
            initialParams={{ paciente: paciente, avaliador: avaliador }} // Envia os parâmetros iniciais
            options={{ drawerLabel: 'Avaliação Hemodinâmica' }} 
            />
            <Drawer.Screen
            name="Avaliação Antropométrica"
            component={AvaliacaoAntropometrica}
            initialParams={{ paciente: paciente, avaliador: avaliador }} // Envia os parâmetros iniciais
            options={{drawerLabel:'Avaliação Antropométrica'}}
            />
        </Drawer.Navigator>
    );
};

export default PacienteDetalhes;
