const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const { before } = require('node:test');
const { beforeUpdate } = require('./Blog');


class User extends Model{
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey :true,
            autoIncrement :true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique :true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        twitter: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        github: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
    },

    {
        hooks: {
          
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
        
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
          },
    
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
      }
    );
    
    module.exports = User;
   