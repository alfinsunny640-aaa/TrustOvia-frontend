import { useState } from "react";
import { signupUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // REGEX
    const nameRegex = /^[A-Za-z ]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("All fields are required");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        if (!nameRegex.test(name)) {
            setError("Name must contain only letters and be at least 3 characters");
            return;
        }

        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!passwordRegex.test(password)) {
            setError(
                "Password must be at least 6 characters and contain letters and numbers"
            );
            return;
        }

        setError("");

        try {
            await signupUser({ name, email, password });
            alert("Signup successful");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fff6f0] to-white">
            <form
                onSubmit={handleSignup}
                className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg"
            >
                <h2 className="text-3xl font-bold text-red-500 mb-6">
                    Signup.
                </h2>

                {error && (
                    <p className="mb-4 text-sm text-red-500 text-center">
                        {error}
                    </p>
                )}

                <input
                    className="w-full mb-4 px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="w-full mb-4 px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* PASSWORD WITH EYE ICON */}
                <div className="relative mb-6">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400 outline-none pr-12"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-3 rounded-full font-semibold hover:bg-red-600 transition"
                >
                    Sign up
                </button>

                <p className="text-center text-sm mt-6 text-gray-600">
                    Already have an account?
                    <span
                        onClick={() => navigate("/login")}
                        className="text-blue-600 ml-1 cursor-pointer"
                    >
                        Log in
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Signup;
