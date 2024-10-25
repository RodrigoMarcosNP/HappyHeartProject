// controllers/pacientesController.js
const pool = require('../models/db'); // Importa a configuração do banco
const bcrypt = require('bcrypt'); // Importa o bcrypt

// Função para validar CPF (lógica simples)
const validarCpf = (cpf) => {
    const cpfSemPontos = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    return cpfSemPontos.length === 11; // Verifica se o CPF tem 11 dígitos
};

// Função para validar a data nos formatos DD/MM/AAAA ou YYYY-MM-DD
const validarDataNascimento = (data) => {
    const formatoDDMMYYYY = /^\d{2}\/\d{2}\/\d{4}$/;  // RegEx para DD/MM/AAAA
    const formatoYYYYMMDD = /^\d{4}-\d{2}-\d{2}$/;    // RegEx para YYYY-MM-DD

    if (formatoDDMMYYYY.test(data)) {
        const [dia, mes, ano] = data.split('/').map(Number);
        const dataValida = new Date(ano, mes - 1, dia);
        return dataValida.getFullYear() === ano && dataValida.getMonth() + 1 === mes && dataValida.getDate() === dia;
    }

    if (formatoYYYYMMDD.test(data)) {
        const [ano, mes, dia] = data.split('-').map(Number);
        const dataValida = new Date(ano, mes - 1, dia);
        return dataValida.getFullYear() === ano && dataValida.getMonth() + 1 === mes && dataValida.getDate() === dia;
    }

    return false; // Se não for um formato válido
};

// Função para cadastrar paciente
const cadastrarPaciente = async (req, res) => {
    const { nome_completo, data_nascimento, cpf } = req.body;

    // Validações
    if (!nome_completo || nome_completo.trim() === '') {
        return res.status(400).json({ error: 'O nome completo é obrigatório.' });
    }
    if (!validarDataNascimento(data_nascimento)) {
        return res.status(400).json({ error: 'Data de nascimento inválida. O formato deve ser DD/MM/AAAA ou YYYY-MM-DD.' });
    }
    if (!validarCpf(cpf)) {
        return res.status(400).json({ error: 'CPF inválido. Deve conter 11 dígitos.' });
    }

    try {
        let dataFormatada;
        let dia, mes, ano;

        // Se a data estiver no formato DD/MM/AAAA, converte para YYYY-MM-DD
        if (data_nascimento.includes('/')) {
            [dia, mes, ano] = data_nascimento.split('/');
            dataFormatada = `${ano}-${mes}-${dia}`;
        } else {
            // Se já estiver no formato YYYY-MM-DD, mantém o formato
            dataFormatada = data_nascimento;

            // Extraindo corretamente o dia, mês e ano para gerar a senha
            [ano, mes, dia] = data_nascimento.split('-');
        }

        // Gera a senha no formato DDMMYYYY
        const senhaGerada = `${dia}${mes}${ano}`;

        // Hash da senha com bcrypt
        const saltRounds = 10;
        const senhaHashed = await bcrypt.hash(senhaGerada, saltRounds);

        // Executa a query para inserir o paciente no banco de dados
        const result = await pool.query(
            'INSERT INTO pacientes (nome_completo, data_nascimento, cpf, senha) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome_completo, dataFormatada, cpf, senhaHashed] // Agora a senha salva é o hash
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao cadastrar paciente:', error);
        res.status(500).json({ error: 'Erro ao cadastrar paciente' });
    }
};

// Função para listar pacientes
const listarPacientes = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, nome_completo as nome, cpf, data_nascimento FROM pacientes');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
        res.status(500).json({ error: 'Erro ao buscar pacientes' });
    }
};

const obterPacientePorId = async (req, res) => {
    const { id } = req.params; // Obtém o ID do paciente a partir dos parâmetros da rota

    try {
        // Executa a consulta para buscar o paciente com o ID fornecido
        const result = await pool.query('SELECT * FROM pacientes WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Paciente não encontrado.' });
        }

        res.status(200).json(result.rows[0]); // Retorna o primeiro resultado encontrado
    } catch (error) {
        console.error('Erro ao buscar paciente:', error);
        res.status(500).json({ error: 'Erro ao buscar paciente' });
    }
};

module.exports = {
    cadastrarPaciente,
    listarPacientes,
    obterPacientePorId,
};
