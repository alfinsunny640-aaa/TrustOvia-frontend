// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import Profile from "./pages/Profile";
// import Cart from "./pages/Cart";
// import ProductDetails from "./pages/ProductDetails";


// function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<Login />} />   {/* FIRST */}
//                 <Route path="/signup" element={<Signup />} />   {/* FIRST */}
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/home" element={<Home />} />
//                 <Route path="/profile" element={<Profile />} />
//                 <Route path="/cart" element={<Cart />} />
//                 <Route path="/product/:id" element={<ProductDetails />} />
//                 <Route path="/order-success/:orderId" element={<OrderSuccess />} />
//                 <Route path="/orders" element={<Orders />} />
//                 <Route path="/orders/:orderId" element={<OrderDetails />} />


//                 {/* SAFETY */}
//                 <Route path="*" element={<Navigate to="/" />} />

//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;

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


function App() {
    const isLoggedIn = !!localStorage.getItem("userId");

    return (
        <BrowserRouter>
            <Routes>

                {/* AUTH */}
                <Route
                    path="/"
                    element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* MAIN */}
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<ProductDetails />} />

                {/* ORDERS */}
                <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:orderId" element={<OrderDetails />} />

                {/* CHECKOUT */}
                <Route path="/checkout" element={<Checkout />} />


                {/* SAFETY */}
                <Route path="*" element={<Navigate to="/" />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;

