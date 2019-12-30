import Sequelize from 'sequelize'; // responsavel pelo conexao
import mongoose from 'mongoose'; // responsavel pelo conexao

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';
import databaseConfig from '../config/database'; // importando as cfgs do db

const models = [User, File, Appointment];

class Database {
  //
  constructor() {
    //
    this.init(); // faz a conexão e carrega os models
    this.mongo();
  }

  init() {
    // separando a classe
    this.connection = new Sequelize(databaseConfig); // ja temos a conexao aqui, esse variavel this.connection é espera lá dentro do models como sequelize em static init(sequelize) {

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    // mongo cria automaticamente a base de dados
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
