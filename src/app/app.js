const Dotenv = require('dotenv');
const Express = require('express');
const Mongoose = require('mongoose');

Dotenv.config();

const DatabaseConfig = require('../config/database');
const Routes = require('./routes');

class App {
  constructor() {
    this.app = Express();
    this.server = require('http').Server(this.app);
    this.io = require('socket.io')(this.server);

    this.database();
    this.middwares();
    this.routes();
    this.exception();
  }

  database() {
    Mongoose.connect(DatabaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  }

  middwares() {
    this.app.use((req, res, next) => {
      req.io = this.io;

      next();
    });
    this.app.use(Express.json());
    this.app.use(Express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use(Routes);
  }

  exception() {
    this.app.use(async (err, req, res, next) =>
      res
        .status(err.status || 500)
        .json({ message: err || 'Internal Server Error' })
    );
  }
}

module.exports = new App().server;
