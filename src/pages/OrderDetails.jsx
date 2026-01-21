import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_BASE_URL + "/api";

function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${API}/orders/${orderId}`)
            .then((res) => {
                setOrder(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("ORDER LOAD ERROR:", err);
                setLoading(false);
            });
    }, [orderId]);

    if (loading) {
        return <p className="text-center mt-10">Loading order...</p>;
    }

    if (!order) {
        return <p className="text-center mt-10">Order not found</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6">
            <h1 className="text-2xl font-bold mb-1">Order Details</h1>
            <p className="text-sm text-gray-500 mb-6">
                Order ID: {order._id}
            </p>

            {/* SHIPPING */}
            <div className="border rounded-lg p-4 mb-6">
                <h2 className="font-semibold mb-2">Shipping Address</h2>

                <p className="text-sm">{order.shippingAddress.fullName}</p>
                <p className="text-sm">{order.shippingAddress.addressLine}</p>

                <p className="text-sm">
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state} –{" "}
                    {order.shippingAddress.pincode}
                </p>

                {/* 📞 PHONE NUMBER */}
                <p className="mt-1">
                    📞 {order.shippingAddress.phone}
                </p>
            </div>


            {/* ITEMS */}
            <div className="border rounded-lg p-4 mb-6">
                <h2 className="font-semibold mb-4">Items</h2>

                {order.items.map((item, i) => (
                    <div key={i} className="flex gap-4 mb-4 items-center">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 border rounded"
                        />
                        <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                                ₹{item.price} × {item.quantity}
                            </p>
                        </div>
                        <p>₹{item.price * item.quantity}</p>
                    </div>
                ))}
            </div>

            {/* TOTAL */}
            <div className="border rounded-lg p-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{order.subtotal}</span>
                </div>
                <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{order.tax}</span>
                </div>
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>₹{order.deliveryFee}</span>
                </div>

                <hr className="my-2" />

                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{order.totalAmount}</span>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
