const db = require('../models/db');

const salvarAvaliacao = async (req, res) => {
    const {
        pacienteNome,
        dataAvaliacao,
        avaliador,
        horarioInicio,
        horarioTermino,
        fcRepouso,
        paSistolica,
        paDiastolica
    } = req.body;

    // Validação simples dos campos
    if (!pacienteNome || !dataAvaliacao || !avaliador || !horarioInicio || !horarioTermino || !fcRepouso || !paSistolica || !paDiastolica) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        // Insere os dados no banco de dados
        const queryText = `
            INSERT INTO avaliacao_hemodinamica 
            (paciente_nome, data_avaliacao, avaliador, horario_inicio, horario_termino, fc_repouso, pa_sistolica, pa_diastolica) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;
        const queryValues = [pacienteNome, dataAvaliacao, avaliador, horarioInicio, horarioTermino, fcRepouso, paSistolica, paDiastolica];

        await db.query(queryText, queryValues);

        res.status(200).json({ message: 'Dados salvos com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar avaliação:', error);
        res.status(500).json({ error: 'Erro ao salvar os dados' });
    }
};

module.exports = {
    salvarAvaliacao
};
