// registro de usuários pela da API REST
import User from '../models/User';

class UserController {
  async store(req, res) {
    // verificar se usuário existe
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // vai recebber dados de reatc, insomina e criar um novo usuário
    const { id, name, email, provider } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController(); // todo controller segue esse face
