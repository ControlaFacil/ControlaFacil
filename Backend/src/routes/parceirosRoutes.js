const express = require('express');

const router = express.Router();

const parceirosController = require('../controllers/parceirosController');

/**
 * @swagger
 * tags:
 *   name: Parceiros
 *   description: API's para gerenciamento de parceiros
 */


/**
 * @swagger
 * /api/parceiros:
 *   post:
 *     summary: Cria um novo parceiro no sistema
 *     tags: [Parceiros]
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
 *                 example: "João LTDA"
 *               tipoParceiro:
 *                 type: string
 *                 example: "Fornecedor"
 *               nomeFantasia:
 *                 type: string
 *                 example: "Empresa João"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               telefone:
 *                 type: string
 *                 example: "11988887777"
 *             required:
 *               - cnpj
 *               - razaoSocial
 *               - tipoParceiro
 *     responses:
 *       201:
 *         description: Parceiro cadastrado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Parceiro cadastrado com sucesso
 *               parceiro:
 *                 id: 1
 *                 endereco: null
 *                 idUsuario: null
 *                 razaoSocial: "EMPRESA DO JOAO LTDA"
 *                 cnpj: "16987512000123"
 *                 nomeFantasia: "Fornecedor Joao"
 *                 TipoParceiro: "fornecedor"
 *                 email: "joaofornecedor@gmail.com"
 *                 telefone: "11973452234"
 *                 criadoEm: "2025-05-31T15:03:10.737Z"
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
 *       500:
 *         description: Erro interno ao inserir parceiro
 */
router.post('/parceiros', parceirosController.cadastrar);

/**
 * @swagger
 * /api/parceiros:
 *   get:
 *     summary: Lista todos os parceiros
 *     tags: [Parceiros]
 *     responses:
 *       200:
 *         description: Lista de parceiros retornada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               quantidade: 2
 *               data:
 *                 - id: 1
 *                   razaoSocial: "João LTDA"
 *                   cnpj: "12345678000100"
 *                   tipoParceiro: "Fornecedor"
 *                   nomeFantasia: "Empresa João"
 *                   email: "joao@email.com"
 *                   telefone: "11988887777"
 *                 - id: 2
 *                   razaoSocial: "Maria ME"
 *                   cnpj: "98765432000100"
 *                   tipoParceiro: "Cliente"
 *                   nomeFantasia: "Empresa Maria"
 *                   email: "maria@email.com"
 *                   telefone: "11988887778"
 *               sucesso: true
 *       500:
 *         description: Erro ao listar parceiros
 *         content:
 *           application/json:
 *             example:
 *               error: Erro ao listar parceiros
 *               message: "Mensagem detalhada do erro"
 *               sucesso: false
 */
router.get('/parceiros', parceirosController.listarParceiros);

/**
 * @swagger
 * /api/parceiros/{id}:
 *   get:
 *     summary: Busca um parceiro pelo ID
 *     tags: [Parceiros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do parceiro
 *         example: 1
 *     responses:
 *       200:
 *         description: Parceiro encontrado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               razaoSocial: "João LTDA"
 *               cnpj: "12345678000100"
 *               tipoParceiro: "Fornecedor"
 *               nomeFantasia: "Empresa João"
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
 *         description: Parceiro não encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: Parceiro não encontrado
 *               sucesso: false
 *       500:
 *         description: Erro ao buscar parceiro
 *         content:
 *           application/json:
 *             example:
 *               error: Erro ao buscar parceiro
 *               message: "Mensagem detalhada do erro"
 *               sucesso: false
 */
router.get('/parceiros/:id', parceirosController.buscarPorId);

module.exports = router;