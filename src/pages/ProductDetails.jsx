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

    // ✅ USER
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.user?._id;

    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cartOpen, setCartOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    /* =========================
       🔹 FETCH PRODUCT
       ========================= */
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

    /* =========================
       🛒 ADD TO CART
       ========================= */
    const addToCart = async () => {
        if (!userId) {
            alert("Please login to add items to cart");
            navigate("/login");
            return;
        }

        if (!product) return;

        try {
            setLoading(true);

            await axios.post(`${BASE_URL}/api/cart/add`, {
                userId,
                productId: product._id,
                name: product.name,
                image: mainImage || product.image,
                price: product.price,
                quantity,
            });

            setCartOpen(true);
        } catch (err) {
            console.error("ADD TO CART ERROR:", err.response?.data || err.message);
            alert("Failed to add to cart");
        } finally {
            setLoading(false);
        }
    };

    /* =========================
       ⚡ BUY IT NOW (NEW)
       ========================= */
    const handleBuyNow = async () => {
        if (!userId) {
            alert("Please login to continue");
            navigate("/login");
            return;
        }

        if (!product) return;

        try {
            setLoading(true);

            await axios.post(`${BASE_URL}/api/cart/add`, {
                userId,
                productId: product._id,
                name: product.name,
                image: mainImage || product.image,
                price: product.price,
                quantity,
            });

            // 👉 Go directly to checkout
            navigate("/checkout");
        } catch (error) {
            console.error("BUY NOW ERROR:", error.response?.data || error.message);
            alert("Unable to process Buy Now");
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
                {/* IMAGE */}
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

                {/* DETAILS */}
                <div>
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-red-500 text-2xl mt-2">
                        ₹{product.price}
                    </p>

                    <p className="text-gray-600 mt-4">
                        {product.description}
                    </p>

                    <div className="flex gap-4 mt-6 items-center">
                        <button
                            className="px-3 py-1 border"
                            onClick={() =>
                                setQuantity((q) => Math.max(1, q - 1))
                            }
                        >
                            −
                        </button>
                        <span>{quantity}</span>
                        <button
                            className="px-3 py-1 border"
                            onClick={() => setQuantity((q) => q + 1)}
                        >
                            +
                        </button>
                    </div>

                    {/* ADD TO CART */}
                    <button
                        onClick={addToCart}
                        disabled={loading}
                        className="mt-6 w-full border border-gray-400 py-3 uppercase tracking-wide"
                    >
                        {loading ? "Processing..." : "Add to Cart"}
                    </button>

                    {/* BUY IT NOW */}
                    <button
                        onClick={handleBuyNow}
                        disabled={loading}
                        className="mt-3 w-full bg-black text-white py-3 uppercase tracking-wide hover:bg-gray-900 transition"
                    >
                        Buy It Now
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
