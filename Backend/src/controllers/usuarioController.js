// O usuarioController é responsável por gerenciar as operações relacionadas a clientes, como inserção, atualização e exclusão de dados.

const Usuario = require('../models/usuarioModel');
const {gerarHash} = require("../utils/hash");

const usuarioController = {
    // Inserir usuario
    async inserirUsuario(req, res) {
        const { cnpj, razaoSocial, apelidoEmpresa, email, telefone, senha } = req.body;

        // Validação dos dados obrigatórios
        if (!cnpj || !razaoSocial || !email || !senha) {
            return res.status(400).json({ error: 'Dados obrigatórios não foram preenchidos' });
        }

        try {
            // Verificar se o CNPJ já existe
            const cnpjExiste = await Usuario.existeCnpj(cnpj)
            if( cnpjExiste ) {
                return res.status(400).json({ error: 'CNPJ já cadastrado' });
            }

            // Verificar se o email já existe
            const emailExiste = await Usuario.existeEmail(email);
            if (emailExiste) {
                return res.status(400).json({ error: 'Email já cadastrado' });
            }

            const senhaHash = await gerarHash(senha);

            // Chamar método do modelo para inserir o usuário
            await Usuario.inserir({
                cnpj,
                razaoSocial,
                apelidoEmpresa,
                email,
                telefone,
                senhaHash
            });

            return res.status(201).json({ message: 'Usuário inserido com sucesso' });
        } catch (error) {
            console.error('Erro ao inserir usuário:', error);
            return res.status(500).json({ error: 'Erro ao inserir usuário', message: error.message});
        }
    }
}

module.exports = usuarioController;