const { pool, query } = require("./config/db");

async function testarConexao() {
  try {
    const result = await query("SELECT NOW() AS dataHoraAtual");
    console.log(
      "Conexão bem-sucedida. Data e hora atual do banco:",
      result[0].dataHoraAtual
    );
  } catch (err) {
    console.error("Erro na conexão com o banco:", err);
  }
}

testarConexao();
