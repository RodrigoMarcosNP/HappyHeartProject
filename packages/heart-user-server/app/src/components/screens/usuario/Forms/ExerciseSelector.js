import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import styles from './Styles/exerciseStyles';

const ExerciseSelector = ({ setAtividade }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Selecione uma atividade:</Text>
            <View style={styles.exerciseOptionContainer}>
                <TouchableOpacity
                    style={styles.exerciseButton}
                    onPress={() => setAtividade('Caminhada')}
                >
                    <Image
                        source={require('../../../assets/caminhada.jpg')}
                        style={styles.exerciseImage}
                    />
                    <Text style={styles.exerciseButtonText}>Caminhada</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.exerciseButton}
                    onPress={() => setAtividade('Ciclismo')}
                >
                    <Image
                        source={require('../../../assets/ciclismo.jpg')}
                        style={styles.exerciseImage}
                    />
                    <Text style={styles.exerciseButtonText}>Ciclismo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.exerciseButton}
                    onPress={() => setAtividade('Academia')}
                >
                    <Image
                        source={require('../../../assets/academia.jpg')}
                        style={styles.exerciseImage}
                    />
                    <Text style={styles.exerciseButtonText}>Academia</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ExerciseSelector;
