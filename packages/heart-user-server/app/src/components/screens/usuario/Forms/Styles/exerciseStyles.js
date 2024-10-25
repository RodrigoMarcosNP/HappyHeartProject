import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 18,
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20, // Aumentado para melhor espaçamento
        color: '#333', // Cor do texto
    },
    exerciseOptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 12, // Espaçamento vertical entre as opções
        padding: 10, // Adiciona um pouco de padding para espaçamento interno
        borderBottomWidth: 1, // Adiciona uma linha separadora
        borderBottomColor: '#ccc', // Cor da linha
    },
    exerciseButton: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12, // Arredondar os cantos
        padding: 15, // Aumenta o espaçamento interno
        backgroundColor: '#ffffff', // Cor de fundo dos botões
        shadowColor: '#000', // Sombra
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3, // Sombra para Android
    },
    exerciseImage: {
        width: 200, // Ajustado para um tamanho mais equilibrado
        height: 200, // Ajustado para um tamanho mais equilibrado
        resizeMode: 'contain',
        borderRadius: 10, // Adiciona bordas arredondadas à imagem
        borderWidth: 1, // Adiciona borda ao redor da imagem
        borderColor: '#e0e0e0', // Cor da borda da imagem
        marginBottom: 5, // Espaçamento entre a imagem e o texto
    },
    exerciseButtonText: {
        fontSize: 18, // Aumenta o tamanho da fonte do texto do botão
        fontWeight: '600',
        color: '#4CAF50', // Cor do texto dos botões
        textAlign: 'center', // Alinha o texto ao centro
    },
});
