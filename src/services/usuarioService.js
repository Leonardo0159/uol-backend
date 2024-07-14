const connection = require('../config/connection');
const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUsuario = async (usuario) => {
    const { nome, email, senha } = usuario;
    const hashedPassword = await bcrypt.hash(senha, 10);
    const query = 'INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)';
    const [result] = await connection.execute(query, [nome, email, hashedPassword]);
    return { insertId: result.insertId };
};

const loginUsuario = async (email, senha) => {
    const [rows] = await connection.execute('SELECT * FROM Usuario WHERE email = ?', [email]);
    if (rows.length === 0) {
        return { error: 'Usuário não encontrado' };
    }
    const usuario = new Usuario(rows[0].id, rows[0].nome, rows[0].email, rows[0].senha);

    const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
    if (!isPasswordValid) {
        return { error: 'Senha incorreta' };
    }
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
};

module.exports = {
    createUsuario,
    loginUsuario,
};
