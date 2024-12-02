/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { menu, close, logo } from "../../assets";
import { useNavigate, Link } from "react-router-dom";
import SearchResults from "./SearchResults";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Thêm ref cho dropdown

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const profilePicture = localStorage.getItem("profilePicture");
    const userId = localStorage.getItem("userId");
    if (token && username) {
      setUser({ username, profilePicture,userId });
    } else {
      setUser(null);
    }
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/register");
  };

  const handleNavClick = (path) => {
    navigate(path);
    setToggle(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("savedPosts");
    localStorage.removeItem("username");
    localStorage.removeItem("profilePicture");
    localStorage.removeItem('userId');
    setUser(null);
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleNewPost = () => {
    navigate("/newpost");
  };

  // useEffect để ẩn dropdown khi nhấn ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Ẩn dropdown khi nhấn ra ngoài
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-[80px] z-10 bg-[#0E1217] text-white drop-shadow-lg fixed border-b border-gray-600">
      <div className="flex justify-between items-center w-full h-full md:max-w-[1240px] m-auto">
        <div className="flex items-center">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="sm:ml-10 ss:ml-10 md:ml-3 opacity-[55%] w-full h-[25px]"
            />
          </Link>
        </div>
        <div className="flex items-center text-white">
          <ul className="hidden md:flex">
            <button
              className="border-none bg-transparent mr-4"
              onClick={() => handleNavClick("/")}
            >
              Home
            </button>
            <button
              className="border-none bg-transparent mr-4"
              onClick={() => handleNavClick("/about")}
            >
              About
            </button>
            <button
              className="border-none bg-transparent  mr-4"
              onClick={() => handleNavClick("/support")}
            >
              Support
            </button>
            <button
              className="border-none bg-transparent  mr-4"
              onClick={() => handleNavClick("/saved")}
            >
              Bookmarks
            </button>
            <button
              className="border-none bg-transparent  mr-4"
              onClick={() => handleNavClick("/history")}
            >
              History
            </button>
          </ul>
        </div>
        <SearchResults />
        <div className="hidden md:flex sm:mr-10 md:mr-10 relative">
          {user && (
            <button
              onClick={handleNewPost}
              className="border-none bg-white text-black px-6 py-3 rounded-full ml-4"
            >
              New Post
            </button>
          )}
          {user ? (
            <>
              <div
                className="flex items-center ml-10 cursor-pointer"
                onClick={toggleDropdown}
              >
                {user.profilePicture && (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-8 h-8 rounded-lg mr-2"
                  />
                )}
                <span>{user.username}</span>
              </div>
              {showDropdown && (
                <div
                  ref={dropdownRef} // Gán ref vào dropdown
                  className="absolute right-0 mt-12 w-40 rounded-xl bg-[#0E1217] border border-gray-600 shadow-lg z-20 transform translate-x-6"
                >
                  <button
                    onClick={() => navigate(`/profile/${user.userId}`)} 
                    className="block px-4 py-2 text-left w-full rounded-xl bg-[#0E1217] text-white border-[#0E1217] hover:bg-[#0E1217]"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => navigate("/account")}
                    className="block px-4 py-2 text-left w-full  bg-[#0E1217] text-white border-[#0E1217] hover:bg-[#0E1217]"
                  >
                    Account Detail
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-left w-full rounded-xl bg-[#0E1217] text-white border-[#0E1217] hover:bg-[#0E1217]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                className="border-none bg-transparent text-white mr-4"
                onClick={handleLoginClick}
              >
                Login
              </button>
              <button className="px-8 py-3" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </>
          )}
        </div>
        <div className="md:hidden" onClick={() => setToggle(!toggle)}>
          <img
            src={!toggle ? menu : close}
            alt="menu"
            className="w-[28px] h-[28px] object-contain mr-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
