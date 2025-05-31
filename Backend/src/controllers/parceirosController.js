// O enderecoController é responsável por gerenciar as operações relacionadas a parceiros, como inserção, atualização e exclusão de dados.

const Parceiro = require('../models/parceirosModel');

const parceiroController = {
    async cadastrar(req, res) {
        const {cnpj, razaoSocial, tipoParceiro, nomeFantasia, email, telefone} = req.body;

        if(!cnpj || !razaoSocial || !tipoParceiro) {
            return res.status(400).json({ error: 'Dados obrigatórios não foram preenchidos', sucesso: false });
        }

        try {
            const parceiroCadastrado = await Parceiro.inserir({
                cnpj,
                razaoSocial,
                tipoParceiro,
                nomeFantasia: nomeFantasia || null,
                email: email || null,
                telefone: telefone || null
            })

            return res.status(201).json({
                message: 'Parceiro cadastrado com sucesso',
                parceiro: parceiroCadastrado,
                sucesso: true
            });
            
        } catch (error) {
            console.error('Erro ao cadastrar parceiro:', error);
            return res.status(500).json({ error: 'Erro ao cadastrar parceiro', message: error.message, sucesso: false });
        }
    }
}

module.exports = parceiroController;