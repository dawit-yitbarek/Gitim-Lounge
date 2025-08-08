import { useState } from "react";
import { Loader2 } from "lucide-react";
import { publicApi } from "./Api";
import ShowPassword from "./ShowPassword";
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function SignIn({ toggleForm, forgetPassword }) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            setError("")
            const response = await publicApi.post(`${BackEndUrl}/api/auth/login`, formData)
            localStorage.setItem("accessToken", response.data.accessToken);
            window.location.href = "/"
        } catch (error) {
            setError(error.response?.data.message || "Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        };
    };


    return (
        <div className={`bg-[#ebe7e1] rounded-2xl shadow-lg overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2`}>
            {/* Left Section */}
            <div className="bg-[#d7bd88] text-[#10214b] flex flex-col justify-center items-center py-12 px-8">
                <h2 className="text-3xl font-bold mb-4">
                    Welcome Back!
                </h2>
                <p className="text-center mb-6">
                    Sign in to read and share beautiful poetry.
                </p>
                <button
                    className="mt-4 px-6 py-2 border border-[#10214b] text-[#10214b] hover:bg-[#10214b] hover:text-white transition duration-300 rounded"
                    onClick={toggleForm}
                >
                    Don't have an account? Sign Up
                </button>
            </div>

            {/* Right Section */}
            <div className="bg-white px-8 py-12 flex items-center justify-center">
                <form onSubmit={handleSignIn} className="w-full max-w-sm space-y-4">
                    <h3 className="text-2xl font-semibold text-[#10214b] mb-4">Sign In</h3>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded bg-[#ebe7e1] focus:outline-none"
                        onChange={handleChange}
                        required
                    />

                    <div className="relative w-full">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded bg-[#ebe7e1] focus:outline-none"
                            onChange={handleChange}
                            required
                        />
                        <ShowPassword showPassword={showPassword} setShowPassword={setShowPassword} />
                    </div>

                    <button
                        type="button"
                        onClick={() => forgetPassword(true)}
                        className="py-1 text-[#10214b] bg-white">
                        Forget password ?
                    </button>

                    {error && <p className="text-center font-bold text-red-500">{error}</p>}

                    <button
                        type="submit"
                        className="flex items-center justify-center w-full bg-[#d7bd88] text-[#10214b] font-bold py-2 rounded hover:bg-[#c4ab70] transition"
                    >

                        {!loading ?
                            "Sign In"
                            :
                            <Loader2 className="animate-spin h-7 w-7" />}
                    </button>
                </form>
            </div>
        </div>
    );
};