import { Link } from "react-router-dom";
import { FaTelegramPlane, FaEnvelope, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-[#0d1b2a] text-[#d0c3ba] px-6 sm:px-10 py-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center sm:text-left">

                {/* Brand and Vision */}
                <div>
                    <h2 className="text-[#d7bd88] text-2xl font-bold mb-4">ግጥም Lounge</h2>
                    <p className="text-sm leading-relaxed">
                        A poetic sanctuary for everyone. Read and publish Ethiopian poetry,
                        connect with writers, and celebrate the power of words.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-[#d7bd88] text-lg font-semibold mb-4">Explore</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="/" className="hover:text-[#d7bd88] transition-colors duration-300">Home</a>
                        </li>
                        <li>
                            <a href="/collection" className="hover:text-[#d7bd88] transition-colors duration-300">Poems</a>
                        </li>
                        <li>
                            <a href="/profile#poemForm" className="hover:text-[#d7bd88] transition-colors duration-300">Publish Your Poem</a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-[#d7bd88] transition-colors duration-300">About</a>
                        </li>
                        <li>
                            <a href="/auth?type=signup" className="hover:text-[#d7bd88] transition-colors duration-300">Sign Up</a>
                        </li>
                        <li>
                            <a href="/auth" className="hover:text-[#d7bd88] transition-colors duration-300">Login</a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-[#d7bd88] text-lg font-semibold mb-4">Get in Touch</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-3"><FaEnvelope size={20} className="text-[#d7bd88]" /> <a href="mailto:davidyit17@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#d7bd88]">davidyit17@gmail.com</a></li>
                        <li className="flex items-center gap-3"><FaTelegramPlane size={20} className="text-[#d7bd88]" /> <a href="https://t.me/davidyz17" target="_blank" rel="noopener noreferrer" className="hover:text-[#d7bd88]">@davidyz17</a></li>
                        <li className="flex items-center gap-3"><FaInstagram size={20} className="text-[#d7bd88]" /> <a href="https://www.instagram.com/david_yiz" target="_blank" rel="noopener noreferrer" className="hover:text-[#d7bd88]">@david_yiz</a></li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-12 border-t border-[#d0c3ba]/30 pt-6 text-center text-sm text-[#d0c3ba] space-y-1">
                <p>© {new Date().getFullYear()} ግጥም Lounge. All rights reserved.</p>
                <p>
                    Developed by{" "}
                    <a
                        href="https://www.daviddeveloper.site"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#d7bd88] hover:underline"
                    >
                        Dawit
                    </a>
                </p>
            </div>
        </footer>
    );
};