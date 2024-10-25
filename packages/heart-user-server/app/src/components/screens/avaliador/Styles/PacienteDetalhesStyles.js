import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5', // Cor de fundo clara
        justifyContent: 'center', // Centraliza o conteúdo verticalmente
    },
    title: {
        fontSize: 28, // Tamanho da fonte maior
        marginBottom: 20,
        fontWeight: 'bold', // Título em negrito
        color: '#2c3e50', // Cor do título escura
        textAlign: 'center', // Centraliza o texto
        textTransform: 'uppercase', // Transforma o texto em maiúsculas
    },
    detailText: {
        fontSize: 18, // Tamanho da fonte para detalhes
        marginVertical: 10, // Espaço vertical entre os detalhes
        color: '#34495e', // Cor dos detalhes
        backgroundColor: '#ffffff', // Cor de fundo branca
        padding: 12, // Preenchimento para o texto
        borderRadius: 8, // Bordas arredondadas
        shadowColor: '#000', // Cor da sombra
        shadowOffset: { width: 0, height: 2 }, // Offset da sombra
        shadowOpacity: 0.1, // Opacidade da sombra
        shadowRadius: 4, // Raio da sombra
        elevation: 3, // Elevação para Android
    },
});

export default styles;
