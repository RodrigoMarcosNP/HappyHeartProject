import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f0f8ff', // Um tom de azul claro
    },
    label: {
        marginBottom: 5,
        fontSize: 18, // Tamanho da fonte dos rótulos aumentado
        fontWeight: 'bold', // Rótulos em negrito
        color: '#4a4a4a', // Cor do texto dos rótulos
    },
    input: {
        height: 50,
        borderColor: '#ccc', // Cor da borda
        borderWidth: 1,
        borderRadius: 10, // Bordas mais arredondadas
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff', // Cor de fundo do campo de entrada
        shadowColor: '#000', // Sombra
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2, // Para Android
    },
    button: {
        backgroundColor: '#007bff', // Cor de fundo do botão
        borderRadius: 10, // Bordas arredondadas do botão
        paddingVertical: 12, // Preenchimento vertical
        paddingHorizontal: 20, // Preenchimento horizontal
        alignItems: 'center', // Centraliza o texto
        marginTop: 10, // Margem acima do botão
    },
    buttonText: {
        color: '#fff', // Cor do texto do botão
        fontSize: 18, // Tamanho da fonte do texto do botão
        fontWeight: 'bold', // Texto em negrito
    },
});

export default styles;
