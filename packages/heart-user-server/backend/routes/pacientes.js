// routes/pacientes.js
const express = require('express');
const router = express.Router();
const { cadastrarPaciente, listarPacientes, obterPacientePorId } = require('../controllers/pacientesController'); // Importa o controlador

// Rotas para pacientes
router.post('/cadastrar', cadastrarPaciente);
router.get('/listar', listarPacientes);
// Rota para obter um paciente específico pelo ID
router.get('/listar/:id', obterPacientePorId);

module.exports = router;
