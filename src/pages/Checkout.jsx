// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const API = import.meta.env.VITE_API_URL;

// function Checkout() {
//     const navigate = useNavigate();
//     const userId = localStorage.getItem("userId");

//     const [cart, setCart] = useState({
//         items: [],
//         subtotal: 0,
//         totalItems: 0,
//     });

//     const [loading, setLoading] = useState(true);

//     const [address, setAddress] = useState({
//         fullName: "",
//         addressLine: "",
//         city: "",
//         state: "",
//         pincode: "",
//         country: "India",
//         phone: "",
//     });

//     const [paymentMethod, setPaymentMethod] = useState("COD");

//     const shippingFee = 50;
//     const taxRate = 0.18;

//     // 🔒 LOGIN GUARD
//     useEffect(() => {
//         if (!userId) {
//             alert("You are not logged in. Please login again.");
//             navigate("/login");
//         }
//     }, [userId]);

//     // ✅ LOAD CART
//     useEffect(() => {
//         if (!userId) return;

//         axios
//             .get(`${API}/cart/${userId}`)
//             .then((res) => {
//                 setCart(res.data);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.error("CART LOAD ERROR:", err);
//                 setLoading(false);
//             });
//     }, [userId]);

//     if (loading) return <p className="text-center mt-10">Loading...</p>;

//     const subtotal = Number(cart.subtotal) || 0;
//     const tax = +(subtotal * taxRate).toFixed(2);
//     const total = subtotal + shippingFee + tax;

//     // ✅ PLACE ORDER
//     const handlePlaceOrder = async () => {
//         if (cart.items.length === 0) {
//             alert("Cart is empty");
//             return;
//         }

//         try {
//             const res = await axios.post(`${API}/orders`, {
//                 userId,
//                 paymentMethod,
//                 shippingAddress: address,
//             });

//             navigate(`/order-success/${res.data.orderId}`);
//         } catch (err) {
//             alert(err.response?.data?.message || "Order failed");
//         }
//     };

//     return (
//         <div className="max-w-5xl mx-auto p-4 md:flex gap-6">

//             {/* LEFT */}
//             <div className="flex-1 bg-white p-4 rounded-lg">
//                 <h2 className="font-semibold mb-3">Delivery</h2>

//                 <input
//                     placeholder="Full Name"
//                     className="border p-2 w-full mb-2 rounded"
//                     value={address.fullName}
//                     onChange={(e) =>
//                         setAddress({ ...address, fullName: e.target.value })
//                     }
//                 />

//                 <input
//                     placeholder="Address"
//                     className="border p-2 w-full mb-2 rounded"
//                     value={address.addressLine}
//                     onChange={(e) =>
//                         setAddress({ ...address, addressLine: e.target.value })
//                     }
//                 />

//                 <input
//                     placeholder="City"
//                     className="border p-2 w-full mb-2 rounded"
//                     value={address.city}
//                     onChange={(e) =>
//                         setAddress({ ...address, city: e.target.value })
//                     }
//                 />

//                 <input
//                     placeholder="State"
//                     className="border p-2 w-full mb-2 rounded"
//                     value={address.state}
//                     onChange={(e) =>
//                         setAddress({ ...address, state: e.target.value })
//                     }
//                 />

//                 <input
//                     placeholder="Pincode"
//                     className="border p-2 w-full mb-2 rounded"
//                     value={address.pincode}
//                     onChange={(e) =>
//                         setAddress({ ...address, pincode: e.target.value })
//                     }
//                 />

//                 <input
//                     placeholder="Phone"
//                     className="border p-2 w-full mb-2 rounded"
//                     value={address.phone}
//                     onChange={(e) =>
//                         setAddress({ ...address, phone: e.target.value })
//                     }
//                 />

//                 <h2 className="font-semibold mt-5 mb-2">Payment</h2>

//                 <label className="block border p-3 rounded mb-2">
//                     <input
//                         type="radio"
//                         checked={paymentMethod === "COD"}
//                         onChange={() => setPaymentMethod("COD")}
//                     />{" "}
//                     Cash on Delivery
//                 </label>

//                 <button
//                     onClick={handlePlaceOrder}
//                     className="w-full bg-blue-600 text-white py-3 rounded mt-6"
//                 >
//                     Place Order
//                 </button>
//             </div>

//             {/* RIGHT */}
//             <div className="w-full md:w-96 bg-gray-50 p-4 rounded-lg">
//                 <h2 className="font-semibold mb-4">Order summary</h2>

