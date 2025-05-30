// O modelo enderecomodel é responsável por interagir com o banco de dados para operações relacionadas aos endereços.

const { poolConnect, pool, sql } = require('../config/db');

const enderecoModel = {
    async inserir({ rua, numero, bairro, cidade, estado, cep, complemento }) {
        await poolConnect;
        try {
            const result = await pool.request()
                .input("rua", sql.VarChar, rua)
                .input("numero", sql.Int, numero || null) // Se numero for opcional, pode ser null
                .input("bairro", sql.VarChar, bairro || null) // Se bairro for opcional, pode ser null
                .input("cidade", sql.VarChar, cidade)
                .input("estado", sql.Char, estado)
                .input("cep", sql.VarChar, cep)
                .input("complemento", sql.VarChar, complemento || null) // Se complemento for opcional, pode ser null
                .query(`
                    INSERT INTO Endereco (rua, numero, bairro, cidade, estado, cep, complemento)
                    OUTPUT INSERTED.*
                    VALUES (@rua, @numero, @bairro, @cidade, @estado, @cep, @complemento)
                `);

                return result.recordset[0]; // Retorna o endereço inserido
        } catch (error) {
            console.error('Erro ao inserir endereço:', error);
            throw new Error('Erro ao inserir endereço: ' + error);
        }

    }
}

module.exports = enderecoModel;