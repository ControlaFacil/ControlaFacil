// O modelo usuarioModel é responsável por interagir com o banco de dados para operações relacionadas aos usuários.

const { poolConnect, pool, sql } = require('../config/db');

const usuarioModel = {
    // Inserir Usuario
    async inserir({ cnpj, razaoSocial, apelidoEmpresa, email, telefone, senhaHash }) {
        await poolConnect;

        try {
            const result = await pool.request()
                .input('cnpj', cnpj) // Nome do parâmetro e valor vindo do código
                .input('razaoSocial', razaoSocial)
                .input('apelidoEmpresa', apelidoEmpresa || null) // Se apelidoEmpresa for opcional, pode ser null
                .input('email', email)
                .input('telefone', telefone || null) // Se telefone for opcional, pode ser null
                .input('senhaHash', senhaHash)
                .query(`
                INSERT INTO Usuario (cnpj, razaoSocial, apelidoEmpresa, email, telefone, senhaHash)
                OUTPUT INSERTED.id, INSERTED.cnpj, INSERTED.razaoSocial, INSERTED.apelidoEmpresa, INSERTED.email, INSERTED.telefone
                VALUES (@cnpj, @razaoSocial, @apelidoEmpresa, @email, @telefone, @senhaHash)
            `)

            return result.recordset[0];
        } catch (error) {
            console.error('Erro ao inserir usuário:', error);
            throw new Error('Erro ao inserir usuário: ' + error);
        }

    },

    async listarUsuarios() {
        await poolConnect;
        const result = await pool.request()
            .query("SELECT id, cnpj, email, telefone, razaoSocial, apelidoEmpresa FROM Usuario");

        return result.recordset;
    },

    async buscarPorId(id) {
        await poolConnect;
        try {
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query(`SELECT id, cnpj, email, telefone, razaoSocial, apelidoEmpresa FROM Usuario WHERE id = @id`);

            return result.recordset[0];
        }
        catch (error) {
            console.error('Erro ao buscar usuário por ID:', error);
            throw new Error('Erro ao buscar usuário por ID: ' + error);
        }
    },

    async buscarPorEmail(email) {
        await poolConnect;
        const result = await pool.request()
            .input('email', email)
            .query(`SELECT * FROM USUARIO where email = @email`);
        return result.recordset[0];
    },

    async existeCnpj(cnpj) {
        await poolConnect;
        const result = await pool.request()
            .input('cnpj', sql.VarChar, cnpj)
            .query('SELECT 1 AS existe from Usuario WHERE cnpj = @cnpj');
        return result.recordset.length > 0; // Retorna true se existir, false caso contrário
    },

    async existeEmail(email) {
        await poolConnect;
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT 1 AS existe FROM Usuario WHERE email = @email');

        return result.recordset.length > 0;
    },

    async existeId(id) {
        await poolConnect;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT 1 AS existe FROM Usuario WHERE id = @id');

        return result.recordset.length > 0; // Retorna true se existir, false caso contrário
    }
}

module.exports = usuarioModel;