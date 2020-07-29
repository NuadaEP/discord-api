const { Router } = require('express');
const controllers = require('./controllers');

const routes = Router();

// routes.get('/user', controllers.UserController.index);
// routes.get('/user/:id', controllers.UserController.show);
routes.post('/user', controllers.UserController.store);
routes.put('/user/:id', controllers.UserController.update);
// routes.delete('/user/:id', controllers.UserController.delete);

routes.post('/custom/:external_id', controllers.CustomFieldController.store);
routes.delete(
  '/custom/:external_id/:field_name',
  controllers.CustomFieldController.delete
);

routes.get('/chat', controllers.ChatController.index);
routes.get('/chat/:id', controllers.ChatController.end);
routes.post('/chat', controllers.ChatController.store);

module.exports = routes;
