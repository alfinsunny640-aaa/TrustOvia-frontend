import { useState } from "react";

function Profile() {
    const user = JSON.parse(localStorage.getItem("user"))?.user;

    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
    });

    // 🔹 Open add form
    const openAdd = () => {
        setEditingId(null);
        setForm({
            name: "",
            phone: "",
            addressLine: "",
            city: "",
            state: "",
            pincode: "",
            country: "India",
        });
        setShowForm(true);
    };

    // 🔹 Open edit form
    const openEdit = (addr) => {
        setEditingId(addr.id);
        setForm(addr);
        setShowForm(true);
    };

    // 🔹 Save address
    const saveAddress = () => {
        if (!form.name || !form.phone || !form.addressLine) {
            alert("Please fill required fields");
            return;
        }

        if (editingId) {
            setAddresses((prev) =>
                prev.map((a) => (a.id === editingId ? { ...form, id: editingId } : a))
            );
        } else {
            setAddresses((prev) => [
                ...prev,
                { ...form, id: Date.now().toString(), isDefault: prev.length === 0 },
            ]);
        }

        setShowForm(false);
    };

    // 🔹 Delete
    const deleteAddress = (id) => {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
    };

    // 🔹 Set default
    const setDefault = (id) => {
        setAddresses((prev) =>
            prev.map((a) => ({ ...a, isDefault: a.id === id }))
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* 👤 PROFILE CARD */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-bold mb-4">Profile</h2>
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-gray-600 text-sm">{user?.email}</p>
                </div>

                {/* 📦 ADDRESSES */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Addresses</h2>
                        <button
                            onClick={openAdd}
                            className="text-blue-600 font-medium"
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
                                key={a.id}
                                className={`border rounded-lg p-4 relative ${a.isDefault ? "border-green-500" : ""
                                    }`}
                            >
                                {a.isDefault && (
                                    <span className="absolute top-2 right-2 text-xs text-green-600 font-semibold">
                                        Default
                                    </span>
                                )}

                                <p className="font-semibold">{a.name}</p>
                                <p className="text-sm">{a.addressLine}</p>
                                <p className="text-sm">
                                    {a.city}, {a.state} - {a.pincode}
                                </p>
                                <p className="text-sm">{a.country}</p>
                                <p className="text-sm mt-1">📞 {a.phone}</p>

                                <div className="flex gap-4 text-sm mt-4">
                                    <button
                                        onClick={() => openEdit(a)}
                                        className="text-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteAddress(a.id)}
                                        className="text-red-500"
                                    >
                                        Delete
                                    </button>
                                    {!a.isDefault && (
                                        <button
                                            onClick={() => setDefault(a.id)}
                                            className="text-green-600"
                                        >
                                            Set default
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ➕ ADD / EDIT MODAL */}
            {showForm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md p-6 rounded-xl">
                        <h3 className="text-lg font-bold mb-4">
                            {editingId ? "Edit Address" : "Add Address"}
                        </h3>

                        {["name", "phone", "addressLine", "city", "state", "pincode"].map(
                            (field) => (
                                <input
                                    key={field}
                                    placeholder={field}
                                    value={form[field]}
                                    onChange={(e) =>
                                        setForm({ ...form, [field]: e.target.value })
                                    }
                                    className="w-full mb-3 px-3 py-2 border rounded"
                                />
                            )
                        )}

                        <div className="flex justify-end gap-3 mt-4">
                            <button onClick={() => setShowForm(false)}>Cancel</button>
                            <button
                                onClick={saveAddress}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
