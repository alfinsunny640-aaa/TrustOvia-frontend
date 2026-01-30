import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [stats, setStats] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        const res = await axios.get(
            "http://localhost:5000/api/admin/stats",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setStats(res.data);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Products" value={stats.totalProducts} />
                <StatCard title="Total Orders" value={stats.totalOrders} />
                <StatCard title="Total Users" value={stats.totalUsers} />
                <StatCard title="Total Revenue" value={`₹${stats.totalRevenue}`} />
            </div>
        </div>
    );
};

const StatCard = ({ title, value }) => (
    <div className="bg-white shadow rounded p-6 text-center">
        <h2 className="text-gray-500">{title}</h2>
        <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
);

export default AdminDashboard;
