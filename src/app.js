/*
const express = require('express');
const routes = require('./routes'); // importando as rostas de outro arquivo
*/

/*
   importacao abaixo é possivel graças
   ao sucrase que permite a sintaxe
   mais atual do js

*/
import express from 'express';
import 'express-async-errors';
import Youche from 'youch';
import path from 'path';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';

import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();
    Sentry.init(sentryConfig);

    this.server.use(Sentry.Handlers.requestHandler());
    this.middlewares();
    this.routes();
    this.server.use(Sentry.Handlers.errorHandler());
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());

    this.server.use(
      '/files', // virtual path - It does not actually exists in file system
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    // this.server.get   .. idem forma anterior domodelo 1
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youche(err, req).toJSON();

      return res.status(500).json(errors);
    });
  }
}

// module.exports = new App().server;

export default new App().server; // com Sucrase
