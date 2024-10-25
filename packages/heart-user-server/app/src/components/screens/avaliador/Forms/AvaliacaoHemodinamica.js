import React, { useState } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity, Text as RNText } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa o hook de navegação
import styles from './Style/AvaliacaoHemodinamicaStyles'; // Importa o arquivo de estilos

const AvaliacaoHemodinamica = ({ route }) => {
    const { paciente, avaliador } = route.params;
    const navigation = useNavigation(); // Usa o hook de navegação

    const [horarioInicio, setHorarioInicio] = useState('');
    const [horarioTermino, setHorarioTermino] = useState('');
    const [fcRepouso, setFcRepouso] = useState('');
    const [paSistolica, setPaSistolica] = useState('');
    const [paDiastolica, setPaDiastolica] = useState('');

    const dataAtual = new Date().toLocaleDateString('pt-BR');

    // Função para enviar os dados para o backend
    const salvarDados = async () => {
        if (!horarioInicio || !horarioTermino || !fcRepouso || !paSistolica || !paDiastolica) {
            Alert.alert('Erro', 'Todos os campos devem ser preenchidos');
            return;
        }

        const dadosAvaliacao = {
            pacienteNome: paciente.nome,
            dataAvaliacao: dataAtual,
            avaliador,
            horarioInicio,
            horarioTermino,
            fcRepouso,
            paSistolica,
            paDiastolica
        };

        try {
            const response = await fetch('http://localhost:5000/api/salvar-avaliacao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosAvaliacao),
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Dados salvos com sucesso');
                
                // Limpa os campos após salvar
                setHorarioInicio('');
                setHorarioTermino('');
                setFcRepouso('');
                setPaSistolica('');
                setPaDiastolica('');

                // Redireciona para DetalhesPaciente
                navigation.navigate('DetalhesPaciente', { paciente });
            } else {
                Alert.alert('Erro', 'Falha ao salvar os dados');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível conectar ao servidor');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Avaliação Hemodinâmica</Text>
            <Text style={styles.text}>Nome do Paciente: {paciente.nome}</Text>
            <Text style={styles.text}>Data da Avaliação: {dataAtual}</Text>
            <Text style={styles.text}>Avaliador: {avaliador}</Text>

            <Text style={styles.sectionTitle}>AVALIAÇÃO HEMODINÂMICA</Text>
            <Text style={styles.text}>Variabilidade da FC (medição durante 10 minutos em decúbito dorsal):</Text>

            <Text style={styles.text}>Horário de início:</Text>
            <TextInput
                style={styles.input}
                value={horarioInicio}
                onChangeText={setHorarioInicio}
                placeholder="Digite o horário de início"
            />

            <Text style={styles.text}>Término:</Text>
            <TextInput
                style={styles.input}
                value={horarioTermino}
                onChangeText={setHorarioTermino}
                placeholder="Digite o horário de término"
            />

            <Text style={styles.text}>FC de repouso:</Text>
            <TextInput
                style={styles.input}
                value={fcRepouso}
                onChangeText={setFcRepouso}
                placeholder="Digite a FC de repouso"
                keyboardType="numeric"
            />

            <Text style={styles.text}>Pressão arterial (avaliado sentado):</Text>
            <Text style={styles.text}>PA sistólica (PAS):</Text>
            <TextInput
                style={styles.input}
                value={paSistolica}
                onChangeText={setPaSistolica}
                placeholder="Digite a PA sistólica"
                keyboardType="numeric"
            />

            <Text style={styles.text}>PA diastólica (PAD):</Text>
            <TextInput
                style={styles.input}
                value={paDiastolica}
                onChangeText={setPaDiastolica}
                placeholder="Digite a PA diastólica"
                keyboardType="numeric"
            />

            {/* Botão Salvar com TouchableOpacity */}
            <TouchableOpacity style={styles.buttonContainer} onPress={salvarDados}>
                <RNText style={styles.buttonText}>Salvar</RNText>
            </TouchableOpacity>
        </View>
    );
};

export default AvaliacaoHemodinamica;
