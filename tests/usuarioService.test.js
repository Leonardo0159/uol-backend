const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioService = require('../src/services/usuarioService');
const connection = require('../src/config/connection');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../src/config/connection');

describe('Usuario Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve criar um novo usuário', async () => {
        connection.execute.mockResolvedValue([{ insertId: 1 }]);
        bcrypt.hash.mockResolvedValue('hashedpassword');

        const usuario = { nome: 'Novo Usuario', email: 'novo@usuario.com', senha: '123456' };
        const result = await usuarioService.createUsuario(usuario);

        expect(result).toEqual({ insertId: 1 });
        expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
        expect(connection.execute).toHaveBeenCalledWith('INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)', [usuario.nome, usuario.email, 'hashedpassword']);
    });

    it('deve retornar um token ao fazer login com sucesso', async () => {
        connection.execute.mockResolvedValue([[{ id: 1, nome: 'Usuario Teste', email: 'teste@usuario.com', senha: 'hashedpassword' }]]);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('validtoken');

        const result = await usuarioService.loginUsuario('teste@usuario.com', '123456');

        expect(result).toEqual({ token: 'validtoken' });
        expect(bcrypt.compare).toHaveBeenCalledWith('123456', 'hashedpassword');
        expect(jwt.sign).toHaveBeenCalledWith({ id: 1, email: 'teste@usuario.com' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    it('deve retornar erro ao fazer login com senha incorreta', async () => {
        connection.execute.mockResolvedValue([[{ id: 1, nome: 'Usuario Teste', email: 'teste@usuario.com', senha: 'hashedpassword' }]]);
        bcrypt.compare.mockResolvedValue(false);

        const result = await usuarioService.loginUsuario('teste@usuario.com', 'senhaerrada');

        expect(result).toEqual({ error: 'Senha incorreta' });
        expect(bcrypt.compare).toHaveBeenCalledWith('senhaerrada', 'hashedpassword');
    });

    it('deve retornar erro ao fazer login com usuário não encontrado', async () => {
        connection.execute.mockResolvedValue([[]]);

        const result = await usuarioService.loginUsuario('naoexiste@usuario.com', '123456');

        expect(result).toEqual({ error: 'Usuário não encontrado' });
        expect(connection.execute).toHaveBeenCalledWith('SELECT * FROM Usuario WHERE email = ?', ['naoexiste@usuario.com']);
    });
});
