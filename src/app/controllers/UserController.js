// Schema Validation - a importação diferenciada é
// feita devido a ausência de export, é preciso importá-lo todo.
import * as Yup from 'yup';

// registro de usuários pela da API REST
import User from '../models/User';

class UserController {
  async store(req, res) {
    // Usando Yup para validar dados de entrada
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    // INTERROMPE fluxo se a validação falha

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
    /*
      Antes desse método ser executado há o
      authMiddleware
      que:
      - verifica a existência de Token em req.headers.authorization;
      - ifok: jwt.verify testa se o token é válido usando o
      valor de authConfig.secret;
      - iffail: fluxo encerrado, msg token inválido
      - ifok:
        - resultado guardado em decoded;
        - definido req.userId = decoded.id;
        - fluxo segue
    */

    // Usando Yup para validar dados de entrada
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    // INTERROMPE fluxo se a validação falha
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // console.log(req.userId);

    //  O Token foi verificado acima mas
    // é preciso outras verificações:

    //  dados a serem vierificados:
    const { email, oldPassword } = req.body;

    // RECUPERANDO dados do Model
    // req.userId = decoded.id criado após verificação do token.
    // O id foi armazenado no token após criação de sessão.
    const user = await User.findByPk(req.userId);

    // EMAIL - Verificação
    // se o usuário está atualizando o email é preciso verificar se não há outro usuário com esse email cadastrado
    if (email && email !== user.email) {
      // short syntax
      const userExists = await User.findOne({ where: { email } });

      // INTERROMPE fluxo se já existe usuário com o email informado
      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    // OLDPASSWORD - Verificação
    // Se oldPassword foi informado, quer dizer que o usuário
    // quer atualizar o seu password
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Passord does not match' });
    }

    // O Sequelize confere as informalções que estão no body
    // e aplica a atualização
    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController(); // todo controller segue esse face
