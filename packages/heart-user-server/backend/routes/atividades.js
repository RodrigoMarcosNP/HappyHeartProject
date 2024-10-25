// routes/atividades.js
const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// Rota para listar atividades de um paciente
router.get('/listar/:pacienteId', async (req, res) => {
    const { pacienteId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM atividades WHERE paciente_id = $1', [pacienteId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao listar atividades.' });
    }
});

// Rota para cadastrar uma nova atividade
router.post('/cadastrar', async (req, res) => {
    const { paciente_id, atividade, bpmAntes, bpmDepois } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO atividades (paciente_id, nome_atividade, bpm_antes, bpm_depois) VALUES ($1, $2, $3, $4) RETURNING *',
            [paciente_id, atividade, bpmAntes, bpmDepois]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao salvar a atividade.' });
    }
});

module.exports = router;
