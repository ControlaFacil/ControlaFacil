const express = require('express');

const autenticar = require('../middlewares/autenticar');
const router = express.Router(); // Cria um objeto router

const usuarioController = require('../controllers/usuarioController');

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: API para gerenciamento de usuários
 */

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cria um novo usuário no sistema
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               cpf:
 *                 type: string
 *                 example: "12345678900"
 *               celular:
 *                 type: string
 *                 example: "11999999999"
 *               cargo:
 *                 type: string
 *                 example: "Administrador"
 *               senha:
 *                 type: string
 *                 example: "senhaSegura123"
 *             required:
 *               - nome
 *               - email
 *               - cpf
 *               - celular
 *               - cargo
 *               - senha
 *     responses:
 *       201:
 *         description: Usuário inserido com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Usuário inserido com sucesso
 *               usuario:
 *                 id: 10
 *                 nome: "João da Silva"
 *                 email: "joao@email.com"
 *                 cpf: "12345678900"
 *                 celular: "11999999999"
 *                 cargo: "Administrador"
 *                 data_criacao: "2025-10-27T12:34:56.000Z"
 *                 excluido: 0
 *               sucesso: true
 *       400:
 *         description: Erro na requisição
 *         content:
 *           application/json:
 *             examples:
 *               DadosObrigatorios:
 *                 summary: Dados obrigatórios não foram preenchidos
 *                 value:
 *                   error: Dados obrigatórios não foram preenchidos
 *                   sucesso: false
 *               CpfJaCadastrado:
 *                 summary: CPF já cadastrado
 *                 value:
 *                   error: CPF já cadastrado
 *                   sucesso: false
 *               EmailJaCadastrado:
 *                 summary: Email já cadastrado
 *                 value:
 *                   error: Email já cadastrado
 *                   sucesso: false
 *       500:
 *         description: Erro interno ao inserir usuário
 */

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Faz o login de um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               senha:
 *                 type: string
 *                 example: "senhaSegura123"
 *             required:
 *               - email
 *               - senha
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Login realizado com sucesso
 *               usuario:
 *                 id: 10
 *                 nome: "João da Silva"
 *                 cpf: "12345678900"
 *                 celular: "11999999999"
 *                 email: "joao@email.com"
 *                 cargo: "Administrador"
 *               sucesso: true
 *       400:
 *         description: Dados obrigatórios não foram preenchidos
 *         content:
 *           application/json:
 *             example:
 *               error: Email e senha são obrigatórios
 *               sucesso: false
 *       401:
 *         description: Senha incorreta
 *         content:
 *           application/json:
 *             example:
 *               error: Senha incorreta
 *               sucesso: false
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: Usuário não encontrado
 *               sucesso: false
 *       500:
 *         description: Erro interno ao fazer login
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               quantidade: 2
 *               data:
 *                 - id: 1
 *                   nome: "João da Silva"
 *                   email: "joao@email.com"
 *                   cpf: "12345678900"
 *                   celular: "11999999999"
 *                   cargo: "Administrador"
 *                 - id: 2
 *                   nome: "Maria Souza"
 *                   email: "maria@email.com"
 *                   cpf: "98765432100"
 *                   celular: "11988887778"
 *                   cargo: "Usuário"
 *               sucesso: true
 *       500:
 *         description: Erro ao listar usuários
 *         content:
 *           application/json:
 *             example:
 *               error: Erro ao listar usuários
 *               message: "Mensagem detalhada do erro"
 *               sucesso: false
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Usuário encontrado
 *               data:
 *                 id: 1
 *                 nome: "João da Silva"
 *                 email: "joao@email.com"
 *                 cpf: "12345678900"
 *                 celular: "11999999999"
 *                 cargo: "Administrador"
 *               sucesso: true
 *       400:
 *         description: ID não informado
 *         content:
 *           application/json:
 *             example:
 *               error: ID é obrigatório
 *               sucesso: false
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: Usuário não encontrado
 *               sucesso: false
 *       500:
 *         description: Erro ao buscar usuário
 *         content:
 *           application/json:
 *             example:
 *               error: Erro ao buscar usuário por ID
 *               message: "Mensagem detalhada do erro"
 *               sucesso: false
 */

router.post('/usuarios', autenticar, usuarioController.inserirUsuario);
router.post('/usuarios/login', usuarioController.login);
router.get('/usuarios', autenticar, usuarioController.listarUsuarios);
router.get('/usuarios/:id', autenticar, usuarioController.buscarPorId);

module.exports = router;