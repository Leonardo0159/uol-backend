const fornecedorService = require('../services/fornecedorService');
const Fornecedor = require('../models/fornecedorModel');

const getAll = async (req, res) => {
    const fornecedores = await fornecedorService.getAll();
    return res.status(200).json(fornecedores);
};

const createFornecedor = async (req, res) => {
    const { nome, codigoPais } = req.body;
    const newFornecedor = new Fornecedor(null, nome, codigoPais);
    const createdFornecedor = await fornecedorService.createFornecedor(newFornecedor);
    return res.status(201).json(createdFornecedor);
};

const deleteFornecedor = async (req, res) => {
    const { id } = req.params;
    const result = await fornecedorService.deleteFornecedor(id);
    return res.status(204).json(result);
};

const updateFornecedor = async (req, res) => {
    const { id } = req.params;
    const { nome, codigoPais } = req.body;
    const updatedFornecedor = new Fornecedor(id, nome, codigoPais);
    const result = await fornecedorService.updateFornecedor(id, updatedFornecedor);
    return res.status(200).json(result);
};

module.exports = {
    getAll,
    createFornecedor,
    deleteFornecedor,
    updateFornecedor
};
