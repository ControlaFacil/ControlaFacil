const express = require('express');

const router = express.Router(); // Cria um objeto router

const enderecoController = require('../controllers/enderecoController');

/**
 * Rota POST para inserir um novo endereço
 * Endpoint: http://localhost:5000/api/endereco
 */
router.post('/endereco', enderecoController.cadastrar);

module.exports = router;