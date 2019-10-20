import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    // essa variável é passad pelo método init da classe Database em index.js
    // Initialize a model, representing a table in the DB, with attributes and options.
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
