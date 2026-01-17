import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/authApi";
import { Eye, EyeOff } from "lucide-react";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser({ email, password });

            localStorage.setItem(
                "user",
                JSON.stringify({
                    user: {
                        _id: res.user.id,
                        ...res.user,
                    },
                })
            );
            localStorage.setItem("userId", res.user.id);

            navigate("/home");
        } catch (err) {
            console.error("LOGIN ERROR:", err.response?.data || err.message);
            alert("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gradient-to-b from-[#fff6f0] to-white">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg"
            >
                <h2 className="text-2xl sm:text-3xl font-bold text-red-500 mb-6 text-center sm:text-left">
                    Welcome back
                </h2>

                {/* EMAIL */}
                <input
                    type="email"
                    className="w-full mb-4 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none text-sm sm:text-base"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* PASSWORD */}
                <div className="relative mb-6">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none pr-12 text-sm sm:text-base"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                        aria-label="Toggle password visibility"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-3 rounded-full font-semibold hover:bg-red-600 transition active:scale-[0.98]"
                >
                    Log in
                </button>

                <p className="text-center text-sm mt-6 text-gray-600">
                    Don’t have an account?
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-blue-600 ml-1 cursor-pointer hover:underline"
                    >
                        Sign up
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Login;
