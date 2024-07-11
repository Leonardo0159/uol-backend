const validateMandatory = (req, res, next) => {
    const { nome, codigoPais } = req.body;

    if (nome === undefined) {
        return res.status(400).json({ message: 'O campo "nome" é obrigatório' });
    }

    if (nome === '') {
        return res.status(400).json({ message: '"nome" não pode ser vazio' });
    }

    if (codigoPais === undefined) {
        return res.status(400).json({ message: 'O campo "codigoPais" é obrigatório' });
    }

    if (codigoPais === '') {
        return res.status(400).json({ message: '"codigoPais" não pode ser vazio' });
    }

    next();
};

module.exports = {
    validateMandatory
};
