import { useEffect, useState } from "react";
import NavBar from "../../../components/Header/NavBar";
import SideBar from "../../../components/Sidebar/SideBar";
import { Link } from "react-router-dom";

const TagPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then((response) => response.json())
      .then((data) => {
        const categorySet = new Set();
        data.content.forEach((blog) => {
          if (blog.category) categorySet.add(blog.category);
          if (blog.tags) blog.tags.forEach((tag) => categorySet.add(tag));
        });
        setCategories([...categorySet]);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="bg-white min-h-screen text-black">
      <header>
        <NavBar />
      </header>
      <main>
        <div className="flex">
          <aside className="w-60">
            <SideBar />
          </aside>
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold mb-4 mt-20">Tags</h2>
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <div className="flex flex-col items-center">
                  <svg
                    className="animate-spin h-12 w-12 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  <p className="text-black text-lg mt-3">Loading...</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/category/${category}`}
                    className="text-black px-4 py-2 rounded-full w-1/5 bg-gray-200 hover:bg-gray-300 transition-all"
                  >
                    #{category}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TagPage;
