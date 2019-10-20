import Sequelize from 'sequelize'; // responsavel pelo conexao
import User from '../app/models/User';
import databaseConfig from '../config/database'; // importando as cfgs do db

const models = [User];

class Database {
  //
  constructor() {
    //
    this.init(); // faz a conexão e carrega os models
  }

  init() {
    // separando a classe
    this.connection = new Sequelize(databaseConfig); // ja temos a conexao aqui, esse variavel this.connection é espera lá dentro do models como sequelize em static init(sequelize) {

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
