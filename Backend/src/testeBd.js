const { poolConnect, pool } = require('./config/db');

async function testarConexao() {
    try {
        await poolConnect; // Garante que a conexão está ativa
        const result = await pool.request().query('SELECT GETDATE() AS dataAtual');
        console.log('Conexão bem-sucedida! Data/hora do SQL Server:', result.recordset[0].dataAtual);
    } catch (err) {
        console.error('Erro na conexão com o banco:', err);
    }
}

testarConexao();
