const express = require('express');

const autenticar = require('../middlewares/autenticar');

const router = express.Router();

const integracaoController = require('../controllers/integracaoController');

// Swagger tags definition

router.post('/integracoes', autenticar, integracaoController.inserirIntegracao);

module.exports = router;