//                 {cart.items && cart.items.length > 0 ? (
//                     cart.items.map((item, i) => (
//                         <div key={i} className="flex gap-3 mb-3">
//                             <img
//                                 src={item.image}
//                                 alt={item.name}
//                                 className="w-12 h-12 object-cover rounded border"
//                             />
//                             <div className="flex-1 text-sm">
//                                 <p>{item.name}</p>
//                                 <p className="text-gray-500">
//                                     ₹{item.price} × {item.quantity}
//                                 </p>
//                             </div>
//                             <p className="text-sm font-medium">
//                                 ₹{item.price * item.quantity}
//                             </p>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-sm text-gray-500">Your cart is empty</p>
//                 )}

//                 <hr />

//                 <div className="text-sm mt-3 space-y-1">
//                     <div className="flex justify-between">
//                         <span>Subtotal</span>
//                         <span>₹{subtotal}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span>Shipping</span>
//                         <span>₹{shippingFee}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span>Tax</span>
//                         <span>₹{tax}</span>
//                     </div>
//                     <div className="flex justify-between font-bold">
//                         <span>Total</span>
//                         <span>₹{total}</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Checkout;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_BASE_URL + "/api";

function Checkout() {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.user?._id;
    console.log("CHECKOUT USER ID:", userId);


    // ✅ FIX 2: SAFE INITIAL STATE
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
       ✅ FIX 5: LOAD CART SAFELY
       ========================= */
    useEffect(() => {
        if (!userId) return;

        axios
            .get(`${API}/cart/${userId}`)
            .then((res) => {
                console.log("✅ CHECKOUT CART API RESPONSE:", res.data);
                setCart(res.data || { items: [], subtotal: 0 });
                setLoading(false);
            })
            .catch((err) => {
                console.error("❌ CHECKOUT CART ERROR:", err);
                setCart({ items: [], subtotal: 0 });
                setLoading(false);
            });
    }, [userId]);


    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    /* =========================
       ✅ FIX 3: SAFE CALCULATIONS
       ========================= */
    const subtotal = Number(cart?.subtotal) || 0;
    const tax = +(subtotal * taxRate).toFixed(2);
    const total = subtotal + shippingFee + tax;

    /* =========================
       ✅ FIX 1: SAFE PLACE ORDER
       ========================= */
    const handlePlaceOrder = async () => {
        if (!cart?.items || cart.items.length === 0) {
            alert("Cart is empty");
            return;
        }

        try {
            const res = await axios.post(`${API}/orders`, {
                userId,
                paymentMethod,
                shippingAddress: address,
            });

            navigate(`/order-success/${res.data.orderId}`);
        } catch (err) {
            alert(err.response?.data?.message || "Order failed");
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:flex gap-6">
            {/* ================= LEFT ================= */}
            <div className="flex-1 bg-white p-4 rounded-lg">
                <h2 className="font-semibold mb-3">Delivery</h2>

                <input
                    placeholder="Full Name"
                    className="border p-2 w-full mb-2 rounded"
                    value={address.fullName}
                    onChange={(e) =>
                        setAddress({ ...address, fullName: e.target.value })
                    }
                />

                <input
                    placeholder="Address"
                    className="border p-2 w-full mb-2 rounded"
                    value={address.addressLine}
                    onChange={(e) =>
                        setAddress({ ...address, addressLine: e.target.value })
                    }
                />

                <input
                    placeholder="City"
                    className="border p-2 w-full mb-2 rounded"
                    value={address.city}
                    onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                    }
                />

                <input
                    placeholder="State"
                    className="border p-2 w-full mb-2 rounded"
                    value={address.state}
                    onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                    }
                />

                <input
                    placeholder="Pincode"
                    className="border p-2 w-full mb-2 rounded"
                    value={address.pincode}
                    onChange={(e) =>
                        setAddress({ ...address, pincode: e.target.value })
                    }
                />

                <input
                    placeholder="Phone"
                    className="border p-2 w-full mb-2 rounded"
                    value={address.phone}
                    onChange={(e) =>
                        setAddress({ ...address, phone: e.target.value })
                    }
                />

                <h2 className="font-semibold mt-5 mb-2">Payment</h2>

                <label className="block border p-3 rounded mb-2">
                    <input
                        type="radio"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                    />{" "}
                    Cash on Delivery
                </label>

                <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-blue-600 text-white py-3 rounded mt-6"
                >
                    Place Order
                </button>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="w-full md:w-96 bg-gray-50 p-4 rounded-lg">
                <h2 className="font-semibold mb-4">Order summary</h2>

                {/* ✅ FIX 4: SAFE RENDER */}
                {cart?.items && cart.items.length > 0 ? (
                    cart.items.map((item, i) => (
                        <div key={i} className="flex gap-3 mb-3">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded border"
                            />
                            <div className="flex-1 text-sm">
                                <p>{item.name}</p>
                                <p className="text-gray-500">
                                    ₹{item.price} × {item.quantity}
                                </p>
                            </div>
                            <p className="text-sm font-medium">
                                ₹{item.price * item.quantity}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">Your cart is empty</p>
                )}

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
