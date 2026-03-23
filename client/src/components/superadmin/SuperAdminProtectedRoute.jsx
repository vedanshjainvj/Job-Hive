import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SuperAdminProtectedRoute = ({ children }) => {
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null || user.role !== "superadmin") {
            navigate("/");
        }
    }, [user, navigate]);

    return <>{children}</>;
};

export default SuperAdminProtectedRoute;
