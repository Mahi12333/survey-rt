import User from "./User.js";
import Role from "./Role.js";
import Bookmark from "./Bookmark.js";
import Banner from "./Banner.js";
import CategorySurvey from "./CategorySurvey.js";
import Otpverify from "./Otpverify.js";
import SubmitSurvey from "./SubmitSurvey.js";
import SpecificSurvey from "./SpecificSurvey.js";

// User ↔ Role
User.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(User, { foreignKey: 'role_id' });

// 


export{
    User,
    Role,
    Otpverify,
    Banner,
    CategorySurvey,
    SpecificSurvey,
    Bookmark,
    SubmitSurvey
}





