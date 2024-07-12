const express = require('express');
const fornecedorController = require('./controllers/fornecedorController');
const fornecedorMiddleware = require('./middlewares/fornecedorMiddleware');
const produtoController = require('./controllers/produtoController');
const produtoMiddleware = require('./middlewares/produtoMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Fornecedores
 *   description: API de gerenciamento de fornecedores
 */

/**
 * @swagger
 * /fornecedores:
 *   get:
 *     summary: Lista todos os fornecedores
 *     tags: [Fornecedores]
 *     responses:
 *       200:
 *         description: Lista de fornecedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fornecedor'
 */
router.get('/fornecedores', fornecedorController.getAll);

/**
 * @swagger
 * /fornecedores/paginados:
 *   get:
 *     summary: Lista fornecedores com paginação
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página
 *     responses:
 *       200:
 *         description: Lista de fornecedores com paginação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalFornecedores:
 *                   type: integer
 *                   description: Número total de fornecedores
 *                 fornecedores:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Fornecedor'
 */
router.get('/fornecedores/paginados', fornecedorController.getPaginated);

/**
 * @swagger
 * /fornecedores/nome/{nome}:
 *   get:
 *     summary: Busca fornecedores pelo nome
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: path
 *         name: nome
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome do fornecedor
 *     responses:
 *       200:
 *         description: Lista de fornecedores com o nome especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fornecedor'
 */
router.get('/fornecedores/nome/:nome', fornecedorController.getByNome);

/**
 * @swagger
 * /fornecedores:
 *   post:
 *     summary: Cria um novo fornecedor
 *     tags: [Fornecedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fornecedor'
 *     responses:
 *       201:
 *         description: Fornecedor criado com sucesso
 */
router.post('/fornecedores', fornecedorMiddleware.validateMandatory, fornecedorController.createFornecedor);

/**
 * @swagger
 * /fornecedores/{id}:
 *   delete:
 *     summary: Deleta um fornecedor
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do fornecedor
 *     responses:
 *       204:
 *         description: Fornecedor deletado com sucesso
 */
router.delete('/fornecedores/:id', fornecedorController.deleteFornecedor);

/**
 * @swagger
 * /fornecedores/{id}:
 *   put:
 *     summary: Atualiza um fornecedor
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do fornecedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fornecedor'
 *     responses:
 *       200:
 *         description: Fornecedor atualizado com sucesso
 */
router.put('/fornecedores/:id', fornecedorMiddleware.validateMandatory, fornecedorController.updateFornecedor);

/**
 * @swagger
 * components:
 *   schemas:
 *     Fornecedor:
 *       type: object
 *       required:
 *         - nome
 *         - codigoPais
 *       properties:
 *         id:
 *           type: string
 *           format: int
 *           description: ID do fornecedor
 *         nome:
 *           type: string
 *           description: Nome do fornecedor
 *         codigoPais:
 *           type: string
 *           description: Código do país do fornecedor
 *       example:
 *         id: 1
 *         nome: Fornecedor Exemplo
 *         codigoPais: BR
 */

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: API de gerenciamento de produtos
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */
router.get('/produtos', produtoController.getAll);

/**
 * @swagger
 * /produtos/paginados:
 *   get:
 *     summary: Lista produtos com paginação
 *     tags: [Produtos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página
 *     responses:
 *       200:
 *         description: Lista de produtos com paginação
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */
router.get('/produtos/paginados', produtoController.getPaginated);

/**
 * @swagger
 * /produtos/nome/{nome}:
 *   get:
 *     summary: Busca produtos pelo nome
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: nome
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome do produto
 *     responses:
 *       200:
 *         description: Lista de produtos com o nome especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */
router.get('/produtos/nome/:nome', produtoController.getByNome);

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */
router.post('/produtos', produtoMiddleware.validateMandatory, produtoController.createProduto);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Deleta um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       204:
 *         description: Produto deletado com sucesso
 */
router.delete('/produtos/:id', produtoController.deleteProduto);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 */
router.put('/produtos/:id', produtoMiddleware.validateMandatory, produtoController.updateProduto);

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *         - quantidade
 *         - fornecedorId
 *       properties:
 *         id:
 *           type: string
 *           format: int
 *           description: ID do produto
 *         nome:
 *           type: string
 *           description: Nome do produto
 *         descricao:
 *           type: string
 *           description: Descrição do produto
 *         preco:
 *           type: number
 *           format: float
 *           description: Preço do produto
 *         quantidade:
 *           type: integer
 *           description: Quantidade do produto
 *         categoria:
 *           type: string
 *           description: Categoria do produto
 *         fornecedorId:
 *           type: string
 *           format: int
 *           description: ID do fornecedor
 *         dataCriacao:
 *           type: string
 *           format: date-time
 *           description: Data de criação do produto
 *       example:
 *         id: 1
 *         nome: Produto Exemplo
 *         descricao: Descrição do produto exemplo
 *         preco: 100.50
 *         quantidade: 10
 *         categoria: Categoria Exemplo
 *         fornecedorId: 1
 *         dataCriacao: 2024-07-11T12:00:00Z
 */

module.exports = router;
