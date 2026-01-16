import { useEffect, useState } from "react";
import {
    getCart,
    updateQuantity,
    removeItem,
} from "../services/cartApi";

function Cart() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.user?._id;

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        if (!userId) {
            setLoading(false);
            return;
        }

        try {
            const res = await getCart(userId);
            setCart(res.data);
        } catch (err) {
            console.error("FETCH CART ERROR:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [userId]);

    const changeQty = async (productId, qty) => {
        if (qty < 1) return;
        await updateQuantity({ userId, productId, quantity: qty });
        fetchCart();
    };

    const removeFromCart = async (productId) => {
        await removeItem(userId, productId);
        fetchCart();
    };

    // ✅ LOADING STATE
    if (loading) {
        return (
            <div className="p-6 text-center text-gray-500">
                Loading cart...
            </div>
        );
    }

    // ✅ NO CART / EMPTY CART
    if (!cart || cart.items.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500">
                Your cart is empty
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            {/* ITEMS */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {cart.items.map((item) => (
                    <div key={item.productId} className="flex gap-4">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded border"
                        />

                        <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-600">
                                Rs. {item.price}
                            </p>

                            <div className="flex items-center gap-3 mt-2">
                                <button
                                    onClick={() =>
                                        changeQty(item.productId, item.quantity - 1)
                                    }
                                    className="border px-2"
                                >
                                    −
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    onClick={() =>
                                        changeQty(item.productId, item.quantity + 1)
                                    }
                                    className="border px-2"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.productId)}
                                className="text-sm text-gray-500 mt-2 underline"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* CHECKOUT */}
            <div className="border-t p-4">
                <p className="text-sm text-gray-500 mb-2">
                    Shipping & taxes calculated at checkout
                </p>

                <button className="w-full bg-black text-white py-3">
                    Checkout · Rs. {cart.totalAmount}
                </button>
            </div>
        </div>
    );
}

export default Cart;
