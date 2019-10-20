import jwt from 'jsonwebtoken'; // por algum motivo há preferência para importar primeiro múdulo
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

// é uma nova entidade, precisa de umnovo controle, não pode ser um método de UserController.
class SessionController {
  async store(req, res) {
    // Usando Yup para validar dados de entrada
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // INTERROMPE fluxo se a validação falha

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    // verificando se o email da tentativa de autenticação existe
    const user = await User.findOne({ where: { email } }); // short syntax quando os nomes da propriedade e variável são iguais

    // se o email não existe, o fluxo se encerra
    if (!user) {
      // se usuário existe
      return res.status(401).json({ error: 'User not found' });
    }

    // se chegou aqui, o email existe para um usuário. Agora é necessário verificar se a senha para esse usuario é válida
    if (!(await user.checkPassword(password))) {
      // esse método checkPassword é criado no model User.js
      // o fluxo se encerra caso a senha nõ seja válida
      return res.status(401).json({ error: 'Password does not match' });
    }

    // se chegou até aqui quer dizer que o email e senha são válidos
    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      // retornamos um json web token
      // dentro do primeiro paramentro do sign definimos o conteúdo do payload
      // segundo parms: texto único, seguro, que ninguém mais tenha acesso
      // third params: passamos algumas cfgs, como data de expiração
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
