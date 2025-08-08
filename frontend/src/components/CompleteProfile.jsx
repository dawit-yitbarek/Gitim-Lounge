import { useState } from "react";
import { protectedApi } from "../components/Api";
import UploadImage from "./UploadImage";
import { UserPlus2, Loader2 } from "lucide-react";
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function CompleteProfile({ userName }) {
    const [imageUrl, setImageUrl] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [imageLoading, setImageLoading] = useState(false);

    const handleProfileComplete = async (e) => {
        e.preventDefault();
        try {
            setError("")
            setLoading(true);
            await protectedApi.put(`${BackEndUrl}/api/user/update-profile`, { imageUrl, name: userName });
            window.location.href = "/";
        } catch (error) {
            console.error("Profile completion failed", error);
            setError(error.response.data.message || "Something went wrong. please try again.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#ebe7e1] rounded-2xl shadow-2xl overflow-hidden w-full max-w-3xl grid grid-cols-1">
            <div className="bg-white px-10 py-12 flex flex-col items-center justify-center space-y-6 text-center">
                <div className="flex items-center space-x-3">
                    <UserPlus2 className="w-8 h-8 text-[#10214b]" />
                    <h2 className="text-3xl font-bold text-[#10214b]">Welcome, {userName}!</h2>
                </div>
                <p className="text-[#3a3a3a] text-sm">
                    One last step! Add a profile picture to personalize your experience.
                </p>

                <form onSubmit={handleProfileComplete} className="flex flex-col items-center w-full space-y-5 mt-4">
                    <UploadImage setImageUrl={(url) => setImageUrl(url)} setLoading={(status) => setImageLoading(status)} showPreview={true} center={true} />
                    <button
                        className="flex justify-center w-52 bg-[#d7bd88] text-[#10214b] font-bold py-2 rounded-full hover:bg-[#c4ab70] transition"
                        type="submit"
                        disabled={loading || !imageUrl || imageLoading}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Upload & Continue"}
                    </button>
                </form>

                {error && <p className="text-center font-bold text-red-500">{error}</p>}

                <button
                    disabled={imageLoading}
                    className="w-52 border border-[#10214b] text-[#10214b] font-bold py-2 rounded-full hover:bg-[#10214b] hover:text-white transition"
                    onClick={() => window.location.href = "/"}
                >
                    Skip for Now
                </button>
            </div>
        </div>
    );
}