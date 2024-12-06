import PropTypes from "prop-types";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsJustify,
} from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        height: "60px",
        boxShadow: "0 6px 7px -3px rgba(0, 0, 0, 0.35)",
        borderTop: "2px solid rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        borderRadius: "8px",
      }}
    >
      <div style={{ cursor: "pointer" }}>
        <BsJustify
          onClick={OpenSidebar}
          style={{ fontSize: "20px", marginRight: "5px" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <form
          onSubmit={handleSearchSubmit}
          style={{ display: "flex", alignItems: "center", marginRight: "20px" }}
        >
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                padding: "8px 40px 8px 10px",
                color: "white",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "gray",
              }}
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 451 451"
                style={{ width: "20px", height: "20px" }}
              >
                <path d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3 s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4 C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3 s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z" />
              </svg>
            </span>
          </div>
        </form>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <BsFillBellFill style={{ fontSize: "20px" }} />
        <BsFillEnvelopeFill style={{ fontSize: "20px" }} />
        <BsPersonCircle style={{ fontSize: "20px" }} />
      </div>
    </header>
  );
};

Header.propTypes = {
  OpenSidebar: PropTypes.func.isRequired,
};

export default Header;
