const connection = require('../config/connection');
const Produto = require('../models/produtoModel');

const getAll = async () => {
    const query = `
        SELECT p.*, f.id as fornecedor_id, f.nome as fornecedor_nome
        FROM Produto p
        JOIN Fornecedor f ON p.fornecedor_id = f.id
    `;
    const [rows] = await connection.execute(query);
    return rows.map(row => ({
        id: row.id,
        nome: row.nome,
        descricao: row.descricao,
        preco: row.preco,
        quantidade: row.quantidade,
        categoria: row.categoria,
        fornecedor: {
            id: row.fornecedor_id,
            nome: row.fornecedor_nome
        },
        created_at: row.created_at
    }));
};


const getPaginated = async (page, limit) => {
    const offset = (page - 1) * limit;
    const [totalRows] = await connection.execute('SELECT COUNT(*) AS total FROM Produto');
    const totalProducts = totalRows[0].total;

    const query = `
        SELECT p.*, f.id as fornecedor_id, f.nome as fornecedor_nome
        FROM Produto p
        JOIN Fornecedor f ON p.fornecedor_id = f.id
        LIMIT ? OFFSET ?
    `;
    const [rows] = await connection.execute(query, [limit, offset]);
    const produtos = rows.map(row => ({
        id: row.id,
        nome: row.nome,
        descricao: row.descricao,
        preco: row.preco,
        quantidade: row.quantidade,
        categoria: row.categoria,
        fornecedor: {
            id: row.fornecedor_id,
            nome: row.fornecedor_nome
        },
        created_at: row.created_at
    }));

    return {
        totalProducts,
        produtos
    };
};

const getByNome = async (nome) => {
    const query = `
        SELECT p.*, f.id as fornecedor_id, f.nome as fornecedor_nome
        FROM Produto p
        JOIN Fornecedor f ON p.fornecedor_id = f.id
        WHERE p.nome LIKE ? OR p.categoria LIKE ? OR f.nome LIKE ?
    `;
    const [rows] = await connection.execute(query, [`%${nome}%`, `%${nome}%`, `%${nome}%`]);
    return rows.map(row => ({
        id: row.id,
        nome: row.nome,
        descricao: row.descricao,
        preco: row.preco,
        quantidade: row.quantidade,
        categoria: row.categoria,
        fornecedor: {
            id: row.fornecedor_id,
            nome: row.fornecedor_nome
        },
        created_at: row.created_at
    }));
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
