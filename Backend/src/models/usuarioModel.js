// O modelo usuarioModel é responsável por interagir com o banco de dados para operações relacionadas aos usuários.

const { poolConnect, pool, sql } = require('../config/db');

const usuarioModel = {
    // Inserir Usuario
    async inserir({ cnpj, razaoSocial, apelidoEmpresa, email, telefone, senhaHash }) {
        await poolConnect;
        await pool.request()
            .input('cnpj', cnpj) // Nome do parâmetro e valor vindo do código
            .input('razaoSocial', razaoSocial)
            .input('apelidoEmpresa', apelidoEmpresa || null) // Se apelidoEmpresa for opcional, pode ser null
            .input('email', email)
            .input('telefone', telefone || null) // Se telefone for opcional, pode ser null
            .input('senhaHash', senhaHash)
            .query(`
                INSERT INTO Usuario (cnpj, razaoSocial, apelidoEmpresa, email, telefone, senhaHash)
                VALUES
                (@cnpj, @razaoSocial, @apelidoEmpresa, @email, @telefone, @senhaHash)
            `)
    }
}

module.exports = usuarioModel;