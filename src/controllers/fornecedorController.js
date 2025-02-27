const fornecedorService = require('../services/fornecedorService');

const getAll = async (req, res) => {
  try {
    const fornecedores = await fornecedorService.getAll();
    res.status(200).json(fornecedores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar fornecedores' });
  }
};

const getPaginated = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  try {
    const result = await fornecedorService.getPaginated(page, limit);
    res.status(200).json(result);
  } catch (error) {
    console.error('Erro no getPaginated do fornecedorController:', error);
    res.status(500).json({ error: 'Erro ao buscar fornecedores paginados' });
  }
};

const getByNome = async (req, res) => {
  const { nome } = req.params;
  try {
    const fornecedores = await fornecedorService.getByNome(nome);
    res.status(200).json(fornecedores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar fornecedores por nome' });
  }
};

const createFornecedor = async (req, res) => {
  try {
    const fornecedor = await fornecedorService.createFornecedor(req.body);
    res.status(201).json(fornecedor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar fornecedor' });
  }
};

const deleteFornecedor = async (req, res) => {
  const { id } = req.params;
  try {
    await fornecedorService.deleteFornecedor(id);
    return res.status(204).json({ message: 'Fornecedor deletado com sucesso' });
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Erro ao deletar fornecedor' });
  }
};

const updateFornecedor = async (req, res) => {
  try {
    const { id } = req.params;
    await fornecedorService.updateFornecedor(id, req.body);
    res.status(200).json({ message: 'Fornecedor atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar fornecedor' });
  }
};

module.exports = {
  getAll,
  getPaginated,
  getByNome,
  createFornecedor,
  deleteFornecedor,
  updateFornecedor
};
