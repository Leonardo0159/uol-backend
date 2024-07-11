class Produto {
    constructor(id, nome, descricao, preco, quantidade, categoria, fornecedorId, dataCriacao) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.categoria = categoria;
        this.fornecedorId = fornecedorId;
        this.dataCriacao = dataCriacao;
    }
}

module.exports = Produto;
