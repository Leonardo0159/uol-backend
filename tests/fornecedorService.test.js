const axios = require('axios');
const fornecedorService = require('../src/services/fornecedorService');
const connection = require('../src/config/connection');

jest.mock('axios');
jest.mock('../src/config/connection');

describe('Fornecedor Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve retornar todos os fornecedores com informações de país', async () => {
        // Mock da resposta do banco de dados
        connection.execute.mockResolvedValue([[{ id: 1, nome: 'Fornecedor Teste', codigo_pais: 'BR' }]]);

        // Mock da resposta da API REST Countries
        axios.get.mockResolvedValue({ data: [{ name: { common: 'Brazil' }, region: 'Americas', subregion: 'South America' }] });

        const fornecedores = await fornecedorService.getAll();

        expect(fornecedores).toEqual([
            {
                id: 1,
                nome: 'Fornecedor Teste',
                codigoPais: 'BR',
                pais: 'Brazil',
                regiao: 'Americas',
                subregiao: 'South America'
            }
        ]);

        expect(connection.execute).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/BR');
    });

    it('deve lidar com erro na API REST Countries', async () => {
        // Mock da resposta do banco de dados
        connection.execute.mockResolvedValue([[{ id: 1, nome: 'Fornecedor Teste', codigo_pais: 'BR' }]]);

        // Mock do erro na API REST Countries
        axios.get.mockRejectedValue(new Error('API Error'));

        const fornecedores = await fornecedorService.getAll();

        expect(fornecedores).toEqual([
            {
                id: 1,
                nome: 'Fornecedor Teste',
                codigoPais: 'BR'
            }
        ]);

        expect(connection.execute).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/BR');
    });

    it('deve criar um novo fornecedor', async () => {
        // Mock da resposta do banco de dados
        connection.execute.mockResolvedValue([{ insertId: 1 }]);

        const fornecedor = { nome: 'Novo Fornecedor', codigoPais: 'US' };
        const result = await fornecedorService.createFornecedor(fornecedor);

        expect(result).toEqual({ insertId: 1 });
        expect(connection.execute).toHaveBeenCalledWith('INSERT INTO Fornecedor (nome, codigo_pais) VALUES (?, ?)', [fornecedor.nome, fornecedor.codigoPais]);
    });

    it('deve deletar um fornecedor', async () => {
        // Mock da resposta do banco de dados
        connection.execute.mockResolvedValue([{ affectedRows: 1 }]);

        const result = await fornecedorService.deleteFornecedor(1);

        expect(result).toEqual({ affectedRows: 1 });
        expect(connection.execute).toHaveBeenCalledWith('DELETE FROM Fornecedor WHERE id = ?', [1]);
    });

    it('deve atualizar um fornecedor', async () => {
        // Mock da resposta do banco de dados
        connection.execute.mockResolvedValue([{ affectedRows: 1 }]);

        const fornecedor = { nome: 'Fornecedor Atualizado', codigoPais: 'GB' };
        const result = await fornecedorService.updateFornecedor(1, fornecedor);

        expect(result).toEqual({ affectedRows: 1 });
        expect(connection.execute).toHaveBeenCalledWith('UPDATE Fornecedor SET nome = ?, codigo_pais = ? WHERE id = ?', [fornecedor.nome, fornecedor.codigoPais, 1]);
    });
});
