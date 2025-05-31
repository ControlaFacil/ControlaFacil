// O enderecoController é responsável por gerenciar as operações relacionadas a parceiros, como inserção, atualização e exclusão de dados.

const Parceiro = require('../models/parceirosModel');

const parceiroController = {
    async cadastrar(req, res) {
        const { cnpj, razaoSocial, tipoParceiro, nomeFantasia, email, telefone } = req.body;

        if (!cnpj || !razaoSocial || !tipoParceiro) {
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
    },

    async listarParceiros(req, res) {
        try {
            const parceiros = await Parceiro.listarParceiros();

            if (parceiros.length === 0) {
                return res.status(404).json({
                    message: 'Nenhum parceiro encontrado',
                    sucesso: true,
                    parceiros: []
                });
            }

            return res.status(200).json({
                message: 'Lista de parceiros',
                parceiros: parceiros,
                sucesso: true
            });
        } catch (error) {
            console.error('Erro ao listar parceiros:', error);
            return res.status(500).json({
                error: 'Erro ao listar parceiros',
                message: error.message,
                sucesso: false
            });
        }
    },

    async buscarPorId(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                error: 'ID do parceiro não informado',
                sucesso: false
            });
        }

        try {
            const parceiro = await Parceiro.buscarPorId(id);

            if (!parceiro) {
                return res.status(404).json({
                    error: 'Parceiro não encontrado',
                    sucesso: false
                })
            }

            return res.status(200).json({
                message: 'Parceiro encontrado',
                parceiro: parceiro,
                sucesso: true
            })
        } catch (error) {
            console.error('Erro ao buscar parceiro por ID:', error);
            return res.status(500).json({
                error: 'Erro ao buscar parceiro por ID',
                message: error.message,
                sucesso: false
            });
        }
    }
}

module.exports = parceiroController;