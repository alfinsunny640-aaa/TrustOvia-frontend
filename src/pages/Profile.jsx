import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} from "../services/addressApi";

function Profile() {


    // const user = JSON.parse(localStorage.getItem("user"));
    // const userId = user?._id || user?.id;

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.user?._id;



    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    const emptyForm = {
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
    };

    const [form, setForm] = useState(emptyForm);

    /* ===============================
       🔹 FETCH ADDRESSES
    =============================== */
    const fetchAddresses = async () => {


        if (!userId) {
            return;
        }



        try {
            const res = await getAddresses(userId);

            setAddresses(res.data);
        } catch (err) {
            console.error("❌ Failed to fetch addresses:", err);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [userId]);

    /* ===============================
       🔹 SAVE ADDRESS
    =============================== */
    const saveAddress = async () => {
        if (!form.fullName || !form.phone || !form.addressLine) {
            alert("Please fill required fields");
            return;
        }

        try {
            setLoading(true);

            if (editingId) {
                await updateAddress(editingId, form);
            } else {
                const res = await addAddress(userId, form);

            }

            await fetchAddresses();
            setShowForm(false);
            setEditingId(null);
            setForm(emptyForm);
        } catch (err) {
            console.error("Save address failed", err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    /* ===============================
       🔹 DELETE
    =============================== */
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this address?")) return;
        await deleteAddress(id);
        await fetchAddresses();
    };

    /* ===============================
       🔹 SET DEFAULT
    =============================== */
    const handleDefault = async (id) => {
        await setDefaultAddress(id);
        await fetchAddresses();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto p-6 space-y-8">
                {/* PROFILE */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-bold mb-4">Profile</h2>
                    {/* <p className="font-semibold">{user?.name}</p>
                    <p className="text-gray-600 text-sm">{user?.email}</p> */}
                    <p className="font-semibold">{storedUser?.user?.name}</p>
                    <p className="text-gray-600 text-sm">{storedUser?.user?.email}</p>

                </div>

                {/* ADDRESSES */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Addresses</h2>
                        <button
                            onClick={() => {
                                setForm(emptyForm);
                                setEditingId(null);
                                setShowForm(true);
                            }}
                            className="text-blue-600"
                        >
                            + Add
                        </button>
                    </div>

                    {addresses.length === 0 && (
                        <p className="text-gray-500 text-sm">No addresses added</p>
                    )}

                    <div className="grid gap-4 md:grid-cols-2">
                        {addresses.map((a) => (
                            <div
                                key={a._id}
                                className={`border rounded-lg p-4 ${a.isDefault ? "border-green-500" : ""
                                    }`}
                            >
                                <p className="font-semibold">{a.fullName}</p>
                                <p>{a.addressLine}</p>
                                <p>
                                    {a.city}, {a.state} - {a.pincode}
                                </p>
                                <p>{a.country}</p>
                                <p>📞 {a.phone}</p>

                                <div className="flex gap-3 mt-3 text-sm">
                                    <button
                                        onClick={() => {
                                            setEditingId(a._id);
                                            setForm({
                                                fullName: a.fullName,
                                                phone: a.phone,
                                                addressLine: a.addressLine,
                                                city: a.city,
                                                state: a.state,
                                                pincode: a.pincode,
                                                country: a.country,
                                            });
                                            setShowForm(true);
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button onClick={() => handleDelete(a._id)}>Delete</button>

                                    {!a.isDefault && (
                                        <button onClick={() => handleDefault(a._id)}>
                                            Set default
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {showForm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <h3 className="font-bold mb-4">
                            {editingId ? "Edit Address" : "Add Address"}
                        </h3>

                        {[
                            { key: "fullName", label: "Full Name" },
                            { key: "phone", label: "Phone" },
                            { key: "addressLine", label: "Address" },
                            { key: "city", label: "City" },
                            { key: "state", label: "State" },
                            { key: "pincode", label: "Pincode" },
                        ].map(({ key, label }) => (
                            <input
                                key={key}
                                placeholder={label}
                                value={form[key]}
                                onChange={(e) =>
                                    setForm({ ...form, [key]: e.target.value })
                                }
                                className="w-full mb-2 border p-2 rounded"
                            />
                        ))}

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowForm(false)}>Cancel</button>
                            <button
                                onClick={saveAddress}
                                disabled={loading}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
