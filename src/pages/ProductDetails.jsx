// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import CartDrawer from "../components/CartDrawer";

// function ProductDetails() {
//     const { id } = useParams();

//     const user = JSON.parse(localStorage.getItem("user"));
//     const userId = user?._id || user?.id;

//     const [product, setProduct] = useState(null);
//     const [quantity, setQuantity] = useState(1);
//     const [cartOpen, setCartOpen] = useState(false);
//     const [loading, setLoading] = useState(false);       // add-to-cart loading
//     const [pageLoading, setPageLoading] = useState(true); // ✅ page loading

//     // 🔹 Fetch product
//     useEffect(() => {
//         setPageLoading(true);

//         axios
//             .get(`http://localhost:5000/api/products/${id}`)
//             .then((res) => setProduct(res.data))
//             .catch(() => alert("Failed to load product"))
//             .finally(() => setPageLoading(false));
//     }, [id]);

//     // 🔹 Add to cart
//     const addToCart = async () => {
//         if (!userId) {
//             alert("Please login");
//             return;
//         }

//         try {
//             setLoading(true);

//             await axios.post("http://localhost:5000/api/cart/add", {
//                 userId,
//                 productId: product._id,
//                 quantity,
//             });

//             setCartOpen(true);
//         } catch (err) {
//             alert("Failed to add to cart");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Navbar onCartOpen={() => setCartOpen(true)} />

//             {/* 🔄 PAGE LOADING */}
//             {pageLoading ? (
//                 <div className="flex items-center justify-center h-[70vh]">
//                     <p className="text-lg font-semibold text-gray-1000">
//                         Loading...
//                     </p>
//                 </div>
//             ) : (
//                 product && (
//                     <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
//                         {/* IMAGE */}
//                         <img
//                             src={product.image}
//                             alt={product.name}
//                             className="w-full rounded-lg"
//                         />

//                         {/* DETAILS */}
//                         <div>
//                             <h1 className="text-3xl font-bold">
//                                 {product.name}
//                             </h1>

//                             <p className="text-red-500 text-2xl font-semibold mt-2">
//                                 ₹{product.price}
//                             </p>

//                             <p className="text-gray-600 mt-4">
//                                 {product.description || "No description available"}
//                             </p>

//                             {/* QUANTITY */}
//                             <div className="flex items-center gap-4 mt-6">
//                                 <button
//                                     onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                                     className="border px-3 py-1"
//                                 >
//                                     −
//                                 </button>

//                                 <span className="font-medium">{quantity}</span>

//                                 <button
//                                     onClick={() => setQuantity((q) => q + 1)}
//                                     className="border px-3 py-1"
//                                 >
//                                     +
//                                 </button>
//                             </div>

//                             {/* ADD TO CART */}
//                             <button
//                                 onClick={addToCart}
//                                 disabled={loading}
//                                 className="mt-6 w-full bg-black text-white px-6 py-3 rounded hover:bg-gray-900"
//                             >
//                                 {loading ? "Adding..." : "Add to Cart"}
//                             </button>
//                         </div>
//                     </div>
//                 )
//             )}

//             {/* 🛒 CART DRAWER */}
//             <CartDrawer
//                 isOpen={cartOpen}
//                 onClose={() => setCartOpen(false)}
//             />
//         </div>
//     );
// }

// export default ProductDetails;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const API = `${BASE_URL}/api/products`;

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.user?._id;

 
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cartOpen, setCartOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    // 🔹 Fetch product
    useEffect(() => {
        setPageLoading(true);

        axios
            .get(`${API}/${id}`)
            .then((res) => {
                setProduct(res.data);
                setMainImage(res.data.images?.[0] || res.data.image);
            })
            .catch((err) => {
                console.error("PRODUCT LOAD ERROR:", err);
                alert("Failed to load product");
            })
            .finally(() => setPageLoading(false));
    }, [id]);

    // 🛒 ADD TO CART (FINAL FIX)
    const addToCart = async () => {
        if (!userId) {
            alert("You are not logged in. Please login again.");
            navigate("/login");
            return;
        }

        try {
            setLoading(true);

            await axios.post(`${BASE_URL}/api/cart/add`, {
                userId,
                productId: product._id,
                quantity,
            });

            setCartOpen(true);
        } catch (err) {
            console.error(
                "ADD TO CART ERROR:",
                err.response?.data || err.message
            );
            alert("Failed to add to cart");
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!product) return null;

    const images =
        product.images?.filter(Boolean) ||
        (product.image ? [product.image] : []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar onCartOpen={() => setCartOpen(true)} />

            <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
                {/* 🖼️ IMAGE */}
                <div>
                    <img
                        src={mainImage}
                        alt={product.name}
                        className="w-full h-96 object-contain border bg-white"
                    />

                    {images.length > 1 && (
                        <div className="flex gap-3 mt-4">
                            {images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    onClick={() => setMainImage(img)}
                                    className={`w-20 h-20 cursor-pointer border ${mainImage === img
                                        ? "border-black"
                                        : "border-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* 📄 DETAILS */}
                <div>
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-red-500 text-2xl mt-2">
                        ₹{product.price}
                    </p>
                    <p className="text-gray-600 mt-4">
                        {product.description}
                    </p>

                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={() =>
                                setQuantity((q) => Math.max(1, q - 1))
                            }
                        >
                            −
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity((q) => q + 1)}>
                            +
                        </button>
                    </div>

                    <button
                        onClick={addToCart}
                        disabled={loading}
                        className="mt-6 w-full bg-black text-white py-3"
                    >
                        {loading ? "Adding..." : "Add to Cart"}
                    </button>
                </div>
            </div>

            <CartDrawer
                isOpen={cartOpen}
                onClose={() => setCartOpen(false)}
            />
        </div>
    );
}

export default ProductDetails;



