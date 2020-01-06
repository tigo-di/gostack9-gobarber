// const { Router } = require("express"); // importando apenas a parte de roteamento

// possível com Sucrase
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AvailableController from './app/controllers/AvailableController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

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

// middleware global
// Somente rotas declaradas após esse ponto terão o middleware aplicado
routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedules', ScheduleController.index);
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// module.exports = routes;
export default routes;
