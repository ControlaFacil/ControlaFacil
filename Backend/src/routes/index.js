const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuarioRoutes');
const integracoesRoutes = require('./integracaoRoutes');

router.use(usuarioRoutes);
router.use(integracoesRoutes);

module.exports = router;
