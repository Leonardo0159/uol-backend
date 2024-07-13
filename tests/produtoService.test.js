const produtoService = require('../src/services/produtoService');
const connection = require('../src/config/connection');
const Produto = require('../src/models/produtoModel');

jest.mock('../src/config/connection');

describe('Produto Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve retornar todos os produtos', async () => {
        connection.execute.mockResolvedValue([
            [{
                id: 1,
                nome: 'Produto Teste',
                descricao: 'Descrição',
                preco: 10.0,
                quantidade: 5,
                categoria: 'Categoria Teste',
                fornecedor_id: 1,
                fornecedor_nome: 'Fornecedor Teste',
                created_at: '2024-07-11T12:00:00Z'
            }]
        ]);

        const produtos = await produtoService.getAll();

        expect(produtos).toEqual([
            {
                id: 1,
                nome: 'Produto Teste',
                descricao: 'Descrição',
                preco: 10.0,
                quantidade: 5,
                categoria: 'Categoria Teste',
                fornecedor: { id: 1, nome: 'Fornecedor Teste' },
                created_at: '2024-07-11T12:00:00Z'
            }
        ]);

        expect(connection.execute).toHaveBeenCalledTimes(1);
    });

    it('deve retornar produtos com paginação', async () => {
        connection.execute
            .mockResolvedValueOnce([[{ total: 20 }]])
            .mockResolvedValueOnce([[
                {
                    id: 1,
                    nome: 'Produto Teste',
                    descricao: 'Descrição',
                    preco: 10.0,
                    quantidade: 5,
                    categoria: 'Categoria Teste',
                    fornecedor_id: 1,
                    fornecedor_nome: 'Fornecedor Teste',
                    created_at: '2024-07-11T12:00:00Z'
                }
            ]]);

        const result = await produtoService.getPaginated(1, 10);

        expect(result).toEqual({
            totalProducts: 20,
            produtos: [
                {
                    id: 1,
                    nome: 'Produto Teste',
                    descricao: 'Descrição',
                    preco: 10.0,
                    quantidade: 5,
                    categoria: 'Categoria Teste',
                    fornecedor: { id: 1, nome: 'Fornecedor Teste' },
                    created_at: '2024-07-11T12:00:00Z'
                }
            ]
        });

        expect(connection.execute).toHaveBeenCalledTimes(2);
    });

    function normalizeQuery(query) {
        return query.replace(/\s+/g, ' ').trim();
    }

    it('deve retornar produtos pelo nome', async () => {
        connection.execute.mockResolvedValue([[{
            id: 1,
            nome: 'Produto Teste',
            descricao: 'Descrição',
            preco: 10.0,
            quantidade: 5,
            categoria: 'Categoria Teste',
            fornecedor_id: 1,
            fornecedor_nome: 'Fornecedor Teste',
            created_at: '2024-07-11T12:00:00Z'
        }]]);
    
        const produtos = await produtoService.getByNome('Produto Teste');
    
        expect(produtos).toEqual([
            {
                id: 1,
                nome: 'Produto Teste',
                descricao: 'Descrição',
                preco: 10.0,
                quantidade: 5,
                categoria: 'Categoria Teste',
                fornecedor: {
                    id: 1,
                    nome: 'Fornecedor Teste'
                },
                created_at: '2024-07-11T12:00:00Z'
            }
        ]);
    
        const expectedQuery = `
            SELECT p.*, f.id as fornecedor_id, f.nome as fornecedor_nome
            FROM Produto p
            JOIN Fornecedor f ON p.fornecedor_id = f.id
            WHERE p.nome LIKE '%Produto Teste%' OR p.categoria LIKE '%Produto Teste%' OR f.nome LIKE '%Produto Teste%'
        `.replace(/\s+/g, ' ').trim();
    
        expect(connection.execute).toHaveBeenCalledWith(expectedQuery);
    });

    it('deve criar um novo produto', async () => {
        connection.execute.mockResolvedValueOnce([[{ id: 1 }]]);
        connection.execute.mockResolvedValueOnce([{ insertId: 1 }]);

        const produto = {
            nome: 'Novo Produto',
            descricao: 'Descrição do novo produto',
            preco: 20.0,
            quantidade: 10,
            categoria: 'Nova Categoria',
            fornecedorId: 1
        };
        const result = await produtoService.createProduto(produto);

        expect(result).toEqual({ insertId: 1 });
        expect(connection.execute).toHaveBeenCalledWith('SELECT id FROM Fornecedor WHERE id = ?', [1]);
        expect(connection.execute).toHaveBeenCalledWith(
            'INSERT INTO Produto (nome, descricao, preco, quantidade, categoria, fornecedor_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [produto.nome, produto.descricao, produto.preco, produto.quantidade, produto.categoria, produto.fornecedorId, expect.any(String)]
        );
    });

    it('deve retornar erro ao tentar criar um produto com fornecedor inexistente', async () => {
        connection.execute.mockResolvedValueOnce([[]]);

        const produto = {
            nome: 'Novo Produto',
            descricao: 'Descrição do novo produto',
            preco: 20.0,
            quantidade: 10,
            categoria: 'Nova Categoria',
            fornecedorId: 999
        };
        const result = await produtoService.createProduto(produto);

        expect(result).toEqual({ error: 'Fornecedor não encontrado' });
        expect(connection.execute).toHaveBeenCalledWith('SELECT id FROM Fornecedor WHERE id = ?', [999]);
    });

    it('deve deletar um produto', async () => {
        connection.execute.mockResolvedValue([{ affectedRows: 1 }]);

        const result = await produtoService.deleteProduto(1);

        expect(result).toEqual({ affectedRows: 1 });
        expect(connection.execute).toHaveBeenCalledWith('DELETE FROM Produto WHERE id = ?', [1]);
    });

    it('deve atualizar um produto', async () => {
        connection.execute.mockResolvedValueOnce([[{ id: 1 }]]);
        connection.execute.mockResolvedValueOnce([{ affectedRows: 1 }]);

        const produto = {
            nome: 'Produto Atualizado',
            descricao: 'Descrição atualizada',
            preco: 15.0,
            quantidade: 8,
            categoria: 'Categoria Atualizada',
            fornecedorId: 1
        };
        const result = await produtoService.updateProduto(1, produto);

        expect(result).toEqual({ affectedRows: 1 });
        expect(connection.execute).toHaveBeenCalledWith('SELECT id FROM Fornecedor WHERE id = ?', [1]);
        expect(connection.execute).toHaveBeenCalledWith(
            'UPDATE Produto SET nome = ?, descricao = ?, preco = ?, quantidade = ?, categoria = ?, fornecedor_id = ? WHERE id = ?',
            [produto.nome, produto.descricao, produto.preco, produto.quantidade, produto.categoria, produto.fornecedorId, 1]
        );
    });

    it('deve retornar erro ao tentar atualizar um produto com fornecedor inexistente', async () => {
        connection.execute.mockResolvedValueOnce([[]]);

        const produto = {
            nome: 'Produto Atualizado',
            descricao: 'Descrição atualizada',
            preco: 15.0,
            quantidade: 8,
            categoria: 'Categoria Atualizada',
            fornecedorId: 999
        };
        const result = await produtoService.updateProduto(1, produto);

        expect(result).toEqual({ error: 'Fornecedor não encontrado' });
        expect(connection.execute).toHaveBeenCalledWith('SELECT id FROM Fornecedor WHERE id = ?', [999]);
    });
});
