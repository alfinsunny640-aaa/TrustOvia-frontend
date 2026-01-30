import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${id}`).then((res) => {
            setPrice(res.data.price);
            setCategory(res.data.category);
        });
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        await axios.put(
            `http://localhost:5000/api/products/${id}`,
            { price, category },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        navigate("/admin/products");
    };

    return (
        <form onSubmit={handleUpdate} className="p-6 max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border w-full p-2 mb-3"
                placeholder="Price"
            />

            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border w-full p-2 mb-3"
                placeholder="Category"
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Update
            </button>
        </form>
    );
};

export default EditProduct;
