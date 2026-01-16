import { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [loading, setLoading] = useState(true); // ✅ ADD

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        setLoading(true); // ✅ START LOADING

        getProducts()
            .then((data) => {
                setProducts(data);
            })
            .catch(() => alert("Failed to load products"))
            .finally(() => {
                setLoading(false); // ✅ STOP LOADING
            });
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 🔹 NAVBAR */}
            <Navbar onCartOpen={() => setCartOpen(true)} />

            {/* 🔹 CONTENT */}
            <div className="max-w-7xl mx-auto px-4 py-6">

                {/* 🔄 LOADING STATE */}
                {loading ? (
                    <div className="flex items-center justify-center h-[60vh]">
                        <p className="text-lg font-semibold text-gray-1000">
                            Loading...
                        </p>
                    </div>
                ) : (
                    <>
                        {/* 👋 WELCOME */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold">
                                Welcome,{" "}
                                <span className="text-red-500">
                                    {user?.user?.name}
                                </span>
                            </h1>
                            <p className="text-sm text-gray-600">
                                Browse our latest products
                            </p>
                        </div>

                        {/* 🛍️ PRODUCTS */}
                        {products.length === 0 ? (
                            <p className="text-gray-500">No products available</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {products.map((p) => (
                                    <div
                                        key={p._id}
                                        className="bg-white rounded-lg border shadow-sm hover:shadow-lg transition"
                                    >
                                        <img
                                            src={p.images?.[0] || p.image}
                                            onMouseOver={(e) => {
                                                if (p.images?.[1]) e.currentTarget.src = p.images[1];
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.src = p.images?.[0] || p.image;
                                            }}
                                            alt={p.name}
                                            className="w-full h-44 object-cover rounded-t-lg transition"
                                        />



                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg truncate">
                                                {p.name}
                                            </h3>

                                            <p className="text-red-500 font-bold mt-1">
                                                ₹{p.price}
                                            </p>

                                            <button
                                                onClick={() => navigate(`/product/${p._id}`)}
                                                className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                                            >
                                                View Product
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* 🛒 CART DRAWER */}
            <CartDrawer
                isOpen={cartOpen}
                onClose={() => setCartOpen(false)}
            />
        </div>
    );
}

export default Home;
