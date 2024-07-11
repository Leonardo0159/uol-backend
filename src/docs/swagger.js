const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Controle de Estoque',
            version: '1.0.0',
            description: 'Documentação da API de Controle de Estoque',
        },
        servers: [
            {
                url: 'http://localhost:3333',
                description: 'Servidor de Desenvolvimento',
            },
        ],
    },
    apis: ['./src/router.js', './src/controllers/*.js', './src/models/*.js'], // Caminho para os arquivos de definição da API
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};
