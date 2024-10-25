import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#e6f7ff', // Cor de fundo clara e suave
    },
    title: {
        fontSize: 28, // Tamanho da fonte aumentado
        marginBottom: 20, // Espaço maior abaixo do título
        fontWeight: 'bold', // Título em negrito
        color: '#2c3e50', // Cor escura e elegante para o título
        textAlign: 'center', // Centralizar o título
        textShadowColor: '#fff', // Sombra do texto
        textShadowOffset: { width: 0, height: 1 }, // Offset da sombra
        textShadowRadius: 2, // Raio da sombra
    },
    paciente: {
        fontSize: 18,
        padding: 12, // Aumentar o preenchimento
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#ffffff', // Cor de fundo branca para os itens da lista
        borderRadius: 10, // Bordas arredondadas
        marginBottom: 12, // Espaço entre os itens
        shadowColor: '#000', // Cor da sombra
        shadowOffset: { width: 0, height: 2 }, // Offset da sombra
        shadowOpacity: 0.2, // Opacidade da sombra
        shadowRadius: 4, // Raio da sombra
        elevation: 3, // Elevação para Android
        transitionDuration: '0.2s', // Transição suave ao pressionar
    },
    pacienteText: {
        color: '#34495e', // Cor do texto do paciente mais forte
        fontWeight: '600', // Fonte mais forte
    },
    // Efeito ao pressionar o item
    pacientePressed: {
        backgroundColor: '#d9edf7', // Cor de fundo ao pressionar
        borderBottomColor: '#007bff', // Cor do border ao pressionar
    },
});

export default styles;
