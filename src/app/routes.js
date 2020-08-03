const { Router } = require('express');
const controllers = require('./controllers');
const Authentication = require('./middlewares/AuthenticationMiddleware');

const routes = Router();

routes.post('/user', controllers.UserController.store);

routes.post('/login', controllers.SessionController);

routes.use(Authentication);

routes.get('/user', controllers.UserController.index);

routes.get('/chat', controllers.ChatController.index);
routes.get('/chat/:id', controllers.ChatController.end);
routes.post('/chat', controllers.ChatController.store);

routes.get('/message/:chat_id', controllers.MessageController.index);
routes.post('/message/:chat_id', controllers.MessageController.store);

module.exports = routes;
