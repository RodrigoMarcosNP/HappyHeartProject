import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1e272e', // Fundo mais escuro e sofisticado
    },
    title: {
        fontSize: 28, // Tamanho maior do título para destaque
        fontWeight: 'bold',
        color: '#f1f2f6', // Cor clara para contraste com o fundo escuro
        marginBottom: 20,
        textAlign: 'center', // Centralizar o título
    },
    sectionTitle: {
        fontSize: 20, // Um pouco maior para se destacar
        fontWeight: 'bold',
        color: '#d2dae2', // Cor clara e suave para os títulos de seção
        marginTop: 20,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#d2dae2', // Texto com boa legibilidade sobre o fundo escuro
        marginVertical: 5,
        width: '100%',
    },
    input: {
        width: '100%',
        height: 45, // Levemente mais alto para melhor usabilidade
        borderColor: '#485460', // Bordas mais escuras e suaves
        borderWidth: 1,
        borderRadius: 8, // Bordas mais arredondadas para um visual moderno
        paddingHorizontal: 15,
        marginBottom: 15, // Mais espaçamento entre os inputs
        backgroundColor: '#f1f2f6', // Fundo claro para contraste com o texto digitado
        color: '#2c3e50', // Cor do texto no input
        shadowColor: '#000', // Adicionar sombra para dar profundidade
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // Sombra para Android
    },
    buttonContainer: {
        backgroundColor: '#4cd137',  // Cor do botão
        paddingVertical: 15,         // Altura do botão
        borderRadius: 8,             // Bordas arredondadas
        alignItems: 'center',        // Centralizar o texto do botão
        marginTop: 20,               // Margem superior
    },
    buttonText: {
        color: '#fff',              // Cor do texto
        fontSize: 18,               // Tamanho da fonte
        fontWeight: 'bold',         // Texto em negrito
    },
});

export default styles;
