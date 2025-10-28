const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuarioRoutes');

router.use(usuarioRoutes);

module.exports = router;
