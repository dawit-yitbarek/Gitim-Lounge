import { useState } from "react";
import { protectedApi } from "../components/Api";
import ProfileCard from "../components/ProfileCard";
import Mypoems from "../components/Mypoems";
import PoemForm from "../components/PoemForm";

const ProfilePage = () => {
    const [feedback, setFeedback] = useState("")
    const [sendFeedbackLoad, setSendFeedbackLoad] = useState(false)
    const [sendFeedbackError, setSendFeedbackError] = useState("")
    const [sendFeedbackSuccess, setSendFeedbackSuccess] = useState("")



    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        window.location.href = "/";
    };

    const handleFeedbackPost = async (e) => {
        e.preventDefault();
        try {
            setSendFeedbackLoad(true)
            setSendFeedbackError("")
            setSendFeedbackSuccess("")
            await protectedApi.post("/api/feedback", { message: feedback })
            setFeedback("")
            setSendFeedbackSuccess("Feedback sent successfully! Thank you for your feedback.")
        } catch (error) {
            setSendFeedbackError("Failed to send feedback. please try again.")
        } finally {
            setSendFeedbackLoad(false)
        }
    }



    return (
        <div className="min-h-screen p-6" style={{ backgroundColor: "#10214b" }}>
            <div className="max-w-4xl mx-auto space-y-10">
                {/* Heading */}
                <h1 className="text-4xl font-bold text-center" style={{ color: "#d7bd88" }}>
                    My Profile
                </h1>

                {/* Profile Card */}
                <ProfileCard />

                {/* Poem Form */}
                <PoemForm />

                {/* Poems List */}
                <Mypoems />


                <div className="rounded-xl shadow-lg p-6 space-y-4" style={{ backgroundColor: "#d0c3ba" }}>
                    <h1 className="text-2xl font-bold text-center" style={{ color: "#10214b" }}>
                        Give us your feedback about the platform.
                    </h1>
                    <div className="flex items-center gap-6">
                        <div className="flex-1 space-y-2">
                            <form onSubmit={handleFeedbackPost}>
                                <textarea
                                    required
                                    type="text"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Your Message"
                                    className="w-full p-2 rounded bg-[#ebe7e1] text-[#10214b] placeholder:text-gray-600 outline-none"
                                />

                                {sendFeedbackError && <p className="text-center text-red-500 text-md">{sendFeedbackError}</p>}
                                {sendFeedbackSuccess && <p className="text-center text-green-500 text-md">{sendFeedbackSuccess}</p>}

                                <div className="flex justify-between">
                                    <button
                                        type="submit"
                                        disabled={sendFeedbackLoad}
                                        className="px-4 py-2 mt-2 rounded bg-[#10214b] text-[#d7bd88] font-semibold hover:opacity-90"
                                    >
                                        {sendFeedbackLoad ? "Sending..." : "Save feedback"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


                <button
                    onClick={handleLogout}
                    className="px-4 py-2 mt-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                >
                    Log Out
                </button>

            </div>
        </div>
    );
};

export default ProfilePage;