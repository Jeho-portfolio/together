const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init({
      user_id : {
        type : Sequelize.INTEGER,
        allowNull : false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      major: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      email : {
        type : Sequelize.STRING(50),
        allowNull : false,
      },
      profile_img : {
        type : Sequelize.STRING,
        allowNull : true,
      },
      profile : {
        type : Sequelize.STRING,
        allowNull : true,
      },
      warning_count : {
        type : Sequelize.INTEGER,
        defaultValue : 0,
      },
      count_room : {
        type : Sequelize.INTEGER,
        defaultValue : 0,
      },

    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.belongsToMany(db.Room, {
      through: 'Participation',
    });
    
  }
};

module.exports = User;