// controllers/evaluatorsController.js
const pool = require('../models/db'); // Importa a configuração do banco
const bcrypt = require('bcrypt'); // Importa o módulo bcrypt

// Função para login do avaliador
const loginEvaluator = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM evaluators WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            const evaluator = result.rows[0];
            const isPasswordValid = await bcrypt.compare(password, evaluator.password);
            if (isPasswordValid) {
                // Armazena o papel no token
                const userData = { name: evaluator.name, role: evaluator.role };
                // Retorna os dados do usuário
                return res.status(200).json({ userData });
            } else {
                return res.status(401).json({ message: 'Senha incorreta!' });
            }
        } else {
            return res.status(404).json({ message: 'Avaliador não encontrado!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};


// Função para cadastro do avaliador
const registerEvaluator = async (req, res) => {
    const { nome, email, senha, role } = req.body;

    try {
        // Verifica se o avaliador já existe
        const existingEvaluator = await pool.query('SELECT * FROM evaluators WHERE email = $1', [email]);
        if (existingEvaluator.rows.length > 0) {
            return res.status(400).json({ message: 'Avaliador já cadastrado!' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Insere o novo avaliador no banco de dados
        const newEvaluator = await pool.query(
            'INSERT INTO evaluators (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, email, hashedPassword, role]
        );

        // Retorna a resposta
        return res.status(201).json({ message: 'Avaliador cadastrado com sucesso!', evaluator: newEvaluator.rows[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

module.exports = {
    loginEvaluator,
    registerEvaluator, // Exporta a nova função
};
