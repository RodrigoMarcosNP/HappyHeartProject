// models/db.js
const { Pool } = require('pg');

// Configuração do Pool do PostgreSQL
const pool = new Pool({
    user: 'postgres', // substitua pelo seu usuário do PostgreSQL
    host: 'localhost',
    database: 'happyheart',
    password: 'Lsttro2gd', // substitua pela sua senha do PostgreSQL
    port: 5432,
});

module.exports = pool;
