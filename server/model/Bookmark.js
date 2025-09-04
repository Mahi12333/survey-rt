import { DataTypes } from 'sequelize';
import {sequelize} from '../../config/database/connection.js';

const Bookmark = sequelize.define('Bookmark', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    specifi_survey_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    type: {
    type: DataTypes.ENUM('bookmark', 'like'),
    allowNull: true,
    defaultValue: 'like'
  }
},
    {
        tableName: 'tbl_bookmark',
        timestamps: true,
    }
);


// Bookmark.sync();
// Bookmark.sync({ force: true });
// Bookmark.sync({ alter: true }); 

export default Bookmark
