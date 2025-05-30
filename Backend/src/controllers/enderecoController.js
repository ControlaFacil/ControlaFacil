// O enderecoController é responsável por gerenciar as operações relacionadas a endereços, como inserção, atualização e exclusão de dados.

const Endereco = require('../models/enderecoModel');
const Usuario = require('../models/usuarioModel');

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

    },

    // Vincular endereço a um usuário
    async vincularUsuario(req, res) {
        const { idUsuario, idEndereco } = req.body;

        if (!idUsuario || !idEndereco) {
            return res.status(400).json({ error: 'Dados obrigatórios não foram preenchidos', sucesso: false });
        }

        try {
            // Verifica se o usuário existe
            const usuarioExiste = await Usuario.existeId(idUsuario);
            if (!usuarioExiste) {
                return res.status(404).json({
                    error: 'Usuário não encontrado',
                    sucesso: false
                });
            }

            // Verficar se o endereço existe
            const enderecoExiste = await Endereco.existeId(idEndereco);
            if (!enderecoExiste) {
                return res.status(404).json({
                    error: 'Endereço não encontrado',
                    sucesso: false
                });
            }

            // Vincula o endereço ao usuário
            await Endereco.vincularUsuario({ idUsuario, idEndereco });
            
            return res.status(201).json({
                message: 'Endereço vinculado ao usuário com sucesso',
                sucesso: true
            })

        } catch (error) {
            console.error('Erro ao vincular endereço ao usuário:', error);
            return res.status(500).json({
                error: 'Erro ao vincular endereço ao usuário',
                message: error.message,
                sucesso: false
            });
        }
    },


}

module.exports = enderecoController;