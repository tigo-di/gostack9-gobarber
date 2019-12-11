import Sequelize, { Model } from 'sequelize';

class File extends Model {
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
        path: Sequelize.STRING,
      },
      {
        sequelize,
      }
    ); // fim de super.init

    return this;
  }
}

export default File;
