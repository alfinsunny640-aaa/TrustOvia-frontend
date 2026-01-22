import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_BASE_URL + "/api";

function Checkout() {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.user?._id;

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const [address, setAddress] = useState({
        fullName: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        phone: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const shippingFee = 50;
    const taxRate = 0.18;

    /* =========================
       🔒 LOGIN GUARD
       ========================= */
    useEffect(() => {
        if (!userId) {
            alert("You are not logged in. Please login again.");
            navigate("/login");
        }
    }, [userId, navigate]);

    /* =========================
       ✅ LOAD CART
       ========================= */
    useEffect(() => {
        if (!userId) return;

        axios
            .get(`${API}/cart/${userId}`)
            .then((res) => {
                setCart(res.data || { items: [], subtotal: 0 });
                setLoading(false);
            })
            .catch(() => {
                setCart({ items: [], subtotal: 0 });
                setLoading(false);
            });
    }, [userId]);

    /* =========================
       ✅ LOAD DEFAULT ADDRESS
       ========================= */
    useEffect(() => {
        if (!userId) return;

        axios
            .get(`${API}/address/default/${userId}`)
            .then((res) => {
                if (res.data) {
                    setAddress({
                        fullName: res.data.fullName || "",
                        addressLine: res.data.addressLine || "",
                        city: res.data.city || "",
                        state: res.data.state || "",
                        pincode: res.data.pincode || "",
                        country: res.data.country || "India",
                        phone: res.data.phone || "",
                    });
                }
            })
            .catch(() => { });
    }, [userId]);

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    const subtotal = Number(cart?.subtotal) || 0;
    const tax = +(subtotal * taxRate).toFixed(2);
    const total = subtotal + shippingFee + tax;

    /* =========================
       🔹 LOAD RAZORPAY SCRIPT
       ========================= */
    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) return resolve(true);

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    /* =========================
       🔹 ONLINE PAYMENT
       ========================= */
    if (!address.phone || address.phone.length < 10) {
        alert("Please enter a valid 10-digit phone number");
        return;
    }


    const startOnlinePayment = async () => {
        const loaded = await loadRazorpay();
        if (!loaded) {
            alert("Razorpay SDK failed to load");
            return;
        }



        try {
            // 1️⃣ Create Razorpay order
            const orderRes = await axios.post(
                `${API}/payments/create-order`,
                { amount: total * 100 } // paise
            );

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: orderRes.data.amount,
                currency: "INR",
                name: "My Store",
                description: "Order Payment",
                order_id: orderRes.data.id,

                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post(`${API}/payments/verify`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            userId,
                            shippingAddress: address,
                        });

                        navigate(`/order-success/${verifyRes.data.orderId}`);
                    } catch (err) {
                        console.error("VERIFY ERROR:", err.response?.data || err.message);
                        alert("Payment verification failed");
                    }
                },


                prefill: {
                    name: address.fullName || "Customer",
                    contact: String(address.phone || ""),
                },


                theme: { color: "#000" },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (err) {
            alert("Online payment failed");
        }
    };

    /* =========================
       🔹 COD ORDER
       ========================= */
    const placeCODOrder = async () => {
        try {
            const res = await axios.post(`${API}/orders`, {
                userId,
                paymentMethod: "COD",
                shippingAddress: address,
            });

            navigate(`/order-success/${res.data.orderId}`);
        } catch {
            alert("Order failed");
        }
    };

    /* =========================
       🔹 PLACE ORDER
       ========================= */
    const handlePlaceOrder = () => {
        if (!cart?.items || cart.items.length === 0) {
            alert("Cart is empty");
            return;
        }

        if (paymentMethod === "COD") {
            placeCODOrder();
        } else {
            startOnlinePayment();
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:flex gap-6">
            {/* LEFT */}
            <div className="flex-1 bg-white p-4 rounded-lg">
                <h2 className="font-semibold mb-3">Delivery</h2>

                {["fullName", "addressLine", "city", "state", "pincode"].map((field) => (
                    <input
                        key={field}
                        placeholder={field}
                        className="border p-2 w-full mb-2 rounded"
                        value={address[field]}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                [field]: e.target.value,
                            })
                        }
                    />
                ))}

                {/* ✅ PHONE INPUT – DO NOT PUT IN MAP */}
                <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Phone"
                    className="border p-2 w-full mb-2 rounded"
                    value={address.phone}
                    onChange={(e) =>
                        setAddress({ ...address, phone: e.target.value })
                    }
                />


                <h2 className="font-semibold mt-5 mb-2">Payment</h2>

                <label className="flex gap-2 border p-3 rounded mb-2">
                    <input
                        type="radio"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                    />
                    Cash on Delivery
                </label>

                <label className="flex gap-2 border p-3 rounded">
                    <input
                        type="radio"
                        checked={paymentMethod === "ONLINE"}
                        onChange={() => setPaymentMethod("ONLINE")}
                    />
                    Online Payment
                </label>

                <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-blue-600 text-white py-3 rounded mt-6"
                >
                    Place Order
                </button>
            </div>

            {/* RIGHT */}
            <div className="w-full md:w-96 bg-gray-50 p-4 rounded-lg">
                <h2 className="font-semibold mb-4">Order Summary</h2>

                {cart.items.map((item, i) => (
                    <div key={i} className="flex gap-3 mb-3">
                        <img
                            src={item.image}
                            className="w-12 h-12 border"
                            alt=""
                        />
                        <div className="flex-1 text-sm">
                            <p>{item.name}</p>
                            <p className="text-gray-500">
                                ₹{item.price} × {item.quantity}
                            </p>
                        </div>
                        <p>₹{item.price * item.quantity}</p>
                    </div>
                ))}

                <hr />

                <div className="text-sm mt-3 space-y-1">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>₹{shippingFee}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax</span>
                        <span>₹{tax}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
