import PropTypes from 'prop-types'; 
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsJustify } from 'react-icons/bs';
import '../../App.css'; 
import { useState } from "react";
import { useNavigate  } from "react-router-dom";


const Header = ({ OpenSidebar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchTerm}`);
    setSearchTerm("");
  };
  return (
    <header className=' header'>
        <div className=' menu-icon'>
            <BsJustify className=' icon' onClick={OpenSidebar} />
        </div>
        <div className='. header-left'>
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center"
        >
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-black rounded px-4 py-2 pl-10 pr-4 bg-[#1d2634] text-white"
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
        </div>
        <div className=' header-right'>
            <BsFillBellFill className=' icon' />
            <BsFillEnvelopeFill className=' icon' />
            <BsPersonCircle className=' icon' />
        </div>
    </header>
  );
}

Header.propTypes = {
  OpenSidebar: PropTypes.func.isRequired,
};

export default Header;
