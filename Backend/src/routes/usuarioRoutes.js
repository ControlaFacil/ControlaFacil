const express = require('express');

const router = express.Router(); // Cria um objeto router

const usuarioController = require('../controllers/usuarioController');

/**
 * Rota POST para inserir um novo usuário
 * Endpoint: http://localhost:5000/api/usuarios
 */
router.post('/usuarios', usuarioController.inserirUsuario)

/**
 * Rota POST para login de usuário
 * Endpoint: http://localhost:5000/api/usuarios/login
 */
router.post ('/usuarios/login', usuarioController.login);

module.exports = router;