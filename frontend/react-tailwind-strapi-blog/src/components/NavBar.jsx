import { useState, useEffect } from "react";
import { menu, close, logo } from "../assets";
import { useNavigate, Link } from "react-router-dom";


const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra nếu đã có token trong localStorage
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const profilePicture = localStorage.getItem('profilePicture');
    
    if (token && username) {
      setUser({ username, profilePicture });
    }
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleNavClick = (path) => {
    navigate(path);
    setToggle(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchTerm}`);
    setSearchTerm("");
  };

  const handleLogout = () => {
    // Xóa token và thông tin người dùng khỏi localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('profilePicture');
    setUser(null);
    navigate("/");  // Điều hướng về trang chủ sau khi đăng xuất
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev); // Đổi trạng thái showDropdown khi nhấn vào username
  };

  const handleNewPost = () => {
    navigate("/new-post"); // Điều hướng tới trang tạo bài viết mới
  };

  return (
    <div className="w-full h-[80px] z-10 bg-white drop-shadow-lg fixed">
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

        <div className="flex items-center">
          <ul className="hidden md:flex">
            <button
              className="border-none bg-transparent text-black mr-4"
              onClick={() => handleNavClick("/")}
            >
              Home
            </button>
            <button
              className="border-none bg-transparent text-black mr-4"
              onClick={() => handleNavClick("/about")}
            >
              About
            </button>
            <button
              className="border-none bg-transparent text-black mr-4"
              onClick={() => handleNavClick("/support")}
            >
              Support
            </button>
            <button
              className="border-none bg-transparent text-black mr-4"
              onClick={() => handleNavClick("/platform")}
            >
              Platform
            </button>
            <button
              className="border-none bg-transparent text-black mr-4"
              onClick={() => handleNavClick("/history")}
            >
              History
            </button>
          </ul>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center"
        >
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search blog..."
              className="border border-gray-300 rounded px-4 py-2 pl-10 pr-4"
            />
          </div>
          <button type="submit" className="hidden">
            Search
          </button>
        </form>

        <div className="hidden md:flex sm:mr-10 md:mr-10 relative">
         
          {user && (
            <button
              onClick={handleNewPost}
              className="border-none bg-blue-500 text-white px-6 py-3 rounded-full ml-4"
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
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                <span>{user.username}</span>
              </div>

              {showDropdown && (
                <div   className="absolute right-0 mt-12 w-48 bg-blue-600 text-white rounded-lg shadow-lg z-20 transform translate-x-4">
                  <button
                    onClick={() => navigate("/profile")}
                    className="block px-4 py-2 text-left w-full hover:bg-blue-700"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => navigate("/account-detail")}
                    className="block px-4 py-2 text-left w-full hover:bg-blue-700"
                  >
                    Account Detail
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-left w-full hover:bg-blue-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                className="border-none bg-transparent text-black mr-4"
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