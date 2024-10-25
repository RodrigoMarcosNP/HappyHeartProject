import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Avaliador = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tela do Avaliador</Text>
            <Button
                title="Cadastrar Paciente"
                onPress={() => navigation.navigate('CadastroPaciente')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default Avaliador;
