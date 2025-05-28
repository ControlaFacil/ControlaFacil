const express = require('express');
const router = express.Router();

// Rota de teste simples
router.get('/ping', (req, res) => {
    res.json({ message: 'Servidor funcionando ✅' });
});

module.exports = router;
