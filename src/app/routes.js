const { Router } = require('express');
const controllers = require('./controllers');

const routes = Router();

// routes.get('/user', controllers.UserController.index);
// routes.get('/user/:id', controllers.UserController.show);
routes.post('/user', controllers.UserController.store);
routes.put('/user/:id', controllers.UserController.update);
// routes.delete('/user/:id', controllers.UserController.delete);

module.exports = routes;
