const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Permite que o backend aceite requisições de qualquer domínio
app.use(cors());

// Permite que o backend receba JSON no corpo da requisição
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API está rodando! 🚀');
});

// Define o prefixo das rotas
app.use('/api', routes);

module.exports = app;
