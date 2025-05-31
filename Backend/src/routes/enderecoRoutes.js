const express = require('express');

const router = express.Router(); // Cria um objeto router

const enderecoController = require('../controllers/enderecoController');

/**
 * @swagger
 * tags:
 *   name: Endereços
 *   description: API's para gerenciamento de endereços
 */

/**
 * @swagger
 * /api/endereco:
 *   post:
 *     summary: Cadastra um novo endereço
 *     tags: [Endereços]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rua:
 *                 type: string
 *                 example: "Rua das Flores"
 *               numero:
 *                 type: string
 *                 example: "123"
 *               bairro:
 *                 type: string
 *                 example: "Centro"
 *               cidade:
 *                 type: string
 *                 example: "São Paulo"
 *               estado:
 *                 type: string
 *                 example: "SP"
 *               cep:
 *                 type: string
 *                 example: "01001-000"
 *               complemento:
 *                 type: string
 *                 example: "Apto 45"
 *             required:
 *               - rua
 *               - cidade
 *               - estado
 *               - cep
 *     responses:
 *       201:
 *         description: Endereço cadastrado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Endereço cadastrado com sucesso
 *               endereco:
 *                 id: 1
 *                 rua: "Rua das Flores"
 *                 numero: "123"
 *                 bairro: "Centro"
 *                 cidade: "São Paulo"
 *                 estado: "SP"
 *                 cep: "01001-000"
 *                 complemento: "Apto 45"
 *               sucesso: true
 *       400:
 *         description: Dados obrigatórios não foram preenchidos
 *         content:
 *           application/json:
 *             example:
 *               error: Dados obrigatórios não foram preenchidos
 *               sucesso: false
 *       500:
 *         description: Erro ao cadastrar endereço
 *         content:
 *           application/json:
 *             example:
 *               error: Erro ao cadastrar endereço
 *               message: "Mensagem detalhada do erro"
 *               sucesso: false
 */
router.post('/endereco', enderecoController.cadastrar);

/**
 * @swagger
 * /api/endereco/vincular-usuario:
 *   post:
 *     summary: Vincula um endereço a um usuário
 *     tags: [Endereços]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUsuario:
 *                 type: integer
 *                 example: 1
 *               idEndereco:
 *                 type: integer
 *                 example: 2
 *             required:
 *               - idUsuario
 *               - idEndereco
 *     responses:
 *       201:
 *         description: Endereço vinculado ao usuário com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Endereço vinculado ao usuário com sucesso
 *               sucesso: true
 *       400:
 *         description: Dados obrigatórios não foram preenchidos
 *         content:
 *           application/json:
 *             example:
 *               error: Dados obrigatórios não foram preenchidos
 *               sucesso: false
 *       404:
 *         description: Usuário ou endereço não encontrado
 *         content:
 *           application/json:
 *             examples:
 *               UsuarioNaoEncontrado:
 *                 summary: Usuário não encontrado
 *                 value:
 *                   error: Usuário não encontrado
 *                   sucesso: false
 *               EnderecoNaoEncontrado:
 *                 summary: Endereço não encontrado
 *                 value:
 *                   error: Endereço não encontrado
 *                   sucesso: false
 *       500:
 *         description: Erro ao vincular endereço ao usuário
 *         content:
 *           application/json:
 *             example:
 *               error: Erro ao vincular endereço ao usuário
 *               message: "Mensagem detalhada do erro"
 *               sucesso: false
 */
router.post('/endereco/vincular-usuario', enderecoController.vincularUsuario);

/**
 * @swagger
 * /api/endereco/vincular-parceiro:
 *   post:
 *     summary: Vincula um endereço a um parceiro
 *     tags: [Endereços]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUsuario:
 *                 type: integer
 *                 example: 1
 *               idEndereco:
 *                 type: integer
 *                 example: 2
 *             required:
 *               - idParceiro
 *               - idEndereco
 *     responses:
 *       201:
 *         description: Endereço vinculado ao Parceiro com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Endereço vinculado ao Parceiro com sucesso
 *               sucesso: true
 *       400:
 *         description: Dados obrigatórios não foram preenchidos
 *         content:
 *           application/json:
 *             example:
 *               error: Dados obrigatórios não foram preenchidos
 *               sucesso: false
 *       404:
 *         description: Parceiro ou endereço não encontrado
 *         content:
 *           application/json:
 *             examples:
 *               UsuarioNaoEncontrado:
 *                 summary: Parceiro não encontrado
 *                 value:
 *                   error: Parceiro não encontrado
 *                   sucesso: false
 *               EnderecoNaoEncontrado:
 *                 summary: Endereço não encontrado
 *                 value:
 *                   error: Endereço não encontrado
 *                   sucesso: false
 *       500:
 *         description: Erro ao vincular endereço ao parceiro
 *         content:
 *           application/json:
 *             example:
 *               error: Erro ao vincular endereço ao parceiro
 *               message: "Mensagem detalhada do erro"
 *               sucesso: false
 */
router.post('/endereco/vincular-parceiro', enderecoController.vincularParceiro);

module.exports = router;