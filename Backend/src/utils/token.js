const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';