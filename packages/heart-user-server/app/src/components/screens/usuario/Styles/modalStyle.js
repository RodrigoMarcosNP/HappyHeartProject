import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Outros estilos já existentes no seu arquivo...
    
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo semi-transparente
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 15, // Bordas arredondadas
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 10, // Efeito de sombra
        elevation: 5, // Elevação para Android
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333', // Cor do título
        textAlign: 'center', // Centralizando o título
    },
    modalText: {
        fontSize: 16,
        color: '#666', // Cor do texto
        textAlign: 'justify', // Texto justificado
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4CAF50', // Cor verde para o botão
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10, // Bordas arredondadas do botão
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff', // Cor do texto no botão
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;
