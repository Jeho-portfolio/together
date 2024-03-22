const Sequelize = require('sequelize');

class Room extends Sequelize.Model {
  static initiate(sequelize) {
    Room.init({
      project_name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      leader : {
        type : Sequelize.STRING,
        allowNull : false,
      },
      project_start : {
        type : Sequelize.DATE,
      },
      project_end : {
        type : Sequelize.DATE,
      },
      occupancy : {
        type : Sequelize.INTEGER,
      },
      project_type : {
        type : Sequelize.STRING(40),
      },
     
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Room',
      tableName: 'rooms',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Room.belongsToMany(db.User, {
       through: 'Participation',
      });
  }
};

module.exports = Room;