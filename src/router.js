const express = require('express');

const testeController = require('./controllers/testeController');
const testeMiddleware = require('./middlewares/testeMiddleware');

const router = express.Router();

//Rotas Kits
router.get('/teste', testeController.getAll);
router.post('/teste', testeMiddleware.validateMandatory, testeController.createTeste);
router.delete('/teste/:id', testeController.deleteTeste);
router.put('/teste/:id', testeMiddleware.validateMandatory, testeController.updateTeste);

module.exports = router;