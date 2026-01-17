import { useParams, Link } from "react-router-dom";

function OrderSuccess() {
    const { orderId } = useParams();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-green-600 mb-4">
                    🎉 Order Placed Successfully
                </h1>

                <p className="text-gray-600 mb-2">Your Order ID</p>
                <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                    {orderId}
                </p>

                <div className="mt-6 flex gap-4 justify-center">
                    <Link
                        to={`/orders/${orderId}`}
                        className="bg-black text-white px-5 py-2 rounded"
                    >
                        View Order
                    </Link>

                    <Link
                        to="/orders"
                        className="border px-5 py-2 rounded"
                    >
                        My Orders
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;
