import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window'); // Obtém a largura da tela do dispositivo

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f0f4f8', // Fundo claro para contraste
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        width: '100%',
        padding: 15,
        backgroundColor: '#4CAF50', // Cor do cabeçalho
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    loadingText: {
        fontSize: 16,
        color: '#555',
        marginTop: 10,
    },
    errorText: {
        fontSize: 16,
        color: '#f44336', // Vermelho para erros
        marginTop: 10,
        textAlign: 'center',
    },
    patientInfo: {
        alignItems: 'flex-start',
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    patientText: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 5,
        color: '#333',
    },
    patientIcon: {
        marginRight: 10,
    },
    input: {
        backgroundColor: '#fff',
        borderColor: '#ddd', // Borda mais suave
        borderWidth: 1,
        borderRadius: 10, // Bordas mais arredondadas
        padding: 15,
        width: '100%',
        marginVertical: 10,
        fontSize: 16,
        shadowColor: '#000', // Adiciona sombra
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Sombra para Android
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
        width: '100%', // Preenche a largura do container
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3, // Sombra para Android
    },
    buttonText: {
        color: '#fff',
        fontSize: 18, // Aumenta o tamanho da fonte do botão
        fontWeight: 'bold',
        textAlign: 'center',
    },
    patientInfo: {
        alignItems: 'flex-start', // Mantém alinhado à esquerda para leitura clara
        marginBottom: 20, // Separação adequada da seção inferior
        padding: 15, // Adicionado padding para o conteúdo do paciente
        backgroundColor: '#ffffff', // Fundo branco para destacar a seção do paciente
        borderRadius: 10,
        width: '100%', // Preenche a maior parte da largura da tela
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, // Sombra leve para profundidade
    },
    patientText: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 5,
        color: '#333',
    },
    selectedActivityText: {
        fontSize: 20, // Aumenta o tamanho da fonte do texto selecionado
        color: '#4CAF50',
        fontWeight: 'bold',
        marginVertical: 15, // Aumenta o espaçamento vertical
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: '#f44336', // Cor de fundo vermelho para o botão de logout
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20, // Espaço superior para afastar do conteúdo
        marginBottom: 20, // Espaço inferior para afastar do final do container
        width: '100%', // Preenche a largura do container
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3, // Sombra para Android
    },
});

export default styles;
