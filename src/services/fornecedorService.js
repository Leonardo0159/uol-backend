const connection = require('../config/connection');
const Fornecedor = require('../models/fornecedorModel');
const axios = require('axios');

const getAll = async () => {
    const [rows] = await connection.execute('SELECT * FROM Fornecedor');
    const fornecedores = rows.map(row => new Fornecedor(row.id, row.nome, row.codigo_pais));

    const fornecedoresComInfoPais = await Promise.all(fornecedores.map(async (fornecedor) => {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/alpha/${fornecedor.codigoPais}`);
            const countryInfo = response.data[0];
            return {
                ...fornecedor,
                pais: countryInfo.name.common,
                regiao: countryInfo.region,
                subregiao: countryInfo.subregion
            };
        } catch (error) {
            console.error(`Erro ao buscar informações do país para o código: ${fornecedor.codigoPais}`, error);
            return fornecedor;
        }
    }));

    return fornecedoresComInfoPais;
};

const createFornecedor = async (fornecedor) => {
    const { nome, codigoPais } = fornecedor;
    const query = 'INSERT INTO Fornecedor (nome, codigo_pais) VALUES (?, ?)';
    const [result] = await connection.execute(query, [nome, codigoPais]);
    return { insertId: result.insertId };
};

const deleteFornecedor = async (id) => {
    const query = 'DELETE FROM Fornecedor WHERE id = ?';
    const [result] = await connection.execute(query, [id]);
    return result;
};

const updateFornecedor = async (id, fornecedor) => {
    const { nome, codigoPais } = fornecedor;
    const query = 'UPDATE Fornecedor SET nome = ?, codigo_pais = ? WHERE id = ?';
    const [result] = await connection.execute(query, [nome, codigoPais, id]);
    return result;
};

module.exports = {
    getAll,
    createFornecedor,
    deleteFornecedor,
    updateFornecedor
};
