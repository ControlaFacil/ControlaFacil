// O usuarioController é responsável por gerenciar as operações relacionadas a clientes, como inserção, atualização e exclusão de dados.

const Usuario = require("../models/usuarioModel");
const { gerarToken } = require("../utils/token");
const { gerarHash } = require("../utils/hash");
const { conferirHash } = require("../utils/hash");

const usuarioController = {
  // Inserir usuario
  async inserirUsuario(req, res) {
    const { nome, email, cpf, celular, cargo, senha } = req.body;

    // Validação dos dados obrigatórios
    if (!nome || !email || !cpf || !celular || !cargo || !senha) {
      return res.status(400).json({
        error: "Dados obrigatórios não foram preenchidos",
        sucesso: false,
      });
    }

    try {
      // Verificar se o CPF já existe
      const cpfExiste = await Usuario.existeCpf(cpf);
      if (cpfExiste) {
        return res.status(400).json({
          error: "CPF já cadastrado",
          sucesso: false,
        });
      }

      // Verificar se o email já existe
      const emailExiste = await Usuario.existeEmail(email);
      if (emailExiste) {
        return res.status(400).json({
          error: "Email já cadastrado",
          sucesso: false,
        });
      }

      const senhaHash = await gerarHash(senha);

      // Chamar método do modelo para inserir o usuário
      const usuarioCadastrado = await Usuario.inserir({
        nome,
        email,
        cpf,
        celular,
        cargo,
        senhaHash,
      });

      return res.status(201).json({
        message: "Usuário inserido com sucesso",
        idUsuario: usuarioCadastrado,
        sucesso: true,
      });
    } catch (error) {
      console.error("Erro ao inserir usuário:", error);
      return res.status(500).json({
        error: "Erro ao inserir usuário",
        message: error.message,
        sucesso: false,
      });
    }
  },

  async login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res
        .status(400)
        .json({ error: "Email e senha são obrigatórios", sucesso: false });
    }

    try {
      const usuario = await Usuario.buscarPorEmail(email);

      if (!usuario) {
        return res
          .status(404)
          .json({ error: "Usuário não encontrado", sucesso: false });
      }

      const senhaCorreta = await conferirHash(senha, usuario.senhaHash);
      if (!senhaCorreta) {
        return res
          .status(401)
          .json({ error: "Senha incorreta", sucesso: false });
      }

      const token = gerarToken({
        id: usuario.id,
        nome: usuario.nome,
        cargo: usuario.cargo,
      });

      return res.status(200).json({
        message: "Login realizado com sucesso",
        token: token,
        sucesso: true,
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return res.status(500).json({
        error: "Erro ao fazer login",
        message: error.message,
        sucesso: false,
      });
    }
  },

  async listarUsuarios() {
    try {
      const usuarios = await Usuario.listarUsuarios();

      return {
        quantidade: usuarios.length,
        data: usuarios,
        sucesso: true,
      };
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      return {
        error: "Erro ao listar usuários",
        message: error.message,
        sucesso: false,
      };
    }
  },

  async buscarPorId(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ error: "ID é obrigatório", sucesso: false });
    }

    try {
      const usuario = await Usuario.buscarPorId(id);

      if (!usuario) {
        return res.status(404).json({
          error: "Usuário não encontrado",
          sucesso: false,
        });
      }

      return res.status(200).json({
        message: "Usuário encontrado",
        data: usuario,
        sucesso: true,
      });
    } catch (error) {
      console.error("Erro ao buscar usuário por ID:", error);
      return res.status(500).json({
        error: "Erro ao buscar usuário por ID",
        message: error.message,
        sucesso: false,
      });
    }
  },

  async dadosUsuarioLogado(req, res) {
    try {
      const usuarioId = req.usuario.id;

      const usuario = await Usuario.buscarPorId(usuarioId);

      if (!usuario) {
        return res.status(404).json({
          error: "Usuário não encontrado",
          sucesso: false,
        });
      }

      return res.status(200).json({
        message: "Dados do usuário logado obtidos com sucesso",
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          cpf: usuario.cpf,
          celular: usuario.celular,
          cargo: usuario.cargo,
        },
        sucesso: true,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao obter dados do usuário logado",
        message: error.message,
        sucesso: false,
      });
    }
  },
};

module.exports = usuarioController;
