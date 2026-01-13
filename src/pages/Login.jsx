import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/authApi";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser({ email, password });
            localStorage.setItem("user", JSON.stringify(res));
            navigate("/home");
        } catch (err) {
            alert("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fff6f0] to-white">
            <form
                onSubmit={handleLogin}
                className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg"
            >
                <h2 className="text-3xl font-bold text-red-500 mb-6">
                    Login.
                </h2>

                <input
                    type="email"
                    className="w-full mb-4 px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full mb-6 px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-3 rounded-full font-semibold hover:bg-red-600 transition"
                >
                    Log in
                </button>

                <p className="text-center text-sm mt-6 text-gray-600">
                    Don’t have an account?
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-blue-600 ml-1 cursor-pointer"
                    >
                        Sign up
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Login;
