// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { menu, close, logo } from "../assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);

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

  return (
    <div className="w-full h-[80px] z-10 bg-white drop-shadow-lg relative">
      <div className="flex justify-between items-center w-full h-full md:max-w-[1240px] m-auto">
        <div className="flex items-center">
          <img
            src={logo}
            alt="logo"
            className="sm:ml-10 ss:ml-10 md:ml-3 opacity-[55%] w-full h-[25px]"
          />
        </div>

        <div className="flex items-center ">
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
              onClick={() => handleNavClick("/pricing")}
            >
              Pricing
            </button>
          </ul>
        </div>

        <div className="hidden md:flex sm:mr-10 md:mr-10">
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

        <div className="md:hidden" onClick={handleClick}>
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
