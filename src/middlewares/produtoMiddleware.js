const validateMandatory = (req, res, next) => {
    const { nome, preco, quantidade, fornecedorId } = req.body;

    if (nome === undefined) {
        return res.status(400).json({ message: 'O campo "nome" é obrigatório' });
    }

    if (nome === '') {
        return res.status(400).json({ message: '"nome" não pode ser vazio' });
    }

    if (preco === undefined) {
        return res.status(400).json({ message: 'O campo "preco" é obrigatório' });
    }

    if (quantidade === undefined) {
        return res.status(400).json({ message: 'O campo "quantidade" é obrigatório' });
    }

    if (fornecedorId === undefined) {
        return res.status(400).json({ message: 'O campo "fornecedorId" é obrigatório' });
    }

    next();
};

module.exports = {
    validateMandatory
};
