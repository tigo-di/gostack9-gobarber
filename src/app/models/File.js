import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    // método invocado em src/database/index.js (chamado por "[path]/database")
    // através de map de vetor de models.

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
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    ); // fim de super.init

    return this;
  }
}

export default File;
