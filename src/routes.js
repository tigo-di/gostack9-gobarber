// const { Router } = require("express"); // importando apenas a parte de roteamento

// possível com Sucrase
import { Router } from 'express';

// possível com Sucrase
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Tiago Dias',
    email: 'tiaaaaaaaaaaa@gmail.com',
    password_hash: '5143ada44345',
  });
  return res.json(user);
});

// module.exports = routes;
export default routes;
