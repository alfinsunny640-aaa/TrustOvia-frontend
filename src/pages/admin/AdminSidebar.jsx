import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="w-64 min-h-screen bg-gray-900 text-white p-5">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

            <nav className="flex flex-col gap-4">
                <NavLink to="/admin/dashboard">Dashboard</NavLink>
                <NavLink to="/admin/products">Products</NavLink>
                <NavLink to="/admin/orders">Orders</NavLink>
                <NavLink to="/admin/users">Users</NavLink>

                <button
                    onClick={logout}
                    className="text-left text-red-400 mt-6"
                >
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default AdminSidebar;
