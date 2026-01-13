import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center">

                {/* LOGO */}
                <h1
                    className="text-xl font-bold cursor-pointer"
                    onClick={() => navigate("/home")}
                >
                    Trust Ovia
                </h1>

                {/* DESKTOP MENU */}
                <ul className="hidden md:flex ml-auto gap-6 text-sm font-medium items-center">

                    <li onClick={() => navigate("/home")} className="cursor-pointer hover:text-red-500">
                        Home
                    </li>
                    <li className="cursor-pointer hover:text-red-500">
                        Pricing
                    </li>
                    <li className="cursor-pointer hover:text-red-500">
                        View all Products
                    </li>
                    <li className="cursor-pointer hover:text-red-500">
                        Collections
                    </li>

                    {/* ACCOUNT DROPDOWN */}
                    <li className="relative">
                        <button
                            onClick={() => setAccountOpen(!accountOpen)}
                            className="cursor-pointer hover:text-red-500"
                        >
                            Account / Orders
                        </button>

                        {accountOpen && (
                            <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-lg border z-50">

                                <div className="py-2 text-sm">
                                    <p
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setAccountOpen(false);
                                            navigate("/orders");
                                        }}
                                    >
                                        Orders
                                    </p>

                                    <p
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setAccountOpen(false);
                                            navigate("/profile");
                                        }}
                                    >
                                        Profile
                                    </p>

                                    <p
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                                        onClick={logout}
                                    >
                                        Sign out
                                    </p>
                                </div>
                            </div>
                        )}
                    </li>
                </ul>

                {/* MOBILE MENU BUTTON */}
                <button
                    className="md:hidden ml-auto text-xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
            </div>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="md:hidden mt-4 bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
                    <p onClick={() => navigate("/home")} className="cursor-pointer">Home</p>
                    <p className="cursor-pointer">Pricing</p>
                    <p className="cursor-pointer">View all Products</p>
                    <p className="cursor-pointer">Collections</p>

                    <p
                        className="cursor-pointer font-medium"
                        onClick={() => navigate("/orders")}
                    >
                        Orders
                    </p>

                    <p
                        className="cursor-pointer font-medium"
                        onClick={() => navigate("/profile")}
                    >
                        Profile
                    </p>

                    <button
                        onClick={logout}
                        className="text-red-500 pt-2"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
