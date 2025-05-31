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

module.exports = router;