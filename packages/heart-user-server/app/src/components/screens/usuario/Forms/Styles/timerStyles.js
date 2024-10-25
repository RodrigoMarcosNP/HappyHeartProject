import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    timerContainer: {
        alignItems: 'center',
        marginTop: 30,
        padding: 10, // Adiciona um pouco de espaço ao redor do container
        backgroundColor: '#f9f9f9', // Fundo leve para destacar o conteúdo
        borderRadius: 12, // Arredondar os cantos do container
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3, // Sombra para Android
    },
    timerSection: {
        alignItems: 'center',
    },
    timer: {
        fontSize: 60, // Aumentado para destacar o temporizador
        fontWeight: 'bold',
        color: '#4CAF50', // Cor verde para destacar o tempo
        marginVertical: 25,
        textAlign: 'center',
        textShadowColor: '#000', // Adiciona uma sombra ao texto
        textShadowOffset: { width: 1, height: 1 }, // Sombra leve para destaque
        textShadowRadius: 2, // Suaviza a sombra
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 14, // Aumentado para maior conforto visual
        paddingHorizontal: 30, // Aumentado para proporcionar mais espaço
        borderRadius: 10, // Arredondar os cantos do botão
        alignItems: 'center',
        marginVertical: 12,
        width: '80%', // Largura responsiva, ocupando 80% da largura do container
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3, // Sombra para Android
    },
    buttonText: {
        color: '#fff',
        fontSize: 18, // Aumentado para melhor legibilidade
        fontWeight: 'bold',
        textTransform: 'uppercase', // Transforma o texto em maiúsculas
    },
});

export default styles;
