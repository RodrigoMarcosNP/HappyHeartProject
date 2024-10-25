import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#2c2c2c', // Fundo mais escuro
    },
    title: {
        fontSize: 28, // Aumenta o tamanho da fonte
        marginBottom: 20,
        color: '#ffcc00', // Cor do texto do título em amarelo dourado
        fontWeight: 'bold', // Deixa o título em negrito
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 2, // Aumenta a espessura da borda
        borderColor: '#ffcc00', // Cor da borda em amarelo dourado
        borderRadius: 10, // Bordas mais arredondadas
        marginBottom: 15,
        color: '#fff', // Cor do texto do input para branco
        backgroundColor: '#444', // Fundo do input mais claro
        fontSize: 16, // Aumenta o tamanho da fonte do input
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#ffcc00', // Cor de fundo do botão em amarelo dourado
        alignItems: 'center', // Centraliza o texto dentro do botão
        marginTop: 10,
    },
    buttonText: {
        color: '#2c2c2c', // Cor do texto do botão em fundo escuro
        fontWeight: 'bold', // Texto em negrito
        fontSize: 16,
    },
});

export default styles;
