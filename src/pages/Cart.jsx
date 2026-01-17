// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//     getCart,
//     updateQuantity,
//     removeItem,
// } from "../services/cartApi";
// const API = import.meta.env.VITE_API_URL;

// function Cart() {
//     const navigate = useNavigate();
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     const userId = storedUser?.user?._id;
//     console.log("CART USER ID:", userId);

//     const [cart, setCart] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const fetchCart = async () => {
//         if (!userId) {
//             setLoading(false);
//             return;
//         }

//         try {
//             const res = await getCart(userId);
//             setCart(res.data);
//         } catch (err) {
//             console.error("FETCH CART ERROR:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // useEffect(() => {
//     //     fetchCart();
//     // }, [userId]);
//     useEffect(() => {
//         if (!userId) return;

//         axios
//             .get(`${API}/api/cart/${userId}`)
//             .then((res) => {
//                 console.log("🛒 CART API RESPONSE:", res.data);
//                 setCart(res.data);
//             })
//             .catch((err) => {
//                 console.error("CART LOAD ERROR:", err);
//                 setCart({ items: [], subtotal: 0 });
//             });
//     }, [userId]);

//     const changeQty = async (productId, qty) => {
//         if (qty < 1) return;
//         await updateQuantity({ userId, productId, quantity: qty });
//         fetchCart();
//     };

//     const removeFromCart = async (productId) => {
//         await removeItem(userId, productId);
//         fetchCart();
//     };

//     // ✅ LOADING STATE
//     if (loading) {
//         return (
//             <div className="p-6 text-center text-gray-500">
//                 Loading cart...
//             </div>
//         );
//     }

//     // ✅ NO CART / EMPTY CART
//     if (!cart || cart.items.length === 0) {
//         return (
//             <div className="p-6 text-center text-gray-500">
//                 Your cart is empty
//             </div>
//         );
//     }

//     return (
//         <div className="h-full flex flex-col">
//             {/* ITEMS */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-6">
//                 {cart.items.map((item) => (
//                     <div key={item.productId} className="flex gap-4">
//                         <img
//                             src={item.image}
//                             alt={item.name}
//                             className="w-20 h-20 object-cover rounded border"
//                         />

//                         <div className="flex-1">
//                             <h3 className="font-medium">{item.name}</h3>
//                             <p className="text-sm text-gray-600">
//                                 Rs. {item.price}
//                             </p>

//                             <div className="flex items-center gap-3 mt-2">
//                                 <button
//                                     onClick={() =>
//                                         changeQty(item.productId, item.quantity - 1)
//                                     }
//                                     className="border px-2"
//                                 >
//                                     −
//                                 </button>

//                                 <span>{item.quantity}</span>

//                                 <button
//                                     onClick={() =>
//                                         changeQty(item.productId, item.quantity + 1)
//                                     }
//                                     className="border px-2"
//                                 >
//                                     +
//                                 </button>
//                             </div>

//                             <button
//                                 onClick={() => removeFromCart(item.productId)}
//                                 className="text-sm text-gray-500 mt-2 underline"
//                             >
//                                 Remove
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* CHECKOUT */}
//             <div className="border-t p-4">
//                 <p className="text-sm text-gray-500 mb-2">
//                     Shipping & taxes calculated at checkout
//                 </p>




//                 <button
//                     onClick={() => navigate("/checkout")}
//                     className="w-full bg-black text-white py-3 mt-4"
//                 >
//                     Checkout · Rs. {cart.subtotal}
//                 </button>

//             </div>
//         </div>
//     );
// }

// export default Cart;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL + "/api";

function Cart() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.user?._id;

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Load Cart
  const loadCart = () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    axios
      .get(`${API}/cart/${userId}`)
      .then((res) => setCart(res.data))
      .catch(() => setCart({ items: [], subtotal: 0 }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCart();
  }, [userId]);

  // ➕➖ Update Quantity
  const updateQty = async (productId, qty) => {
    if (qty < 1) return;

    await axios.put(`${API}/cart/update`, {
      userId,
      productId,
      quantity: qty,
    });

    loadCart();
  };

  // ❌ Remove Item
  const removeItem = async (productId) => {
  try {
    await axios.delete(`${API}/cart/remove/${userId}/${productId}`);
    loadCart();
  } catch (err) {
    console.error("REMOVE ERROR:", err);
  }
};


  if (loading) return <p className="p-4">Loading cart...</p>;

  if (!cart?.items || cart.items.length === 0) {
    return <p className="p-4">Your cart is empty</p>;
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
                ₹{item.price}
              </p>

              {/* QUANTITY */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => updateQty(item.productId, item.quantity - 1)}
                  className="border px-2"
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => updateQty(item.productId, item.quantity + 1)}
                  className="border px-2"
                >
                  +
                </button>
              </div>

              {/* REMOVE */}
              <button
                onClick={() => removeItem(item.productId)}
                className="text-sm text-gray-500 underline mt-2"
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

        <button
          onClick={() => navigate("/checkout")}
          className="w-full bg-black text-white py-3"
        >
          Checkout · ₹{cart.subtotal}
        </button>
      </div>
    </div>
  );
}

export default Cart;

