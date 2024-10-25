import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import styles from './Styles/homeStyles';
import ExerciseSelector from './Forms/ExerciseSelector';
import TimerControl from './Forms/TimerControl';
import { MaterialIcons } from '@expo/vector-icons';
import BpmModal from './BpmModal';

const Home = ({ route, navigation }) => {
    const { usuario, pacienteId } = route.params || {};
    const [paciente, setPaciente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [atividade, setAtividade] = useState('');
    const [bpmAntes, setBpmAntes] = useState('');
    const [bpmDepois, setBpmDepois] = useState('');
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [showBpmDepoisInput, setShowBpmDepoisInput] = useState(false);
    const [hideBpmAntesInput, setHideBpmAntesInput] = useState(false);
    const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
    const [saudacao, setSaudacao] = useState(''); // Estado para armazenar a saudação

    const handleLogout = () => {
        navigation.navigate('Login');
    };

    const formatarData = (data) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(data).toLocaleDateString('pt-BR', options);
    };

    const fetchPaciente = async () => {
        if (pacienteId) {
            try {
                const url = `http://192.168.100.21:5000/pacientes/listar/${pacienteId}`;
                const response = await axios.get(url);
                if (response.data) {
                    setPaciente(response.data);
                } else {
                    setError('Nenhum paciente encontrado.');
                }
            } catch (error) {
                setError('Erro ao buscar paciente.');
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPaciente();
    }, []);

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
        determinarSaudacao(); // Chama a função ao carregar o componente
    }, []);

    const handleAfterActivity = () => {
        setIsRunning(false);
        setShowBpmDepoisInput(true);
    };

    const salvarAtividade = async () => {
        if (!bpmAntes || !bpmDepois || !atividade) {
            Alert.alert('Erro', 'Todos os campos devem ser preenchidos!');
            return;
        }

        try {
            const url = `http://192.168.100.21:5000/atividades/cadastrar`;
            const data = {
                paciente_id: paciente.id,
                atividade,
                bpmAntes,
                bpmDepois,
            };
            await axios.post(url, data);
            Alert.alert('Sucesso', 'Atividade salva com sucesso!');
            resetarEstado();
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Erro ao salvar a atividade.');
        }
    };

    const resetarEstado = () => {
        setAtividade('');
        setBpmAntes('');
        setBpmDepois('');
        setTimer(0);
        setShowBpmDepoisInput(false);
        setHideBpmAntesInput(false);
    };

    const handleStartTimer = () => {
        setHideBpmAntesInput(true);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{saudacao}, {usuario ? usuario : 'Usuário desconhecido'}!</Text>
            </View>
            {loading ? (
                <Text style={styles.loadingText}>Carregando dados do paciente...</Text>
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : paciente ? (
                <View style={styles.patientInfo}>
                    <Text style={styles.patientText}>
                        <MaterialIcons name="person" size={20} color="#4CAF50" style={styles.patientIcon} />
                        Nome: {paciente.nome_completo}
                    </Text>
                    <Text style={styles.patientText}>
                        <MaterialIcons name="fingerprint" size={20} color="#4CAF50" style={styles.patientIcon} />
                        CPF: {paciente.cpf}
                    </Text>
                    <Text style={styles.patientText}>
                        <MaterialIcons name="cake" size={20} color="#4CAF50" style={styles.patientIcon} />
                        Data de Nascimento: {formatarData(paciente.data_nascimento)}
                    </Text>
                </View>
            ) : null}

            <ExerciseSelector setAtividade={setAtividade} />

            {atividade ? (
                <>
                    {!hideBpmAntesInput && (
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o BPM antes da atividade"
                            value={bpmAntes}
                            onChangeText={setBpmAntes}
                            keyboardType="numeric"
                        />
                    )}
                    <TimerControl
                        bpmAntes={bpmAntes}
                        isRunning={isRunning}
                        setIsRunning={setIsRunning}
                        timer={timer}
                        setTimer={setTimer}
                        handleAfterActivity={handleAfterActivity}
                        resetarEstado={resetarEstado}
                        onStartTimer={handleStartTimer}
                    />
                </>
            ) : null}

            {showBpmDepoisInput ? (
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o BPM depois da atividade"
                        value={bpmDepois}
                        onChangeText={setBpmDepois}
                        keyboardType="numeric"
                    />
                    {bpmAntes && bpmDepois ? (
                        <TouchableOpacity style={styles.button} onPress={salvarAtividade}>
                            <Text style={styles.buttonText}>Salvar Atividade</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            ) : null}

            {/* Botão para abrir o modal */}
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>COMO AFERIR BATIMENTO POR MINUTO?</Text>
            </TouchableOpacity>

            {/* Componente de modal */}
            <BpmModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Home;
