// routes/password.js
const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt'); // Importa o bcrypt
const pool = require('../models/db'); // Importa o pool de conexão com o banco de dados
const router = express.Router();

// Endpoint para recuperação de senha
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(32).toString('hex'); // Gera um token

    // Armazena o token e a data de expiração no banco de dados
    const expirationDate = new Date(Date.now() + 3600000); // 1 hora a partir de agora
    try {
        const result = await pool.query('UPDATE evaluators SET reset_token = $1, reset_token_expiration = $2 WHERE email = $3', [token, expirationDate, email]);

        if (result.rowCount === 0) {
            return res.status(404).send({ message: 'Usuário não encontrado.' });
        }

        // Retorna o token para o cliente
        res.send({ message: 'Token gerado com sucesso.', token });
    } catch (error) {
        console.error('Erro ao gerar o token:', error);
        res.status(500).send({ message: 'Erro ao tentar recuperar a senha.' });
    }
});

// Endpoint para redefinir a senha
router.post('/reset-password', async (req, res) => {
    const { token, novaSenha } = req.body;

    // Verifica se o token é válido e se não expirou
    try {
        const result = await pool.query('SELECT * FROM evaluators WHERE reset_token = $1 AND reset_token_expiration > NOW()', [token]);

        if (result.rowCount === 0) {
            return res.status(400).send({ message: 'Token inválido ou expirado.' });
        }

        // Criptografa a nova senha
        const hashedPassword = await bcrypt.hash(novaSenha, 10); // O número 10 é o salt rounds

        // Atualiza a senha do usuário
        await pool.query('UPDATE evaluators SET password = $1, reset_token = NULL, reset_token_expiration = NULL WHERE reset_token = $2', [hashedPassword, token]);

        res.send({ message: 'Senha redefinida com sucesso!' });
    } catch (error) {
        console.error('Erro ao redefinir a senha:', error);
        res.status(500).send({ message: 'Erro ao tentar redefinir a senha.' });
    }
});

module.exports = router;
