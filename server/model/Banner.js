
import { DataTypes } from 'sequelize';
import {sequelize} from '../../config/database/connection.js';

const Banner = sequelize.define('Banner', {
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
    specific_survey_id : {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },

}, {
    tableName: 'tbl_banners',
    timestamps: true, // Set to true if you want Sequelize to automatically manage createdAt and updatedAt columns
});

// Banner.sync();
// Banner.sync({ force: true });
// Banner.sync({ alter: true }); 

export default Banner;