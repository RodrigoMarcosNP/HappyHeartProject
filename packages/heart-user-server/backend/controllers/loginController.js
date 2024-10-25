// controllers/loginController.js
const pool = require('../models/db'); // Import database configuration
const bcrypt = require('bcrypt'); // Import bcrypt

// Function for patient login
const loginPaciente = async (req, res) => {
    const { cpf, senha } = req.body; // Destructure 'cpf' and 'senha' from request body

    console.log('Login - Request Body:', req.body); // Log the request body

    try {
        // Query to find patient by CPF
        const { rows } = await pool.query('SELECT * FROM patient WHERE cpf = $1', [cpf]);

        // Check if patient exists
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        const paciente = rows[0]; // Get the patient data
        console.log('Paciente encontrado:', paciente.nome_completo); // Log the found patient's name

        // Check if the password exists
        if (!paciente.senha) {
            console.error('Senha do paciente não encontrada'); // Log if password not found
            return res.status(500).json({ message: 'Erro ao verificar a senha do paciente.' });
        }

        // Compare provided password with stored hash
        const isPasswordValid = await bcrypt.compare(senha, paciente.senha); 

        // Return appropriate response based on password match
        if (isPasswordValid) {
            return res.status(200).json({
                nome_completo: paciente.nome_completo, // Return full name
                id: paciente.id // Return patient ID
            });
        } else {
            return res.status(401).json({ message: 'Senha incorreta!' });
        }
    } catch (error) {
        console.error('Erro no login:', error); // Log the error
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

module.exports = {
    loginPaciente,
};
