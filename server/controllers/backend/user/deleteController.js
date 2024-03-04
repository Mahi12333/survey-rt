import userroleModel from "../../../model/backend/userroleModel.js";

class User_DeleteController {
    static user_delete = async (req, res) => {
        try {
            const { userId } = req.params;
            if (userId) {
                const deletedUser = await userroleModel.findByIdAndDelete(userId);
                if (deletedUser) {
                  return  res.status(200).json({
                        status: "success",
                        message: "User deleted successfully",
                        data: deletedUser });                   
                } else {
                return    res.status(404).json({
                        status: "failed",
                        message: "User Not deleted successfully",
                        data: deletedUser });  
                }
            } else {
             return   res.status(400).json({ error: 'Bad Request: Missing userId parameter' });
            }
        } catch (error) {
          return  res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

export default User_DeleteController;
