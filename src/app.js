const express = require('express');
const routes = require('./routes');

class App {

    constructor() {

        this.server = express();
        
        // necessário chamar dentro do constructor senão so métodos nunca serão chamados
        this.middlewares();
        this.routes();

    }

    middlewares() {

        this.server.use(express.json());

    }

    routes() {

        // this.server.get   .. idem forma anterior domodelo 1 
        this.server.use(routes);

    }


}


module.exports = new App().server;



//const express = require('express');