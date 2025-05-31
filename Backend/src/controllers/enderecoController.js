// O enderecoController é responsável por gerenciar as operações relacionadas a endereços, como inserção, atualização e exclusão de dados.

const Endereco = require('../models/enderecoModel');
const Usuario = require('../models/usuarioModel');
const Parceiro = require('../models/parceirosModel');

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

    async vincularParceiro(req, res) {
        const { idParceiro, idEndereco } = req.body;

        if (!idParceiro || !idEndereco) {
            return res.status(400).json({ error: 'Dados obrigatórios não foram preenchidos', sucesso: false });
        }

        try {
            const parceiroExiste = await Parceiro.existeId(idParceiro);
            if (!parceiroExiste) {
                return res.status(404).json({
                    error: 'Parceiro não encontrado',
                    sucesso: false
                });
            }

            const enderecoExiste = await Endereco.existeId(idEndereco);
            if (!enderecoExiste) {
                return res.status(404).json({
                    error: 'Endereço não encontrado',
                    sucesso: false
                });
            }

            // Vincula o endereço ao parceiro
            await Endereco.vincularParceiro({ idParceiro, idEndereco });
            return res.status(201).json({
                message: 'Endereço vinculado ao parceiro com sucesso',
                sucesso: true
            });
        } catch (error) {
            console.error('Erro ao vincular endereço ao parceiro:', error);
            return res.status(500).json({
                error: 'Erro ao vincular endereço ao parceiro',
                message: error.message,
                sucesso: false
            });
        }
    },

    async listarEnderecos(req, res) {
        try {
            const enderecos = await Endereco.listarTodos();

            if (enderecos.length === 0) {
                return res.status(404).json({
                    message: 'Nenhum endereço encontrado',
                    sucesso: true
                });
            }

            return res.status(200).json({
                message: 'Endereços listados com sucesso',
                enderecos: enderecos,
                sucesso: true
            });

        } catch (error) {
            console.error('Erro ao listar endereços:', error);
            return res.status(500).json({
                error: 'Erro ao listar endereços',
                message: error.message,
                sucesso: false
            });
        }
    },

    async buscarPorId(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'ID é obrigatório', sucesso: false });
        }

        try {
            const endereco = await Endereco.buscarPorId(id);

            if (!endereco) {
                return res.status(404).json({
                    error: 'Endereço não encontrado',
                    sucesso: false
                });
            }

            return res.status(200).json({
                message: 'Endereço encontrado',
                endereco: endereco,
                sucesso: true
            })
        } catch (error) {
            console.error('Erro ao buscar endereço por ID:', error);
            return res.status(500).json({
                error: 'Erro ao buscar endereço por ID',
                message: error.message,
                sucesso: false
            });
        }
    },

    async buscarPorUsuarioId(req, res) {
        const { idUsuario } = req.params;
        if (!idUsuario) {
            return res.status(400).json({ error: 'ID do usuário é obrigatório', sucesso: false });
        }

        try {
            const enderecos = await Endereco.buscarPorUsuarioId(idUsuario);

            if (enderecos.length === 0) {
                return res.status(404).json({
                    message: 'Nenhum endereço encontrado para este usuário',
                    sucesso: false
                });
            }

            return res.status(200).json({
                message: 'Endereços encontrados para o usuário',
                enderecos: enderecos,
                sucesso: true
            });
        }
        catch (error) {
            console.error('Erro ao buscar endereços por ID de usuário:', error);
            return res.status(500).json({
                error: 'Erro ao buscar endereços por ID de usuário',
                message: error.message,
                sucesso: false
            });
        }
    },

    async buscarPorParceiroId(req, res) {
        const { idParceiro } = req.params;
        if (!idParceiro) {
            return res.status(400).json({ error: 'ID do parceiro é obrigatório', sucesso: false });
        }

        try {
            const enderecos = await Endereco.buscarPorParceiroId(idParceiro);

            if (enderecos.length === 0) {
                return res.status(404).json({
                    message: 'Nenhum endereço encontrado para este parceiro',
                    sucesso: false
                });
            }

            return res.status(200).json({
                message: 'Endereços encontrados para o parceiro',
                enderecos: enderecos,
                sucesso: true
            });
        } catch (error) {
            console.error('Erro ao buscar endereços por ID de parceiro:', error);
            return res.status(500).json({
                error: 'Erro ao buscar endereços por ID de parceiro',
                message: error.message,
                sucesso: false
            });
        }
    }
}

module.exports = enderecoController;