import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
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
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        /*
          Os campos user_id e provider_id são gerados pelo método associate logo abaixo
        */
      },
      {
        sequelize,
      }
    ); // fim de super.init

    return this;
  }

  static associate(models) {
    // O apelido é obrigatório quando há mais de um relacionamento
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
