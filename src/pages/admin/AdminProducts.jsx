import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    // 🔄 Fetch all products
    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    // ❌ DELETE PRODUCT (ADMIN)
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove deleted product from UI
            setProducts(products.filter((p) => p._id !== id));
        } catch (error) {
            console.error("Error deleting product", error);
            alert("Failed to delete product");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Products</h1>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 border">Image</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Price</th>
                            <th className="p-2 border">Category</th>
                            <th className="p-2 border">Created By</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center p-4">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            products.map((p) => (
                                <tr key={p._id} className="text-center border">
                                    <td className="p-2 border">
                                        <img
                                            src={p.images?.[0]}
                                            alt={p.name}
                                            className="w-16 h-16 object-cover mx-auto rounded"
                                        />
                                    </td>
                                    <td className="p-2 border">{p.name}</td>
                                    <td className="p-2 border">₹{p.price}</td>
                                    <td className="p-2 border">{p.category}</td>
                                    <td className="p-2 border">
                                        {p.createdBy?.name || "Admin"}
                                    </td>
                                    <td className="p-2 border">
                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            className="text-red-600 mr-4 hover:underline"
                                        >
                                            Delete
                                        </button>

                                        <button
                                            onClick={() =>
                                                navigate(`/admin/products/edit/${p._id}`)
                                            }
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;
