import { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        // 🔐 Protect route
        if (!user) {
            navigate("/login");
            return;
        }

        // 📦 Fetch products
        getProducts()
            .then(setProducts)
            .catch(() => {
                alert("Failed to load products");
            });
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 🔹 NAVBAR */}
            <Navbar />

            {/* 🔹 CONTENT */}
            <div className="max-w-7xl mx-auto px-4 py-6">

                {/* 👋 WELCOME */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">
                        Welcome, <span className="text-red-500">{user?.user?.name}</span>
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
                                className="bg-white rounded-lg border shadow-sm hover:shadow-lg transition cursor-pointer"
                            >
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-full h-44 object-cover rounded-t-lg"
                                />

                                <div className="p-4">
                                    <h3 className="font-semibold text-lg truncate">
                                        {p.name}
                                    </h3>

                                    <p className="text-red-500 font-bold mt-1">
                                        ₹{p.price}
                                    </p>

                                    <button
                                        className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                                    >
                                        View Product
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
