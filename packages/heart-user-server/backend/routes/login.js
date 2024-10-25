const express = require('express');
const router = express.Router();
const { loginPaciente } = require('../controllers/loginController');

router.post('/', loginPaciente);

module.exports = router;
