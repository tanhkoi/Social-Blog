import { useEffect, useState } from "react";
import  NavBar  from "../../../components/Header/NavBar";
import  SideBar  from "../../../components/Sidebar/SideBar";
import Blogs  from "../../../components/Blog/Blogs";

const Homepage = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");
    if (loginSuccess === "true") {
      setShowMessage(true);
      localStorage.removeItem("loginSuccess"); 
    }
  }, []);

  return (
    <div>
      <header>
        <NavBar setSearchTerm={setSearchTerm} />
      </header>
      <main>
        <div className="flex ">
          <div className="w-60">
            <SideBar />
          </div>
          <div className={`w-full bg-[#0E1217] flex-grow ml-4 p-5 px-10`}>
            {showMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                Login successfully!
              </div>
            )}
            <Blogs searchTerm={searchTerm} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
