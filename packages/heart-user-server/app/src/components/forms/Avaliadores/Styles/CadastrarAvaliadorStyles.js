import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5', // Cor de fundo clara
    },
    title: {
        fontSize: 28, // Tamanho maior para um título mais impactante
        marginBottom: 24,
        textAlign: 'center',
        color: '#4A4A4A', // Cor do título
        fontWeight: 'bold', // Negrito para um título mais forte
    },
    input: {
        height: 50,
        borderColor: '#007BFF', // Cor da borda em azul
        borderWidth: 2,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 8, // Bordas mais arredondadas
        backgroundColor: '#FFFFFF', // Cor de fundo do campo de entrada
        shadowColor: '#000', // Sombra para efeito de profundidade
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5, // Sombra para Android
    },
    roleSelector: {
        height: 50,
        borderColor: '#007BFF',
        borderWidth: 2,
        marginBottom: 15,
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    roleText: {
        fontSize: 16,
        color: '#333', // Cor do texto do papel
        textAlign: 'center',
    },
    registerButton: {
        backgroundColor: '#4CAF50', // Cor verde para o botão
        paddingVertical: 15, // Altura do botão
        borderRadius: 30, // Bordas arredondadas
        alignItems: 'center', // Centraliza o texto
        justifyContent: 'center',
        marginTop: 20, // Espaçamento acima do botão
        shadowColor: '#000', // Sombra para o botão
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5, // Sombra para Android
    },
    registerButtonText: {
        color: 'white', // Texto em branco para contraste
        fontSize: 18, // Tamanho da fonte
        fontWeight: 'bold', // Texto em negrito
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro com transparência
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10, // Bordas mais arredondadas para um visual mais suave
        alignItems: 'center',
        width: '80%', // 80% da largura da tela
        shadowColor: '#000', // Adiciona sombra para profundidade
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Sombra para Android
    },    
    modalTitle: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold', // Negrito para destaque
        color: '#333',
    },
    modalOption: {
        paddingVertical: 15, // Mais espaçamento vertical
        paddingHorizontal: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        width: '100%',
        alignItems: 'center', // Centraliza o texto das opções
    },
    modalOptionText: {
        fontSize: 16,
        color: '#007BFF', // Cor para destacar as opções
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#FF5A5F', // Cor de fundo do botão
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25, // Botão arredondado
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Sombra para o botão
    },
    closeButtonText: {
        color: 'white', // Texto em branco para contraste
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;
