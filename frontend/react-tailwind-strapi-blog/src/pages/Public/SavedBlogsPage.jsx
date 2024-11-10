import { useEffect, useState } from "react";
import { NavBar, SideBar } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SavedBlogsPage = () => {
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem("savedBlogs")) || [];
    setSavedBlogs(blogs);
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
            <div className="max-w-[1240px] mx-auto py-[50px] mt-10">
              <h2 className="text-2xl font-bold mb-4">Saved Blogs</h2>
              {savedBlogs.length > 0 ? (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8 px-4 text-black">
                  {savedBlogs.map((blog) => (
                    <div key={blog.id} className="bg-white rounded-xl overflow-hidden drop-shadow-md">
                      <Link to={`/blog/${blog.id}`}>
                        <img className="h-56 w-full object-cover" src={blog.coverImg} alt="Blog cover" />
                        <div className="p-4">
                          <h3 className="font-bold text-2xl my-1">{blog.title}</h3>
                          <p className="text-gray-600 text-xl">{blog.desc}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No saved blogs yet.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SavedBlogsPage;
