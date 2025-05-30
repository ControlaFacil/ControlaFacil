const express = require('express');

const usuariosRoutes = require('./routes/usuarioRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');

const app = express();

app.use(express.json()); // Middleware para analisar JSON

app.use('/api', usuariosRoutes); // Define a rota base para as rotas de usuários
app.use('/api', enderecoRoutes); // Define a rota base para as rotas de endereços

// Rota simples para testar se o servidor está online
app.get('/', (req, res) => {
    res.send('API está rodando!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});