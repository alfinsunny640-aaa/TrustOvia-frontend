import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_BASE_URL;

function Orders() {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem("userId"); // or auth context

    useEffect(() => {
        axios
            .get(`${API}/api/orders/user/${userId}`)
            .then((res) => setOrders(res.data))
            .catch(console.error);
    }, []);

    if (!orders.length) {
        return <p className="text-center mt-10">No orders yet</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="border rounded-lg p-4 flex justify-between items-center"
                    >
                        <div>
                            <p className="font-semibold">
                                Order #{order._id.slice(-6)}
                            </p>
                            <p className="text-sm text-gray-500">
                                {new Date(order.createdAt).toDateString()}
                            </p>
                            <p className="text-sm">
                                Total: ₹{order.totalAmount}
                            </p>
                        </div>

                        <Link
                            to={`/orders/${order._id}`}
                            className="text-blue-600 underline"
                        >
                            View
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;
