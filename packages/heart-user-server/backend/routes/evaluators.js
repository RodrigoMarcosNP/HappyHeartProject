const express = require('express');
const router = express.Router();
const { loginEvaluator, registerEvaluator } = require('../controllers/evaluatorsController'); // Importa o controlador

// Rota para login do avaliador
router.post('/', loginEvaluator); // Altere a rota para /login para clareza
// Rota para cadastro do avaliador
router.post('/cadastrar', registerEvaluator); // Adiciona a rota de cadastro

module.exports = router;
