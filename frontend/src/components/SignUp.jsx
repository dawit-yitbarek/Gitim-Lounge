import { useState } from "react";
import { publicApi } from "../components/Api";
import { Loader2 } from "lucide-react";
import ShowPassword from "./ShowPassword";
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function SignUp({ toggleForm, signUpSuccess, setUserName }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("");
    const [step, setStep] = useState("signup");
    const [enteredCode, setEnteredCode] = useState("");
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [verifyError, setVerifyError] = useState("")
    const [message, setMessage] = useState("");


    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (formData.password.trim().length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }
        try {
            setLoading(true);
            setMessage("")
            setError("");
            await publicApi.post(`${BackEndUrl}/api/auth/register`, formData);
            setMessage(`A 6-digit code has been sent to your email ${formData.email}. If you don't see it, check your spam folder. It's valid for 10 minutes.`);
            setStep("verify");
        } catch (error) {
            setError(error.response?.data.message || "Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            setVerifyLoading(true);
            setVerifyError("");
            const response = await publicApi.post(`${BackEndUrl}/api/auth/verify-code`, { email: formData.email, code: enteredCode });
            localStorage.setItem("accessToken", response.data.accessToken);
            signUpSuccess(true)
            setUserName(formData.name)
        } catch (error) {
            setVerifyError(error.response?.data.message || "Something went wrong. Please try again.")
        } finally {
            setVerifyLoading(false)
        }
    }

    return (
        <div className={`bg-[#ebe7e1] rounded-2xl shadow-lg overflow-hidden w-full max-w-4xl grid grid-cols-1 ${step === "signup" && "md:grid-cols-2"}`}>
            {/* Left Section */}
            {step !== "verify" && <div className="bg-[#d7bd88] text-[#10214b] flex flex-col justify-center items-center py-12 px-8">
                <h2 className="text-3xl font-bold mb-4">
                    Join Our Poem Station
                </h2>
                <p className="text-center mb-6">
                    Create your account and inspire the world.
                </p>
                <button
                    className="mt-4 px-6 py-2 border border-[#10214b] text-[#10214b] hover:bg-[#10214b] hover:text-white transition duration-300 rounded"
                    onClick={toggleForm}
                >
                    Already have an account? Sign In
                </button>
            </div>}


            {/* Right Section */}
            <div className="bg-white px-8 py-12 flex items-center justify-center">
                {step === "signup" ? (
                    <form onSubmit={handleSignUp} className="w-full max-w-sm space-y-4">
                        <h3 className="text-2xl font-semibold text-[#10214b] mb-4">Sign Up</h3>
                        <input
                            name="name"
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-4 py-2 border rounded bg-[#ebe7e1] focus:outline-none"
                            onChange={handleChange}
                            required
                        />
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
                        {error && <p className="text-center font-bold text-red-500">{error}</p>}
                        <button
                            disabled={loading}
                            type="submit"
                            className="flex items-center justify-center w-full bg-[#d7bd88] text-[#10214b] font-bold py-2 rounded hover:bg-[#c4ab70] transition"
                        >
                            {!loading ? "Sign Up" : <Loader2 className="animate-spin h-7 w-7" />}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerify} className="w-full max-w-sm space-y-4">
                        <h3 className="text-2xl text-center font-semibold text-[#10214b] mb-4">Verify Code</h3>

                        {message && <p className="text-md font-semibold text-center text-[#10214b]">{message}</p>}

                        <input
                            name="code"
                            type="text"
                            placeholder="Enter your 6-digit code"
                            maxLength="6"
                            className="w-full px-4 py-2 border rounded bg-[#ebe7e1] focus:outline-none tracking-widest text-center"
                            value={enteredCode}
                            onChange={(e) => setEnteredCode(e.target.value)}
                            required
                        />
                        {verifyError && <p className="text-center font-bold text-red-500">{verifyError}</p>}
                        <button
                            type="submit"
                            className="flex items-center justify-center w-full bg-[#d7bd88] text-[#10214b] font-bold py-2 rounded hover:bg-[#c4ab70] transition"
                        >
                            {!verifyLoading ? "Verify Code" : <Loader2 className="animate-spin h-7 w-7" />}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}