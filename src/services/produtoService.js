const connection = require('../config/connection');
const Produto = require('../models/produtoModel');

const getAll = async () => {
    const [rows] = await connection.execute('SELECT * FROM Produto');
    return rows.map(row => new Produto(row.id, row.nome, row.descricao, row.preco, row.quantidade, row.categoria, row.fornecedor_id, row.created_at));
};

const getPaginated = async (page, limit) => {
    const offset = (page - 1) * limit;
    const [totalRows] = await connection.execute('SELECT COUNT(*) AS total FROM Produto');
    const totalProducts = totalRows[0].total;

    const [rows] = await connection.execute('SELECT * FROM Produto LIMIT ? OFFSET ?', [limit, offset]);
    const produtos = rows.map(row => new Produto(row.id, row.nome, row.descricao, row.preco, row.quantidade, row.categoria, row.fornecedor_id, row.created_at));

    return {
        totalProducts,
        produtos
    };
};

const getByNome = async (nome) => {
    const [rows] = await connection.execute('SELECT * FROM Produto WHERE nome LIKE ?', [`%${nome}%`]);
    return rows.map(row => new Produto(row.id, row.nome, row.descricao, row.preco, row.quantidade, row.categoria, row.fornecedor_id, row.created_at));
};

const createProduto = async (produto) => {
    const { nome, descricao, preco, quantidade, categoria, fornecedorId } = produto;

    // Verifica se o fornecedor existe
    const [fornecedorRows] = await connection.execute('SELECT id FROM Fornecedor WHERE id = ?', [fornecedorId]);
    if (fornecedorRows.length === 0) {
        return { error: 'Fornecedor não encontrado' };
    }

    const dateUTC = new Date(Date.now()).toUTCString(); // Data e hora atual em UTC
    const query = 'INSERT INTO Produto (nome, descricao, preco, quantidade, categoria, fornecedor_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await connection.execute(query, [nome, descricao, preco, quantidade, categoria, fornecedorId, dateUTC]);
    return { insertId: result.insertId };
};

const deleteProduto = async (id) => {
    const query = 'DELETE FROM Produto WHERE id = ?';
    const [result] = await connection.execute(query, [id]);
    return result;
};

const updateProduto = async (id, produto) => {
    const { nome, descricao, preco, quantidade, categoria, fornecedorId } = produto;

    // Verifica se o fornecedor existe
    const [fornecedorRows] = await connection.execute('SELECT id FROM Fornecedor WHERE id = ?', [fornecedorId]);
    if (fornecedorRows.length === 0) {
        return { error: 'Fornecedor não encontrado' };
    }

    const query = 'UPDATE Produto SET nome = ?, descricao = ?, preco = ?, quantidade = ?, categoria = ?, fornecedor_id = ? WHERE id = ?';
    const [result] = await connection.execute(query, [nome, descricao, preco, quantidade, categoria, fornecedorId, id]);
    return result;
};

module.exports = {
    getAll,
    getPaginated,
    getByNome,
    createProduto,
    deleteProduto,
    updateProduto
};
