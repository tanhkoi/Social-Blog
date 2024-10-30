import { useEffect, useState } from "react";
import { NavBar, Blogs, SideBar } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Homepage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("loginSuccess") === "true") {
      setShowMessage(true);
      localStorage.removeItem("loginSuccess");
    }
  }, []); 

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="flex">
          {isSidebarVisible && (
            <div className="w-60">
              <SideBar />
            </div>
          )}
          <div className="inline-flex justify-center items-center h-[480px]">
            <button
              className="bg-white text-gray-800 rounded px-2 py-1 text-sm fixed"
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            >
              {isSidebarVisible ? (
                <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
              ) : (
                <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className={`flex-grow ${isSidebarVisible ? "ml-4" : ""}`}>
            {showMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                Login successfully!
              </div>
            )}
            <Blogs />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;