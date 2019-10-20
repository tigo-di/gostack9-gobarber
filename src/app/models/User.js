import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    // essa variável é passad pelo método init da classe Database em index.js
    // Initialize a model, representing a table in the DB, with attributes and options.
    super.init(
      {
        /*
          As colunas presentes no model
          não precisam
          ser um reflexo das colunas presentes
          na tabela no banco de dados.

          
        */
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // um campo que nunca vai existir no bd, somente existe aqui no código
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    ); // fim de super.init

    this.addHook('beforeSave', async user => {
      if (user.password) {
        // se há = qnd user criado ou senha alterada

        user.password_hash = await bcrypt.hash(user.password, 8); // 8 = número de rounds/passos da cryptografia
      }
    }); // Hook = função do Sequelize, trechos de código que são executados de acordo com ações que acontecem em nosso model.

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash); // true is pass bates
  }
}

export default User;
