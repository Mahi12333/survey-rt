
import { DataTypes } from 'sequelize';
import {sequelize} from '../../config/database/connection.js';

const Otpverify = sequelize.define('Otpverify', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('registration', 'forgotPassword'),
        allowNull: true,
        defaultValue: 'registration'
    }


}, {
    tableName: 'tbl_otpverifys',
    timestamps: true, // Set to true if you want Sequelize to automatically manage createdAt and updatedAt columns
});

// Otpverify.sync();
// Otpverify.sync({ force: true });
// Otpverify.sync({ alter: true }); 

export default Otpverify;