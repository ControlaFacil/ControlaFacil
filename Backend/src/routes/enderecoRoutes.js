const express = require('express');

const router = express.Router(); // Cria um objeto router

const enderecoController = require('../controllers/enderecoController');

/**
 * Rota POST para inserir um novo endereço
 * Endpoint: http://localhost:5000/api/endereco
 */
router.post('/endereco', enderecoController.cadastrar);

 /**
  * Rota POST para vincular um endereço a um usuário
  * Endpoint: http://localhost:5000/api/endereco/vincular-usuario
  */
router.post('/endereco/vincular-usuario', enderecoController.vincularUsuario);

module.exports = router;