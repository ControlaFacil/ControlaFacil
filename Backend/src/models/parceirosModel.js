// O modelo parceirosModel é responsável por interagir com o banco de dados para operações relacionadas aos parceiros.

const { poolConnect, pool, sql } = require('../config/db');

const parceirosModel = {
    async inserir({ cnpj, razaoSocial, tipoParceiro, nomeFantasia, email, telefone }) {
        await poolConnect;
        try {
            const result = await pool.request()
                .input("cnpj", sql.Char, cnpj)
                .input("razaoSocial", sql.VarChar, razaoSocial)
                .input("tipoParceiro", sql.VarChar, tipoParceiro)
                .input("nomeFantasia", sql.VarChar, nomeFantasia || null) // Se nomeFantasia for opcional, pode ser null
                .input("email", sql.VarChar, email || null) // Se email for opcional, pode ser null
                .input("telefone", sql.VarChar, telefone || null) // Se telefone for opcional, pode ser null
                .query(`
                    INSERT INTO Parceiro (cnpj, razaoSocial, tipoParceiro, nomeFantasia, email, telefone)
                    OUTPUT INSERTED.*
                    VALUES (@cnpj, @razaoSocial, @tipoParceiro, @nomeFantasia, @email, @telefone)
                `);
            return result.recordset[0];
        } catch (error) {
            console.error('Erro ao inserir parceiro:', error);
            throw new Error('Erro ao inserir parceiro: ' + error);
        }
    },

    async existeId(id) {
        await poolConnect;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT 1 AS existe FROM Parceiro WHERE id = @id');
            
        return result.recordset.length > 0; // Retorna true se existir, false caso contrário
    }
}

module.exports = parceirosModel;
