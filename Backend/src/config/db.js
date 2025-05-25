// Importa as bibliotecas mssql e dotenv
const sql = require('mssql');
require('dotenv').config();

// Define as configurações da conexão com o SQL Server
const dbConfig = {
    user: process.env.DB_USER, // Usuário do banco de dados
    password: process.env.DB_PASSWORD, // Senha do banco de dados
    server: process.env.DB_SERVER, // Servidor do banco de dados
    database: process.env.DB_NAME, // Nome do banco de dados
    options: {
        encrypt: true, // Criptografia para conexões seguras
        trustServerCertificate: true, // Confiança no certificado do servidor
    },
};

// Cria uma pool de conexões
const pool = new sql.ConnectionPool(dbConfig);

// Faz a conexão inicial
const poolConnect = pool.connect();

// Trata erros na conexão
pool.on('error', err => {
    console.error('Erro na conexão com o banco de dados:', err);
});

// Exporta o pool e o módulo sql para uso nos models
module.exports = { sql, pool, poolConnect };