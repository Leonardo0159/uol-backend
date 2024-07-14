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

const getUsuarioByEmail = async (email) => {
    const [rows] = await connection.execute('SELECT * FROM Usuario WHERE email = ?', [email]);
    if (rows.length === 0) {
        return null;
    }
    const row = rows[0];
    return new Usuario(row.id, row.nome, row.email, row.senha);
};

const loginUsuario = async (email, senha) => {
    const usuario = await getUsuarioByEmail(email);
    if (!usuario) {
        return { error: 'Usuário não encontrado' };
    }
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
