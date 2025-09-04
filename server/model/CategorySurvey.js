
import { DataTypes } from 'sequelize';
import {sequelize} from '../../config/database/connection.js';

const CategorySurvey = sequelize.define('CategorySurvey', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    logo_path: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },

}, {
    tableName: 'tbl_category_survey',
    timestamps: true, // Set to true if you want Sequelize to automatically manage createdAt and updatedAt columns
});

// CategorySurvey.sync();
// CategorySurvey.sync({ force: true });
// CategorySurvey.sync({ alter: true }); 

export default CategorySurvey;