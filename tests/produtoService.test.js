const produtoService = require('../src/services/produtoService');
const connection = require('../src/config/connection');
const Produto = require('../src/models/produtoModel');

jest.mock('../src/config/connection');

describe('Produto Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve retornar todos os produtos', async () => {
        // Mock da resposta do banco de dados
        connection.execute.mockResolvedValue([[{ id: 1, nome: 'Produto Teste', descricao: 'Descrição', preco: 10.0, quantidade: 5, categoria: 'Categoria Teste', fornecedor_id: 1, created_at: '2024-07-11T12:00:00Z' }]]);

        const produtos = await produtoService.getAll();

        expect(produtos).toEqual([
            new Produto(1, 'Produto Teste', 'Descrição', 10.0, 5, 'Categoria Teste', 1, '2024-07-11T12:00:00Z')
        ]);

        expect(connection.execute).toHaveBeenCalledTimes(1);
    });

    it('deve retornar produtos com paginação', async () => {
        // Mock da resposta do banco de dados
        connection.execute
            .mockResolvedValueOnce([[{ total: 20 }]]) // Total de produtos
            .mockResolvedValueOnce([[{ id: 1, nome: 'Produto Teste', descricao: 'Descrição', preco: 10.0, quantidade: 5, categoria: 'Categoria Teste', fornecedor_id: 1, created_at: '2024-07-11T12:00:00Z' }]]); // Produtos

        const result = await produtoService.getPaginated(1, 10);

        expect(result).toEqual({
            totalProducts: 20,
            produtos: [
                new Produto(1, 'Produto Teste', 'Descrição', 10.0, 5, 'Categoria Teste', 1, '2024-07-11T12:00:00Z')
            ]
        });

        expect(connection.execute).toHaveBeenCalledTimes(2);
    });

    it('deve retornar produtos pelo nome', async () => {
        // Mock da resposta do banco de dados
        connection.execute.mockResolvedValue([[{ id: 1, nome: 'Produto Teste', descricao: 'Descrição', preco: 10.0, quantidade: 5, categoria: 'Categoria Teste', fornecedor_id: 1, created_at: '2024-07-11T12:00:00Z' }]]);

        const produtos = await produtoService.getByNome('Produto Teste');

        expect(produtos).toEqual([
            new Produto(1, 'Produto Teste', 'Descrição', 10.0, 5, 'Categoria Teste', 1, '2024-07-11T12:00:00Z')
        ]);

        expect(connection.execute).toHaveBeenCalledWith('SELECT * FROM Produto WHERE nome LIKE ?', ['%Produto Teste%']);
    });

    it('deve criar um novo produto', async () => {
        // Mock da resposta do banco de dados para verificar fornecedor
        connection.execute.mockResolvedValueOnce([[{ id: 1 }]]);
        // Mock da resposta do banco de dados para criação do produto
        connection.execute.mockResolvedValueOnce([{ insertId: 1 }]);

        const produto = { nome: 'Novo Produto', descricao: 'Descrição do novo produto', preco: 20.0, quantidade: 10, categoria: 'Nova Categoria', fornecedorId: 1 };
        const result = await produtoService.createProduto(produto);

        expect(result).toEqual({ insertId: 1 });
        expect(connection.execute).toHaveBeenCalledWith('SELECT id FROM Fornecedor WHERE id = ?', [1]);
        expect(connection.execute).toHaveBeenCalledWith('INSERT INTO Produto (nome, descricao, preco, quantidade, categoria, fornecedor_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [produto.nome, produto.descricao, produto.preco, produto.quantidade, produto.categoria, produto.fornecedorId, expect.any(String)]);
    });

    it('deve retornar erro ao tentar criar um produto com fornecedor inexistente', async () => {
        // Mock da resposta do banco de dados para verificar fornecedor
        connection.execute.mockResolvedValueOnce([[]]);

        const produto = { nome: 'Novo Produto', descricao: 'Descrição do novo produto', preco: 20.0, quantidade: 10, categoria: 'Nova Categoria', fornecedorId: 999 };
        const result = await produtoService.createProduto(produto);

        expect(result).toEqual({ error: 'Fornecedor não encontrado' });
        expect(connection.execute).toHaveBeenCalledWith('SELECT id FROM Fornecedor WHERE id = ?', [999]);
    });

    it('deve deletar um produto', async () => {
        // Mock da resposta do banco de dados
        connection.execute.mockResolvedValue([{ affectedRows: 1 }]);

        const result = await produtoService.deleteProduto(1);

        expect(result).toEqual({ affectedRows: 1 });
        expect(connection.execute).toHaveBeenCalledWith('DELETE FROM Produto WHERE id = ?', [1]);
    });

    it('deve atualizar um produto', async () => {
        // Mock da resposta do banco de dados para verificar fornecedor
        connection.execute.mockResolvedValueOnce([[{ id: 1 }]]);
        // Mock da resposta do banco de dados para atualização do produto
        connection.execute.mockResolvedValueOnce([{ affectedRows: 1 }]);

        const produto = { nome: 'Produto Atualizado', descricao: 'Descrição atualizada', preco: 15.0, quantidade: 8, categoria: 'Categoria Atualizada', fornecedorId: 1 };
        const result = await produtoService.updateProduto(1, produto);

        expect(result).toEqual({ affectedRows: 1 });
        expect(connection.execute).toHaveBeenCalledWith('SELECT id FROM Fornecedor WHERE id = ?', [1]);
        expect(connection.execute).toHaveBeenCalledWith('UPDATE Produto SET nome = ?, descricao = ?, preco = ?, quantidade = ?, categoria = ?, fornecedor_id = ? WHERE id = ?', [produto.nome, produto.descricao, produto.preco, produto.quantidade, produto.categoria, produto.fornecedorId, 1]);
    });

    it('deve retornar erro ao tentar atualizar um produto com fornecedor inexistente', async () => {
        // Mock da resposta do banco de dados para verificar fornecedor
        connection.execute.mockResolvedValueOnce([[]]);

        const produto = { nome: 'Produto Atualizado', descricao: 'Descrição atualizada', preco: 15.0, quantidade: 8, categoria: 'Categoria Atualizada', fornecedorId: 999 };
        const result = await produtoService.updateProduto(1, produto);

        expect(result).toEqual({ error: 'Fornecedor não encontrado' });
        expect(connection.execute).toHaveBeenCalledWith('SELECT id FROM Fornecedor WHERE id = ?', [999]);
    });
});
