// const { Router } = require("express"); // importando apenas a parte de roteamento

// possível com Sucrase
import { Router } from 'express';

// possível com Sucrase
import User from './app/models/User';

import UserController from './app/controllers/UserController';

const routes = new Router();

/*

routes.get('/', async (req, res) => {
  // definindo função assícrona pois sequelize pode demorar para executar o método create
  const user = await User.create({
    name: 'Tiago Dias',
    email: 'tiaaaaaaaafffaaa@gmail.com',
    password_hash: '5143ada44345',
  });

  return res.json(user);
});
*/

routes.post('/users', UserController.store);

// module.exports = routes;
export default routes;
