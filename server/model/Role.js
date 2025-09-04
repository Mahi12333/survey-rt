import { DataTypes } from "sequelize";
import {sequelize} from '../../config/database/connection.js';
import { ROLE_NAMES } from "../utils/constanse.js"; 

const Role = sequelize.define(
  "Role",
  {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isIn: {
          args: [Object.values(ROLE_NAMES)],
          msg: "Value is not supported",
        },
      },
    },
  },
  {
    tableName: "tbl_roles", // explicitly sets the table name
    timestamps: true, 
    indexes: [
      {
        unique: true,
        fields: ["name"],
      },
    ],
  }
);


// Role.sync();
// Role.sync({ force: true });
// Role.sync({ alter: true }); 

export default Role