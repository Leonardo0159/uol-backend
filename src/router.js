const express = require('express');
const fornecedorController = require('./controllers/fornecedorController');
const fornecedorMiddleware = require('./middlewares/fornecedorMiddleware');

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

module.exports = router;
