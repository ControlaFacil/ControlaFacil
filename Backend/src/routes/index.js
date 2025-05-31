const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuarioRoutes');
const enderecoRoutes = require('./enderecoRoutes');
const parceirosRoutes = require('./parceirosRoutes');

router.use(usuarioRoutes);
router.use(enderecoRoutes);
router.use(parceirosRoutes);

module.exports = router;
