// index.js
const express = require('express');
const app = express();
const cors = require('cors');
const pacientesRoutes = require('./routes/pacientes');
const loginRoutes = require('./routes/login');
const evaluatorsRoutes = require('./routes/evaluators');
const atividadesRoutes = require('./routes/atividades');
const passwordRoutes = require('./routes/password'); // Importando as rotas de recuperação de senha
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');

// Middleware
app.use(cors()); // Permite requisições de diferentes origens
app.use(express.json()); // Faz o parse do JSON

// Rotas
app.use('/pacientes', pacientesRoutes);
app.use('/login', loginRoutes);
app.use('/evaluators', evaluatorsRoutes);
app.use('/atividades', atividadesRoutes);
app.use('/password', passwordRoutes);
app.use('/api', avaliacaoRoutes);

// Inicializa o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
