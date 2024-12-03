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
    <div className="bg-[#0E1217] min-h-screen text-white">
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
                <p className="text-white text-lg">Loading...</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/category/${category}`}
                    className="bg-gray-700 text-white px-4 py-2 rounded-full w-1/5"
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
