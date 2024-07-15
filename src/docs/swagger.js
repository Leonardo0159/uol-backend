const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerUiDist = require('swagger-ui-dist');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Exemplo",
            version: "1.0.0",
            description: "API de gerenciamento de fornecedores e produtos"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["./src/router.js"], // Caminho para os arquivos de rota
};

const specs = swaggerJsDoc(options);
const swaggerPath = swaggerUiDist.getAbsoluteFSPath();

module.exports = {
    swaggerUi,
    specs,
    swaggerPath,
};
