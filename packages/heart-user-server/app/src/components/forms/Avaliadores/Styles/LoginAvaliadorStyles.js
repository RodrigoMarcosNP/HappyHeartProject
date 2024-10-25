import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20, // Aumenta o espaçamento
        backgroundColor: '#2c2c2c', // Fundo mais escuro
    },
    title: {
        fontSize: 28, // Aumenta o tamanho da fonte
        marginBottom: 30, // Aumenta o espaçamento inferior
        color: '#ffcc00', // Cor do texto do título em amarelo dourado
        fontWeight: 'bold', // Deixa o título em negrito
        textAlign: 'center', // Centraliza o texto
    },
    input: {
        width: '100%',
        padding: 14, // Aumenta o preenchimento do input
        borderWidth: 2, // Aumenta a espessura da borda
        borderColor: '#ffcc00', // Cor da borda em amarelo dourado
        borderRadius: 10, // Bordas mais arredondadas
        marginBottom: 20, // Aumenta o espaçamento inferior
        color: '#fff', // Cor do texto do input para branco
        backgroundColor: '#444', // Fundo do input mais claro
        fontSize: 16, // Aumenta o tamanho da fonte do input
    },
    link: {
        marginTop: 15, // Aumenta o espaçamento superior
        color: '#ffcc00', // Cor do link em amarelo dourado
        textDecorationLine: 'underline',
        fontSize: 16, // Aumenta o tamanho da fonte do link
        fontWeight: 'bold', // Deixa o link em negrito
    },
});

export default styles;
