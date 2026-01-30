import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        // ❌ If not logged in or not admin → redirect
        if (!user || user.role !== "admin") {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin 👋</p>

            <ul>
                <li>📦 Manage Products</li>
                <li>🧾 View Orders</li>
                <li>👥 Manage Users</li>
            </ul>
        </div>
    );
};

export default Admin;
