const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const {app_host: host, app_port: port, node_env} = require('./env');

const swaggerOpt = {
    definition: {
        openapi: "3.0.3", // present supported openapi version
        info: {
            title: "Application API", // short title.
            description: "Application API Documentation", //  desc.
            version: "1.0.0", // version number
        },
        servers: [
            {
                url: `http://${host}:${port}/`,
                description: `Server: ${node_env}`
            }
        ]
    },
    apis: [
        'src/modules/users/api.yaml',
    ]
}
const swaggerSpec = swaggerJSDoc(swaggerOpt);

module.exports = {
    swaggerUiServe: swaggerUi.serve, 
    swaggerUiSetup: swaggerUi.setup(swaggerSpec)
}