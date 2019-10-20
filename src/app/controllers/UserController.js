// registro de usuários pela da API REST
import User from '../models/User';

class UserController {
  async store(req, res) {
    // VERIFICA se existe usuário com o email informado
    const userExists = await User.findOne({ where: { email: req.body.email } });

    // INTERROMPE fluxo se já existe usuário com o email informado
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // RECEBE dados de reatc, insomia e
    // CRIA com Sequelize um novo usuário
    const { id, name, email, provider } = await User.create(req.body);

    // RETORNA
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    // o usuário fez login, o id está no token e passou para req

    console.log(req.userId);

    return res.json({ ok: true });
  }
}

export default new UserController(); // todo controller segue esse face
