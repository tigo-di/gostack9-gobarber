import Sequelize from 'sequelize'; // responsavel pelo conexao
import User from '../app/models/User';
import File from '../app/models/File';
import databaseConfig from '../config/database'; // importando as cfgs do db

const models = [User, File];

class Database {
  //
  constructor() {
    //
    this.init(); // faz a conexão e carrega os models
  }

  init() {
    // separando a classe
    this.connection = new Sequelize(databaseConfig); // ja temos a conexao aqui, esse variavel this.connection é espera lá dentro do models como sequelize em static init(sequelize) {

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
