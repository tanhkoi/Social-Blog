import { useEffect, useState } from "react";
import { NavBar, SideBar } from "../../components";
import { Link } from "react-router-dom";

const SavedBlogsPage = () => {
  const [savedBlogs, setSavedBlogs] = useState([]);

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem("savedBlogs")) || [];
    setSavedBlogs(blogs);
  }, []);

  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <header>
        <NavBar />
      </header>
      <main>
        <div className="flex">
          <div className="w-60">
            <SideBar />
          </div>
          <div className="w-full flex-grow ml-4">
            <div className="max-w-[1240px] mx-auto py-[50px] mt-10">
              <h2 className="text-2xl font-bold mb-4">Saved Blogs</h2>
              {savedBlogs.length > 0 ? (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8 px-4">
                  {savedBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="bg-white rounded-xl overflow-hidden drop-shadow-md"
                    >
                      <Link to={`/blog/${blog.id}`}>
                        <img
                          className="h-56 w-full object-cover"
                          src={blog.coverImg}
                          alt="Blog cover"
                        />
                        <div className="p-4">
                          <h3 className="font-bold text-2xl my-1 text-black">
                            {blog.title}
                          </h3>
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
