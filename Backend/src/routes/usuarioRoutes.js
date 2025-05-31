const express = require('express');

const router = express.Router(); // Cria um objeto router

const usuarioController = require('../controllers/usuarioController');

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: API's para gerenciamento de usuários
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
 *               cnpj:
 *                 type: string
 *                 example: "12345678000100"
 *               razaoSocial:
 *                 type: string
 *                 example: "Empresa João"
 *               apelidoEmpresa:
 *                 type: string
 *                 example: "João LTDA"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               telefone:
 *                 type: string
 *                 example: "11988887777"
 *               senha:
 *                 type: string
 *                 example: "senhaSegura123"
 *             required:
 *               - cnpj
 *               - razaoSocial
 *               - email
 *               - senha
 *     responses:
 *       201:
 *         description: Usuário inserido com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Usuário inserido com sucesso
 *               idUsuario:
 *                 id: 10
 *                 cnpj: "12345678000100"
 *                 razaoSocial: "Empresa João"
 *                 apelidoEmpresa: "João LTDA"
 *                 email: "joao@email.com"
 *                 telefone: "11988887777"
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
 *               CnpjJaCadastrado:
 *                 summary: CNPJ já cadastrado
 *                 value:
 *                   error: CNPJ já cadastrado
 *                   sucesso: false
 *               EmailJaCadastrado:
 *                 summary: Email já cadastrado
 *                 value:
 *                   error: Email já cadastrado
 *                   sucesso: false
 *       500:
 *         description: Erro interno ao inserir usuário
 */
router.post('/usuarios', usuarioController.inserirUsuario)

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
 *                 example: "joao@gmail.com"
 *               senha:
 *                 type: string
 *                 example: "123456"
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
 *                 id: 1
 *                 cnpj: "12345678000199"
 *                 razaoSocial: "Empresa Exemplo"
 *                 apelidoEmpresa: "Exemplo"
 *                 email: "joao@gmail.com"
 *                 telefone: "11999999999"
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
router.post ('/usuarios/login', usuarioController.login);

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
 *                   cnpj: "12345678000100"
 *                   razaoSocial: "Empresa João"
 *                   apelidoEmpresa: "João LTDA"
 *                   email: "joao@email.com"
 *                   telefone: "11988887777"
 *                 - id: 2
 *                   cnpj: "98765432000100"
 *                   razaoSocial: "Empresa Maria"
 *                   apelidoEmpresa: "Maria ME"
 *                   email: "maria@email.com"
 *                   telefone: "11988887778"
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
router.get('/usuarios', usuarioController.listarUsuarios);

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
 *               id: 1
 *               cnpj: "12345678000100"
 *               razaoSocial: "Empresa João"
 *               apelidoEmpresa: "João LTDA"
 *               email: "joao@email.com"
 *               telefone: "11988887777"
 *               sucesso: true
 *       400:
 *         description: ID não informado
 *         content:
 *           application/json:
 *             example:
 *               error: ID não informado
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
 *               error: Erro ao buscar usuário
 *               message: "Mensagem detalhada do erro"
 *               sucesso: false
 */
router.get('/usuarios/:id', usuarioController.buscarPorId);

module.exports = router;