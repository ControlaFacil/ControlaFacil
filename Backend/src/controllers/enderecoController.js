// O enderecoController é responsável por gerenciar as operações relacionadas a endereços, como inserção, atualização e exclusão de dados.

const Endereco = require('../models/enderecoModel');

const enderecoController = {
    // cadastrar um novo endereço
    async cadastrar(req, res) {
        const { rua, numero, bairro, cidade, estado, cep, complemento } = req.body;

        if (!rua || !cidade || !estado || !cep) {
            return res.status(400).json({ error: 'Dados obrigatórios não foram preenchidos', sucesso: false });
        }

        try {
            const enderecoCadastrado = await Endereco.inserir({
                rua,
                numero,
                bairro,
                cidade,
                estado,
                cep,
                complemento
            })

            return res.status(201).json({
                message: 'Endereço cadastrado com sucesso',
                endereco: enderecoCadastrado,
                sucesso: true
            });
        }
        catch (error) {
            console.error('Erro ao cadastrar endereço:', error);
            return res.status(500).json({
                error: 'Erro ao cadastrar endereço',
                message: error.message,
                sucesso: false
            });
        }

    }
}

module.exports = enderecoController;