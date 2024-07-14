const usuarioService = require('../services/usuarioService');

const registerUsuario = async (req, res) => {
    try {
        const usuario = await usuarioService.createUsuario(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};

const loginUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const result = await usuarioService.loginUsuario(email, senha);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

module.exports = {
    registerUsuario,
    loginUsuario,
};
