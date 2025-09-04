
import { DataTypes } from 'sequelize';
import {sequelize} from '../../config/database/connection.js';

const SpecificSurvey = sequelize.define('SpecificSurvey', {
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
    image_path: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    category_survey_id : {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    survey_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
     survey_question: {
      type: DataTypes.JSON, // Stores full JSON object/array
      allowNull: true,
      defaultValue: [] 
    }


}, {
    tableName: 'tbl_specific_survey',
    timestamps: true, // Set to true if you want Sequelize to automatically manage createdAt and updatedAt columns
});

// SpecificSurvey.sync();
// SpecificSurvey.sync({ force: true });
// SpecificSurvey.sync({ alter: true }); 

export default SpecificSurvey;