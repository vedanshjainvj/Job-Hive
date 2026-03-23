import { User } from "../models/user.model.js";

const isSuperAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.id);
        if (!user || user.role !== "superadmin") {
            return res.status(403).json({ message: "Access denied. Super Admin only.", success: false });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export default isSuperAdmin;
