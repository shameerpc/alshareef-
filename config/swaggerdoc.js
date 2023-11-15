const swaggerUi = require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');

// swagger definition
var swaggerDefinition = {
    info: {
      title: 'Al shareef Holding',
      version: '1.0.0',
      description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:3001',
    basePath: '/',
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        description: 'JWT authorization of an API',
        name: 'Authorization',
        in: 'header',
      },
    },
  };
  // options for the swagger docs
  var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],// pass all in array 
    };
  // initialize swagger-jsdoc
  var swaggerSpec = swaggerJSDoc(options);
   
  // serve swagger
  //console.log(swaggerSpec);
   
  module.exports = (app)=>{
    app.get('/swagger.json', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
      });

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  };
