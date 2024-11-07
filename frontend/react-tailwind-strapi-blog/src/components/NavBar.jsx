import { useState } from "react";
import { menu, close, logo } from "../assets";
import { useNavigate, Link  } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

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
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 451 451"
                className="h-5 w-5"
              >
                <g>
                  <path d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3 s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4 C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3 s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z" />
                </g>
              </svg>
            </span>
          </div>
          <button type="submit" className="hidden">
            Search
          </button>
        </form>

        <div className="hidden md:flex sm:mr-10 md:mr-10">
        <button onClick={() => navigate("/newpost")}>New Post</button>

          <button
            className="border-none bg-transparent text-black mr-4"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button className="px-8 py-3" onClick={handleSignUpClick}>
            Sign Up
          </button>
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
