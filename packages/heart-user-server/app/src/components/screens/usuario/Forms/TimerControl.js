import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './Styles/timerStyles'; // Importando o estilo

const TimerControl = ({
    bpmAntes,
    isRunning,
    setIsRunning,
    timer,
    setTimer,
    handleAfterActivity,
    resetarEstado,
    onStartTimer, // Nova prop para iniciar o cronômetro
}) => {
    useEffect(() => {
        let interval = null;
        if (isRunning && timer < 30) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        } else if (!isRunning && timer !== 0) {
            clearInterval(interval);
        }

        if (timer === 30) {
            handleAfterActivity();
        }

        return () => clearInterval(interval);
    }, [isRunning, timer]);

    const formattedTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleStartTimer = () => {
        if (bpmAntes) {
            setIsRunning(true);
            if (onStartTimer) {
                onStartTimer(); // Chama a função para ocultar o input no Home
            }
        } else {
            Alert.alert('Atenção', 'Por favor, insira o BPM antes de iniciar.');
        }
    };

    return (
        <View style={styles.timerContainer}>
            {isRunning || timer > 0 ? (
                <View style={styles.timerSection}>
                    <Text style={styles.timer}>{formattedTime()}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => setIsRunning(false)}>
                        <Text style={styles.buttonText}>Parar Cronômetro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={resetarEstado}>
                        <Text style={styles.buttonText}>Resetar Cronômetro</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleStartTimer}>
                    <Text style={styles.buttonText}>Iniciar Cronômetro</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default TimerControl;
