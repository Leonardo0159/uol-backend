const connection = require('./connection');

const getAll = async () => {
    /*
    const teste = await connection.execute('SELECT * FROM teste WHERE deleted_at IS NULL');
    return teste;
    */
    return { mensagem: "Deu certo Get" };
};

const createTeste = async (teste) => {
    const { nome } = teste;
    /*
    const dateUTC = new Date(Date.now()).toUTCString();
    const query = 'INSERT INTO teste(nome, produto_id, created_at, empresa_id) VALUES (?, ?, ?, ?)';
    const [createdTeste] = await connection.execute(query, [nome, produtoId, dateUTC, usuarioLogado.empresa_id]);
    */

    //return { insertId: createdTeste.insertId };

    return { mensagem: "Deu certo Create" };

}

const deleteTeste = async (id) => {
    /*
    const dateUTC = new Date(Date.now()).toUTCString();
    const [removedTeste] = await connection.execute('UPDATE teste SET deleted_at = ? WHERE id = ?', [dateUTC, id]);
    return removedTeste;
    */
    return { mensagem: "Deu certo Delete" };
}

const updateTeste = async (id, teste) => {
    /*
    const { nome } = teste;
    const dateUTC = new Date(Date.now()).toUTCString();
    const query = 'UPDATE teste SET nome = ?, updated_at = ?  WHERE id = ?';
    const [updatedTeste] = await connection.execute(query, [nome, dateUTC, id]);
    return updatedTeste;
    */

    return { mensagem: "Deu certo Update" };
}

module.exports = {
    getAll,
    createTeste,
    deleteTeste,
    updateTeste
};