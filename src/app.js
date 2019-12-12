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
import path from 'path';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();

    // necessário chamar dentro do constructor senão so métodos nunca serão chamados
    this.middlewares();
    this.routes();
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
}

// module.exports = new App().server;

export default new App().server; // com Sucrase
