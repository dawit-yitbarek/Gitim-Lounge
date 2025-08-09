import { useState } from "react";
import { publicApi } from "../components/Api";
import { useNavigate } from "react-router-dom";
import ShowPassword from "./ShowPassword";
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)


    const handleSendCode = async (e) => {
        e.preventDefault();
        try {
            setMessage("")
            setError("")
            setLoading(true);
            await publicApi.post(`${BackEndUrl}/api/auth/send-reset-code`, { email });
            setMessage("Verification code sent to your email. If you don't see it, check your spam folder. It's valid for 10 minutes.");
            setStep("verify");
        } catch (err) {
            setError(err.response?.data.message || "Failed to send code. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            if (newPassword.trim().length < 8) {
                setError("Password must be at least 8 characters long.");
                return;
            }
            setMessage("")
            setError("");
            setLoading(true);
            const response = await publicApi.put(`${BackEndUrl}/api/auth/reset-password`, {
                email,
                code,
                newPassword,
            });
            setMessage("Password has been successfully reset.");
            localStorage.setItem("accessToken", response.data.accessToken);
            window.location.href = "/"
        } catch (err) {
            setError(err.response?.data.message || "Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full space-y-6">
            <h2 className="text-2xl font-semibold text-center text-[#10214b]">
                Reset Your Password
            </h2>

            {message && <p className="text-md font-semibold text-center text-[#10214b]">{message}</p>}
            {error && <p className="text-md text-center text-red-500">{error}</p>}


            {step === "email" && (
                <form onSubmit={handleSendCode} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d7bd88]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#d7bd88] text-[#10214b] font-bold py-2 rounded hover:bg-[#c4ab70] transition"
                    >
                        {loading ? "Sending..." : "Send Code"}
                    </button>
                </form>
            )}

            {step === "verify" && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Verification Code
                        </label>
                        <input
                            type="number"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d7bd88]"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d7bd88]"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <ShowPassword showPassword={showPassword} setShowPassword={setShowPassword} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#10214b] text-white font-bold py-2 rounded hover:bg-[#00103a] transition"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            )}
        </div>
    );
}