import { useState } from "react";
import { NavBar, BlogContent, SideBar } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const BlogContentPage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Trạng thái kiểm soát Sidebar

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
              className="bg-white text-gray-800 rounded px-2 py-1 text-sm  fixed "
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            >
              {isSidebarVisible ? (
                <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
              ) : (
                <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
              )}
            </button>
          </div>
          {/* BlogContent tự động mở rộng khi Sidebar ẩn */}
          <div className={`flex-grow ${isSidebarVisible ? "ml-4" : ""}`}>
            <BlogContent />
          </div>
        </div>
      </main>

      {/* <footer>
        <Footer />
      </footer> */}
      {/* <Footer /> */}
    </div>
  );
};

export default BlogContentPage;
