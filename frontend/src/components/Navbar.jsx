import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { protectedApi } from "./Api";
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authorized, setAuthorized] = useState(null);
  const [userId, setUserId] = useState(null);
  const [imageUrl, setImageUrl] = useState("/images/hero5.png");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await protectedApi.get(`${BackEndUrl}/api/user`);
        const user = response.data.user
        setUserId(user.id);
        setImageUrl(user.profile_image);
        setAuthorized(true);
      } catch (error) {
        setAuthorized(false);
        console.log("Error on getUser function ", error)
      };
    };

    getUser();
  }, [])


  return (
    <nav className="bg-[#10214b] text-[#ebe7e1] px-6 py-4 shadow-md sticky top-0 z-50 font-body">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className="font-ethiopic font-extrabold text-xl md:text-2xl tracking-wide text-[#d7bd88]">
          <Link to={"/"} onClick={() => setIsMenuOpen(false)}> ግጥም  <span className="font-heading">Lounge</span> </Link>
        </h1>

        {/* Desktop Navigation */}
        <div className="md:flex items-center justify-between gap-5">
          <ul className="hidden md:flex space-x-6 text-sm font-medium">
            <li className="hover:text-[#d7bd88] cursor-pointer transition"><Link to={"/"}>Home</Link></li>
            <li className="hover:text-[#d7bd88] cursor-pointer transition"><Link to={"/collection"}>Collection</Link></li>
            <li className="hover:text-[#d7bd88] cursor-pointer transition"><Link to={"/about"}>About</Link></li>
            <li className="hover:text-[#d7bd88] cursor-pointer transition"><Link to={"/contact"}>Contact</Link></li>
          </ul>

          {authorized && (
            <div className="flex items-center gap-3 hidden md:block">
              <Link to={`/profile`} className="transition">
                <img src={imageUrl} alt="Profile" className="w-10 h-10 rounded-full border-2 border-[#d7bd88]" />
              </Link>
            </div>
          )}

          {authorized === false &&
            <button
              onClick={() => navigate('/auth')}
              className="bg-[#d7bd88] text-[#10214b] px-4 py-2 rounded-md font-semibold hover:bg-[#c7ab75] transition hidden md:block">
              Sign In
            </button>
          }

        </div>

        {/* Desktop Sign In */}


        {/* Mobile Menu Toggle */}
        <div
          className="flex gap-4 md:hidden text-3xl cursor-pointer"
        >
          {authorized && (
            <div className="flex items-center gap-3">
              <Link to={`/profile`} onClick={() => setIsMenuOpen(false)} className="cursor-pointer transition">
                <img src={imageUrl} alt="Profile" className="w-8 h-8 rounded-full border-2 border-[#d7bd88]" />
              </Link>
            </div>
          )}
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </div>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-4 space-y-3 text-sm font-medium">
          <div className="flex flex-col gap-3">
            <Link onClick={() => setIsMenuOpen(false)} to={"/"} className="hover:text-[#d7bd88] cursor-pointer transition">Home</Link>
            <Link onClick={() => setIsMenuOpen(false)} to={"/collection"} className="hover:text-[#d7bd88] cursor-pointer transition">Collection</Link>
            <Link onClick={() => setIsMenuOpen(false)} to={"/about"} className="hover:text-[#d7bd88] cursor-pointer transition">About</Link>
            <Link onClick={() => setIsMenuOpen(false)} to={"/contact"} className="hover:text-[#d7bd88] cursor-pointer transition">Contact</Link>
          </div>

          {authorized === false &&
            <button
              onClick={() => {
                navigate('/auth');
                setIsMenuOpen(false);
              }}
              className="bg-[#d7bd88] text-[#10214b] px-4 py-2 rounded-md font-semibold hover:bg-[#c7ab75] transition w-fit mt-2">
              Sign In
            </button>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
