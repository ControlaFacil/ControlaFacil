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

    },

    async vincularUsuario({ idUsuario, idEndereco }) {
        await poolConnect;

        try {
            await pool.request()
                .input("idUsuario", sql.Int, idUsuario)
                .input("idEndereco", sql.Int, idEndereco)
                .query(`
                    INSERT INTO Vinculo_Usuario_Endereco (idUsuario, idEndereco)
                    VALUES (@idUsuario, @idEndereco)
                `);
        } catch (error) {
            console.error('Erro ao vincular endereço ao usuário:', error);
            throw new Error('Erro ao vincular endereço ao usuário: ' + error);
        }
    },

    async vincularParceiro({ idParceiro, idEndereco }) {
        await poolConnect;

        try {
            await pool.request()
                .input("idParceiro", sql.Int, idParceiro)
                .input("idEndereco", sql.Int, idEndereco)
                .query(`
                    INSERT INTO Vinculo_Parceiro_Endereco (idParceiro, idEndereco)
                    VALUES (@idParceiro, @idEndereco)
                `);
        }
        catch (error) {
            console.error('Erro ao vincular endereço ao parceiro:', error);
            throw new Error('Erro ao vincular endereço ao parceiro: ' + error);
        }
    },

    async existeId(id) {
        await poolConnect;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT 1 AS existe FROM Endereco WHERE id = @id');

        return result.recordset.length > 0; // Retorna true se existir, false caso contrário
    },

    async listarTodos() {
        await poolConnect;
        try {
            const result = await pool.request()
                .query('SELECT * FROM Endereco');

            return result.recordset;
        }
        catch (error) {
            console.error('Erro ao listar endereços:', error);
            throw new Error('Erro ao listar endereços: ' + error);
        }
    },

    async buscarPorId(id) {
        await poolConnect;
        try {
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM Endereco WHERE id = @id');

            return result.recordset[0];
        } catch (error) {
            console.error('Erro ao buscar endereço por ID:', error);
            throw new Error('Erro ao buscar endereço por ID: ' + error);
        }
    },

    async buscarPorUsuarioId(idUsuario) {
        await poolConnect;
        try {
            const result = await pool.request()
                .input('idUsuario', sql.Int, idUsuario)
                .query(`
                    SELECT e.* 
                    FROM Endereco e
                    INNER JOIN Vinculo_Usuario_Endereco vue ON vue.idEndereco = e.id
                    WHERE vue.idUsuario = @idUsuario
                `);
            return result.recordset;
        } catch (error) {
            console.error('Erro ao buscar endereço por ID de usuário:', error);
            throw new Error('Erro ao buscar endereço por ID de usuário: ' + error);
        }
    },

    async buscarPorParceiroId(idParceiro) {
        await poolConnect;
        try {
            const result = await pool.request()
                .input('idParceiro', sql.Int, idParceiro)
                .query(`
                        SELECT e.* 
                        FROM Endereco e
                        INNER JOIN Vinculo_Parceiro_Endereco vpe ON vpe.idEndereco= e.id
                        WHERE vpe.idParceiro = 1
                    `)
            return result.recordset;
        }
        catch (error) {
            console.error('Erro ao buscar endereço por ID de parceiro:', error);
            throw new Error('Erro ao buscar endereço por ID de parceiro: ' + error);
        }
    }
}

module.exports = enderecoModel;