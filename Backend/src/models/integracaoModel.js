// // O modelo integracaoModel é responsável por interagir com o banco de dados para operações relacionadas as integrações.

const { pool, query } = require("../config/db");

const integracaoModel = {
    async inserir({nome}){
        try {
            const sql = `INSERT INTO integracoes (nome) VALUES (?);`;
            
            const params = [nome];
            const result = await query(sql, params);
    
            const integracao = await query("SELECT * FROM integracoes WHERE id = ?", [
                result.insertId,
            ]);
            
            return integracao[0];
        } catch (error) {
            console.error("Erro ao inserir integração:", error);
            throw new Error("Erro ao inserir integração: " + error);
        }
    }
}

module.exports = integracaoModel;