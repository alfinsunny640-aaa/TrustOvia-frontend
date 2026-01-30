import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";

import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Checkout from "./pages/Checkout";

// ADMIN
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import EditProduct from "./pages/admin/EditProduct";

function App() {
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = !!user;
    const isAdmin = user?.role === "admin";

    return (
        <BrowserRouter>
            <Routes>
                {/* ================= AUTH ================= */}
                <Route
                    path="/"
                    element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* ================= USER ================= */}
                <Route
                    path="/home"
                    element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
                />
                <Route
                    path="/profile"
                    element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
                />
                <Route
                    path="/cart"
                    element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
                />
                <Route path="/product/:id" element={<ProductDetails />} />

                {/* ================= ORDERS ================= */}
                <Route
                    path="/orders"
                    element={isLoggedIn ? <Orders /> : <Navigate to="/login" />}
                />
                <Route
                    path="/orders/:orderId"
                    element={isLoggedIn ? <OrderDetails /> : <Navigate to="/login" />}
                />
                <Route
                    path="/order-success/:orderId"
                    element={<OrderSuccess />}
                />

                {/* ================= CHECKOUT ================= */}
                <Route
                    path="/checkout"
                    element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />}
                />

                {/* ================= ADMIN ================= */}
                <Route
                    path="/admin"
                    element={isAdmin ? <AdminLayout /> : <Navigate to="/login" />}
                >
                    <Route
                        path="dashboard"
                        element={<AdminDashboard />}
                    />
                    <Route
                        path="products"
                        element={<AdminProducts />}
                    />
                    <Route
                        path="products/edit/:id"
                        element={<EditProduct />}
                    />
                </Route>

                {/* ================= SAFETY ================= */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
