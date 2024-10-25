import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Para navegação
import styles from './Style/AvaliacaoAntropometricaStyles'; // Importa o arquivo de estilos

const AvaliacaoAntropometrica = ({ route }) => {
    const { paciente, avaliador } = route.params;
    const navigation = useNavigation(); // Usa o hook de navegação

    // Estados para armazenar as variáveis de medida e classificação
    const [estatura, setEstatura] = useState('');
    const [classEstatura, setClassEstatura] = useState('');
    const [peso, setPeso] = useState('');
    const [classPeso, setClassPeso] = useState('');
    const [gPorcentagemTotal, setGPorcentagemTotal] = useState('');
    const [classGPorcentagemTotal, setClassGPorcentagemTotal] = useState('');
    const [mmTotal, setMMTotal] = useState('');
    const [mmMSD, setMmMSD] = useState('');
    const [classMMTotal, setClassMMTotal] = useState('');
    const [mo, setMo] = useState('');
    const [classMo, setClassMo] = useState('');
    const [bmi, setBmi] = useState('');
    const [classBmi, setClassBmi] = useState('');
    const [caloriasDiarias, setCaloriasDiarias] = useState('');
    const [classCaloriasDiarias, setClassCaloriasDiarias] = useState('');
    const [idadeMetabolica, setIdadeMetabolica] = useState('');
    const [classIdadeMetabolica, setClassIdadeMetabolica] = useState('');
    const [aguaCorporal, setAguaCorporal] = useState('');
    const [classAguaCorporal, setClassAguaCorporal] = useState('');
    const [gorduraVisceral, setGorduraVisceral] = useState('');
    const [classGorduraVisceral, setClassGorduraVisceral] = useState('');

    // Estados para "G% MS E"
    const [gMsE, setGMsE] = useState('');
    const [classGMsE, setClassGMsE] = useState('');

    // Estados para "MM MS E"
    const [mmMSE, setMmMSE] = useState('');  // Novo estado para "MM MS E"
    const [classMmMSE, setClassMmMSE] = useState('');  // Estado para a classificação de "MM MS E"

    // Estados para "G% MS D"
    const [gMsD, setGMsD] = useState('');  // Novo estado para "G% MS D"
    const [classGMsD, setClassGMsD] = useState(''); 

    const dataAtual = new Date().toLocaleDateString('pt-BR');

    // Função para salvar os dados
    const salvarDados = async () => {
        // Validação simples dos campos
        if (!estatura || !peso || !gPorcentagemTotal || !mmTotal || !mo || !bmi || !caloriasDiarias || !idadeMetabolica || !aguaCorporal || !gorduraVisceral) {
            Alert.alert('Erro', 'Todos os campos devem ser preenchidos');
            return;
        }

        const dadosAvaliacao = {
            pacienteNome: paciente.nome,
            dataAvaliacao: dataAtual,
            avaliador,
            estatura,
            classEstatura,
            peso,
            classPeso,
            gPorcentagemTotal,
            classGPorcentagemTotal,
            mmTotal,
            mmMSD,
            classMMTotal,
            mo,
            classMo,
            bmi,
            classBmi,
            caloriasDiarias,
            classCaloriasDiarias,
            idadeMetabolica,
            classIdadeMetabolica,
            aguaCorporal,
            classAguaCorporal,
            gorduraVisceral,
            classGorduraVisceral,
            gMsE,  // Inclui G% MS E nos dados enviados
            classGMsE,  // Inclui a classificação de G% MS E
            mmMSE,  // Inclui MM MS E nos dados enviados
            classMmMSE,  // Inclui a classificação de MM MS E
            gMsD,  // Inclui G% MS D nos dados enviados
            classGMsD
        };

        try {
            const response = await fetch('http://localhost:5000/api/salvar-avaliacao-antropometrica', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosAvaliacao),
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Dados salvos com sucesso');

                setEstatura('');
                setClassEstatura('');
                setPeso('');
                setClassPeso('');
                setGPorcentagemTotal('');
                setClassGPorcentagemTotal('');
                setMMTotal('');
                setMmMSD('');
                setClassMMTotal('');
                setMo('');
                setClassMo('');
                setBmi('');
                setClassBmi('');
                setCaloriasDiarias('');
                setClassCaloriasDiarias('');
                setIdadeMetabolica('');
                setClassIdadeMetabolica('');
                setAguaCorporal('');
                setClassAguaCorporal('');
                setGorduraVisceral('');
                setClassGorduraVisceral('');
                setGMsE('');
                setClassGMsE('');
                setMmMSE('');  // Limpa MM MS E
                setClassMmMSE('');  // Limpa a classificação de MM MS E
                setGMsD('');  // Limpa G% MS D
                setClassGMsD('');

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
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Avaliação Antropométrica</Text>
            <Text style={styles.text}>Nome do Paciente: {paciente.nome}</Text>
            <Text style={styles.text}>Data da Avaliação: {dataAtual}</Text>
            <Text style={styles.text}>Avaliador: {avaliador}</Text>

            {/* Tabela de Avaliação Antropométrica */}
            <View style={styles.tableContainer}>
                <Text style={styles.tableTitle}>Bioimpedância Avaliador</Text>
                
                {/* Cabeçalho da Tabela */}
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>Variável</Text>
                    <Text style={styles.tableHeader}>Medida</Text>
                    <Text style={styles.tableHeader}>Variável</Text>
                    <Text style={styles.tableHeader}>Medida</Text>
                    <Text style={styles.tableHeader}>Classificação*</Text>
                </View>

                {/* Linhas da Tabela */}
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Estatura</Text>
                    <TextInput
                        style={styles.tableInput}
                        value={estatura}
                        onChangeText={setEstatura}
                        keyboardType="numeric"
                        placeholder="Estatura"
                    />
                    <Text style={styles.tableCell}>G% MS E</Text>
                    <TextInput
                        style={styles.tableInput}
                        value={gMsE}  // Usar gMsE
                        onChangeText={setGMsE}  // Atualiza o estado de G% MS E
                        keyboardType="numeric"
                        placeholder="G% MS E"
                    />
                    <TextInput
                        style={styles.tableInput}
                        value={classGMsE}  // Classificação de G% MS E
                        onChangeText={setClassGMsE}  // Atualiza a classificação de G% MS E
                        placeholder="Classificação"
                    />
                </View>

                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Peso</Text>
                    <TextInput
                        style={styles.tableInput}
                        value={peso}
                        onChangeText={setPeso}
                        keyboardType="numeric"
                        placeholder="Peso"
                    />
                    <Text style={styles.tableCell}>MM MS E</Text>
                    <TextInput
                        style={styles.tableInput}
                        value={mmMSE}
                        onChangeText={setMmMSE}
                        keyboardType="numeric"
                        placeholder="MM MS E"
                    />
                    <TextInput
                        style={styles.tableInput}
                        value={classMmMSE}
                        onChangeText={setClassMmMSE}
                        placeholder="Classificação"
                    />
                </View>

                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>G% total</Text>
                    <TextInput
                        style={styles.tableInput}
                        value={gPorcentagemTotal}
                        onChangeText={setGPorcentagemTotal}
                        keyboardType="numeric"
                        placeholder="G% total"
                    />
                    <Text style={styles.tableCell}>G% MS D</Text>
                    <TextInput
                        style={styles.tableInput}
                        value={gMsD}
                        onChangeText={setGMsD}
                        keyboardType="numeric"
                        placeholder="G% MS D"
                    />
                    <TextInput
                        style={styles.tableInput}
                        value={classGMsD}
                        onChangeText={setClassGMsD}
                        placeholder="Classificação"
                    />
                </View>

                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>MM total</Text>
                    <TextInput
                        style={styles.tableInput}
                        value={mmTotal}
                        onChangeText={setMMTotal}
                        keyboardType="numeric"
                        placeholder="MM Total"
                    />
                    <Text style={styles.tableCell}>MM MS D</Text>
                    <TextInput
                        style={styles.tableInput}
                        value={mmMSD}
                        onChangeText={setMmMSD} // Atualiza o estado de MM MS D
                        keyboardType="numeric"
                        placeholder="MM MS D"
                    />
                    <TextInput
                        style={styles.tableInput}
                        value={classMMTotal} // Usar classMMTotal para a classificação
                        onChangeText={setClassMMTotal} // Atualiza o estado da classificação de MM MS D
                        placeholder="Classificação"
                    />
                </View>

                {/* Adicione mais linhas seguindo o mesmo padrão */}
            </View>

            <TouchableOpacity style={styles.button} onPress={salvarDados}>
                <Text style={styles.buttonText}>Salvar Avaliação</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AvaliacaoAntropometrica;
