import {sequelize} from "../../config/database/connection.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "User",
  {
   id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
     user_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    email: {
        type: DataTypes.STRING,
        unique: {
            args: true,
            msg: 'Email must be unique.'
        },
        validate: {
            isEmail: {
                msg: 'Please enter a valid email address.'
            },
            notEmpty: {
                msg: 'Email cannot be empty.'
            }
        }
    },
    mobile: {
        type: DataTypes.STRING,
        defaultValue: null,
        unique: {
            args: true,
            msg: 'Phone number must be unique.'
        }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    login_from: {
      type: DataTypes.ENUM("local", "google"),
      allowNull: false,
      defaultValue: "local",
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1

    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    profile_complete: {
      type: DataTypes.ENUM("PENDING", "COMPLETE"),
      defaultValue: "PENDING",
    },
    fcm_token: { 
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    tableName: "tbl_users", // explicitly sets the table name
     timestamps: true, //  createdAt and updatedAt
  }
);


// User.sync();
// User.sync({ force: true });
// User.sync({ alter: true }); 


export default User;