
import { DataTypes } from 'sequelize';
import {sequelize} from '../../config/database/connection.js';

const SubmitSurvey = sequelize.define('SubmitSurvey', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    specifi_survey_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category_survey_id : {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    total_marks : {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
     score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answer: {
      type: DataTypes.JSON, // Store Answer full JSON object/array
      allowNull: true,
      defaultValue: [] 
    },
    status: {
      type: DataTypes.ENUM("Pending", "Complate"),
      defaultValue: "Pending",
    
    }

}, {
    tableName: 'tbl_submit_survey',
    timestamps: true, // Set to true if you want Sequelize to automatically manage createdAt and updatedAt columns
});

// SubmitSurvey.sync();
// SubmitSurvey.sync({ force: true });
// SubmitSurvey.sync({ alter: true }); 

export default SubmitSurvey;