import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles/modalStyle';

const BpmModal = ({ modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Como aferir batimento por minuto?</Text>
                    <Text style={styles.modalText}>
                        Para aferir seus batimentos por minuto (BPM) sem o uso de um oxímetro, siga os seguintes passos:
                        {'\n\n'}1. Coloque seu dedo indicador e médio sobre o seu pulso, na base do polegar, até sentir
                        a pulsação.{'\n'}
                        2. Use um relógio ou cronômetro e conte quantas vezes o seu coração bate em 15 segundos.{'\n'}
                        3. Multiplique esse número por 4 para obter seu BPM.
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                        <Text style={styles.buttonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default BpmModal;
