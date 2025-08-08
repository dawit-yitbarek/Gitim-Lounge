import { useState } from "react";
import { publicApi } from "../components/Api"
import { Loader2 } from "lucide-react";

const Contact = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleInputChange = (e) => {
        setUserData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("")

        try {
            await publicApi.post('/api/user/send-message', { userData });
            setSuccess("Message sent successfully! Thank You for your message.")
        } catch (error) {
            console.error('Error:', error);
            setError(error.response?.data.message || 'Failed to send message. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen px-4 py-12 md:px-8 bg-[#10214b] text-[#ebe7e1]">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4 text-[#d7bd88]">Get In Touch</h2>
                <p className="text-lg text-[#d0c3ba] mb-10">
                    Have a question, suggestion, or just want to say hi? Fill out the form below or reach out directly.
                </p>

                {/* Contact Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#1a2b5c] p-6 rounded-xl shadow-md space-y-5 max-w-xl mx-auto">
                    <div className="flex flex-col text-left">
                        <label className="mb-1 text-[#d0c3ba]">Your Name</label>
                        <input
                            name="name"
                            onChange={handleInputChange}
                            value={userData.name}
                            type="text"
                            placeholder="Enter your name"
                            className="p-3 rounded bg-[#10214b] border border-[#d7bd88] text-[#ebe7e1] focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex flex-col text-left">
                        <label className="mb-1 text-[#d0c3ba]">Your Email</label>
                        <input
                            name="email"
                            onChange={handleInputChange}
                            value={userData.email}
                            type="email"
                            placeholder="Enter your email"
                            className="p-3 rounded bg-[#10214b] border border-[#d7bd88] text-[#ebe7e1] focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex flex-col text-left">
                        <label className="mb-1 text-[#d0c3ba]">Your Message</label>
                        <textarea
                            name="message"
                            onChange={handleInputChange}
                            value={userData.message}
                            rows="5"
                            placeholder="Type your message..."
                            className="p-3 rounded bg-[#10214b] border border-[#d7bd88] text-[#ebe7e1] focus:outline-none"
                            required
                        ></textarea>
                    </div>
                    {error && <p className="text-center text-red-500 text-md">{error}</p>}
                    {success && <p className="text-center text-green-500 text-md">{success}</p>}
                    <button
                        disabled={loading}
                        type="submit"
                        className="text-center bg-[#d7bd88] text-[#10214b] py-3 px-6 rounded hover:bg-[#c7ad77] transition"
                    >
                        {loading ? <Loader2 className="animate-spin h-7 w-7" /> : "Send Message"}
                    </button>
                </form>

                {/* Contact Links */}
                <div className="mt-10 flex flex-col items-center gap-4 text-[#d0c3ba]">
                    <p>Or reach out directly:</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="https://t.me/davidyz17"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#d7bd88] text-[#10214b] px-4 py-2 rounded shadow hover:bg-[#c7ad77] transition"
                        >
                            Telegram
                        </a>
                        <a
                            href="https://www.instagram.com/david_yiz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#d7bd88] text-[#10214b] px-4 py-2 rounded shadow hover:bg-[#c7ad77] transition"
                        >
                            Instagram
                        </a>
                        <a
                            href="mailto:davidyit17@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#d7bd88] text-[#10214b] px-4 py-2 rounded shadow hover:bg-[#c7ad77] transition"
                        >
                            Email
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;