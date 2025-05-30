const app = require('./app');
const swaggerDocs = require('../docs/swagger');

const PORT = process.env.PORT || 5000;

swaggerDocs(app);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
