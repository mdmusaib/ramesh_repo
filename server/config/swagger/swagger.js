const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.3.0',
        info: {
            title: "My App",
            version: "1.0.0"
        },
    },
    apis: ['./routes.js'],
};

const swaggerSpec = swaggerJsDoc(options)