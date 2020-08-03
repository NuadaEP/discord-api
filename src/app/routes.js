const { Router } = require('express');
const controllers = require('./controllers');

const routes = Router();

routes.post('/user', controllers.UserController.store);

routes.post('/custom/:external_id', controllers.CustomFieldController.store);
routes.delete(
  '/custom/:external_id/:field_name',
  controllers.CustomFieldController.delete
);

routes.get('/chat', controllers.ChatController.index);
routes.get('/chat/:id', controllers.ChatController.end);
routes.post('/chat', controllers.ChatController.store);

routes.get('/message/:chat_id', controllers.MessageController.index);
routes.post('/message/:chat_id', controllers.MessageController.store);

module.exports = routes;
