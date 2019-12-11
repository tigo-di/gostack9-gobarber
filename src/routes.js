// const { Router } = require("express"); // importando apenas a parte de roteamento

// possível com Sucrase
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

// possível com Sucrase
import User from './app/models/User';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

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
routes.post('/sessions', SessionController.store);

// middeware local
// routes.put('/users', authMiddleware, UserController.update);

// middleware global, somente rotas declaras após esse ponte erão o middleware palicado
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ ok: true });
});

// module.exports = routes;
export default routes;
