import userroleModel from "../../../model/backend/userroleModel.js";

class UpdateMethodController {
    static user_update = async (req, res) => {
        const {userId}  = req.params;
        const { role, permission, username, mobile} = req.body;
        try {
            if (role && permission && username && mobile) {
                const permissionsString = permission.join(', ');
                const updatedUser = await userroleModel.findByIdAndUpdate(
                    userId,
                    { $set: {role:role,permission:permissionsString, username:username, mobile:mobile } },
                    {new:true}
                );
                if (updatedUser) {
                    res.status(200).json({
                        status: 'success',
                        message: 'User details updated successfully',
                        data: updatedUser,
                    }); 
                }else{
                    return res.status(400).json({
                        status: 'failed',
                        message: 'User not found',
                    });
                }
                
            } else {
                res.status(400).json({ error: "Bad llRequest: Missing 'id' parameter" });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}
export default UpdateMethodController;