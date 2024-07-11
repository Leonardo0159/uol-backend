# UOL Backend

Este projeto é uma aplicação backend desenvolvida com Node.js e Express para gerenciar fornecedores e produtos, integrando com a API pública REST Countries para agregar informações de localização dos fornecedores.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/uol-backend.git
   cd uol-backend

## Instale as dependências:

- npm install

## Configure o banco de dados MySQL:

Crie um banco de dados MySQL e configure as variáveis de ambiente no arquivo .env com as informações de conexão ao banco de dados. Exemplo de .env:

- MYSQL_HOST=localhost
- MYSQL_USER=root
- MYSQL_PASSWORD=sua_senha
- MYSQL_DB=uolapi

## Crie as tabelas necessárias no banco de dados. Você pode usar o seguinte script SQL como exemplo:

CREATE TABLE fornecedor (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  codigo_pais VARCHAR(255) NOT NULL
);

CREATE TABLE produto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao VARCHAR(255),
  preco FLOAT NOT NULL,
  quantidade INT NOT NULL,
  categoria VARCHAR(255),
  fornecedor_id INT,
  created_at VARCHAR(45),
  FOREIGN KEY (fornecedor_id) REFERENCES fornecedor(id)
);

## Execução:

- npm start

## Testes:

- npm test

## Endpoints:

Fornecedores
- GET /fornecedores: Lista todos os fornecedores.
- POST /fornecedores: Cria um novo fornecedor.
- DELETE /fornecedores/:id: Deleta um fornecedor.
- PUT /fornecedores/:id: Atualiza um fornecedor.

Produtos
- GET /produtos: Lista todos os produtos.
- GET /produtos/paginados?page=1: Lista produtos com paginação (10 produtos por página).
- GET /produtos/nome/:nome: Busca produtos pelo nome.
- POST /produtos: Cria um novo produto.
- DELETE /produtos/:id: Deleta um produto.
- PUT /produtos/:id: Atualiza um produto.

## Documentação da API:

A documentação da API está disponível no Swagger. Após iniciar a aplicação, acesse http://localhost:3333/api-docs para visualizar a documentação interativa.

