const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');

// Define a rota para salvar a avaliação
router.post('/salvar-avaliacao', avaliacaoController.salvarAvaliacao);

module.exports = router;
