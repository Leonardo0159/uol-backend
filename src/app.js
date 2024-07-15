const express = require('express');
const router = require('./router');
const { swaggerUi, specs } = require('./docs/swagger');

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, access-control-allow-methods, access-control-allow-origin, authorization");

    next();
});

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(router);

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css', customCss: '.opblock-summary-path__deprecated { display: inline; }' }));

module.exports = app;
