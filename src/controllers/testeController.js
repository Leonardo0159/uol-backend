const testeModel = require('../models/testeModel');

const getAll = async (req, res) => {

    const mensagem = await testeModel.getAll();

    return res.status(200).json(mensagem);
};

const createTeste = async (req, res) => {
    const createdTeste = await testeModel.createTeste(req.body);

    if (createdTeste.erro !== undefined) {
        return res.status(400).json({ erro: createdTeste.erro })
    } else {
        return res.status(201).json(createdTeste);
    }
}

const deleteTeste = async (req, res) => {
    const { id } = req.params;

    const deletedKit = await testeModel.deleteTeste(id);
    //return res.status(204).json(deletedKit);
    return res.status(201).json(deletedKit);
}

const updateTeste = async (req, res) => {
    const { id } = req.params;

    const updatedKit = await testeModel.updateTeste(id, req.body)

    if (updatedKit.erro !== undefined) {
        return res.status(400).json({ erro: updatedKit.erro })
    } else {
        return res.status(201).json(updatedKit);
    }
}

module.exports = {
    getAll,
    createTeste,
    deleteTeste,
    updateTeste
};