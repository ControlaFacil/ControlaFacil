const express = require('express');

const autenticar = require('../middlewares/autenticar');

const router = express.Router();

const integracaoController = require('../controllers/integracaoController');


/**
 * @swagger
 * tags:
 *   name: Integrações
 *   description: API para gerenciamento de integrações
 */

/**
 * @swagger
 * /integracoes:
 *   post:
 *     summary: Insere uma nova integração
 *     tags: [Integrações]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Mercado Livre
 *     responses:
 *       201:
 *         description: Integração criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */

router.post('/integracoes', autenticar, integracaoController.inserirIntegracao);

module.exports = router;