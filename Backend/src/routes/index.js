const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuarioRoutes');
const enderecoRoutes = require('./enderecoRoutes');

router.use(usuarioRoutes);
router.use(enderecoRoutes);

module.exports = router;
