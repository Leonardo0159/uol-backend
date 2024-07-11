const produtoService = require('../services/produtoService');
const Produto = require('../models/produtoModel');

const getAll = async (req, res) => {
    const produtos = await produtoService.getAll();
    return res.status(200).json(produtos);
};

const getPaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const produtos = await produtoService.getPaginated(page, limit);
    return res.status(200).json(produtos);
};

const getByNome = async (req, res) => {
    const { nome } = req.params;
    const produtos = await produtoService.getByNome(nome);
    return res.status(200).json(produtos);
};

const createProduto = async (req, res) => {
    const { nome, descricao, preco, quantidade, categoria, fornecedorId } = req.body;
    const newProduto = new Produto(null, nome, descricao, preco, quantidade, categoria, fornecedorId, null);
    const result = await produtoService.createProduto(newProduto);

    if (result.error) {
        return res.status(400).json({ error: result.error });
    }

    return res.status(201).json(result);
};

const deleteProduto = async (req, res) => {
    const { id } = req.params;
    const result = await produtoService.deleteProduto(id);
    return res.status(204).json(result);
};

const updateProduto = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, quantidade, categoria, fornecedorId } = req.body;
    const updatedProduto = new Produto(id, nome, descricao, preco, quantidade, categoria, fornecedorId, null);
    const result = await produtoService.updateProduto(id, updatedProduto);

    if (result.error) {
        return res.status(400).json({ error: result.error });
    }

    return res.status(200).json(result);
};

module.exports = {
    getAll,
    getPaginated,
    getByNome,
    createProduto,
    deleteProduto,
    updateProduto
};
