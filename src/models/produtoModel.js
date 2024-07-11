class Produto {
    constructor(id, nome, descricao, preco, quantidade, categoria, fornecedorId, created_at) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.categoria = categoria;
        this.fornecedorId = fornecedorId;
        this.dataCriacao = created_at;
    }
}

module.exports = Produto;
