import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'; // Importando o Modal do react-native-modal
import axios from 'axios';
import styles from './Styles/CadastrarAvaliadorStyles';

const CadastrarAvaliador = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [role, setRole] = useState('evaluator');
    const [isModalVisible, setModalVisible] = useState(false);

    const handleCadastrar = async () => {
        try {
            const response = await axios.post('http://localhost:5000/evaluators/cadastrar', {
                nome,
                email,
                senha,
                role,
            });
            Alert.alert('Sucesso', response.data.message);
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao cadastrar avaliador:', error);
            Alert.alert('Erro', error.response?.data.message || 'Não foi possível cadastrar o avaliador.');
        }
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const selectRole = (selectedRole) => {
        setRole(selectedRole); // Define o papel selecionado
        toggleModal(); // Fecha o modal
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar Avaliador</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            <TouchableOpacity onPress={toggleModal} style={styles.roleSelector}>
                <Text style={styles.roleText}>Papel: {role === 'evaluator' ? 'Avaliador' : 'Administrador'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleCadastrar} style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Cadastrar</Text>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Selecione um Papel</Text>
                        <TouchableOpacity onPress={() => selectRole('evaluator')} style={styles.modalOption}>
                            <Text style={styles.modalOptionText}>Avaliador</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectRole('admin')} style={styles.modalOption}>
                            <Text style={styles.modalOptionText}>Administrador</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default CadastrarAvaliador;
