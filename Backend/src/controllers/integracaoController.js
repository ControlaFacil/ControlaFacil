// O integracaoController é responsável por gerenciar as operações relacionadas a integrações, como inserção, atualização e exclusão de dados.

const Integracao = require("../models/integracaoModel");

const integracaoController = {
  async inserirIntegracao(req, res) {
    try {
        const { nome } = req.body;

        if(!nome){
            return res.status(400).json({
                error: "Nome da integração é obrigatório",
                sucesso: false,
            });
        }

        const integracaoCadastrada = await Integracao.inserir({ nome });

        return res.status(201).json({
            message: "Integração inserida com sucesso",
            Integracao: integracaoCadastrada,
            sucesso: true,
        });

    } catch (error) {
      console.error("Erro ao inserir integração:", error);
      return res.status(500).json({
        error: "Erro ao inserir integração",
        sucesso: false,
      });
    }
  },
};

module.exports = integracaoController;
