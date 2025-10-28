// O modelo usuarioModel é responsável por interagir com o banco de dados para operações relacionadas aos usuários.

const { pool, query } = require("../config/db");

const usuarioModel = {
  // Inserir Usuario
  async inserir({ nome, email, cpf, celular, cargo, senhaHash }) {
    try {
      const sql = `
                INSERT INTO usuarios (nome, email, cpf, celular, cargo, senhaHash)
                VALUES (?, ?, ?, ?, ?, ?);
            `;

      const params = [nome, email, cpf, celular, cargo, senhaHash];
      const result = await query(sql, params);

      const usuario = await query("SELECT * FROM usuarios WHERE id = ?", [
        result.insertId,
      ]);

      return usuario[0];
    } catch (error) {
      console.error("Erro ao inserir usuário:", error);
      throw new Error("Erro ao inserir usuário: " + error);
    }
  },

  async listarUsuarios() {
    try {
        const usuarios = await query("SELECT id, nome, email, cpf, celular, cargo FROM usuarios");
        return usuarios;
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      throw new Error("Erro ao listar usuários: " + error);
    }
  },

  async buscarPorId(id) {
    try {
      const result = await query("SELECT id, nome, email, cpf, celular, cargo FROM usuarios WHERE id = ?", [id]);
      return result[0];
    } catch (error) {
      console.error("Erro ao buscar usuário por ID:", error);
      throw new Error("Erro ao buscar usuário por ID: " + error);
    }
  },

  async buscarPorEmail(email) {
    try {
      const result = await query("SELECT * FROM usuarios WHERE email = ?", [
        email,
      ]);
      return result[0];
    } catch (error) {
      console.error("Erro ao buscar usuário por email:", error);
      throw new Error("Erro ao buscar usuário por email: " + error);
    }
  },

  async existeCpf(cpf) {
    try {
      const result = await query(
        "SELECT 1 AS existe FROM usuarios WHERE cpf = ?",
        [cpf]
      );
      return result.length > 0;
    } catch (error) {
      console.error("Erro ao verificar CPF:", error);
      throw new Error("Erro ao verificar CPF: " + error);
    }
  },

  async existeEmail(email) {
    try {
      const result = await query(
        "SELECT 1 AS existe FROM usuarios WHERE email = ?",
        [email]
      );
      return result.length > 0;
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      throw new Error("Erro ao verificar email: " + error);
    }
  },

  async existeId(id) {
    await poolConnect;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT 1 AS existe FROM Usuario WHERE id = @id");

    return result.recordset.length > 0; // Retorna true se existir, false caso contrário
  },
};

module.exports = usuarioModel;
