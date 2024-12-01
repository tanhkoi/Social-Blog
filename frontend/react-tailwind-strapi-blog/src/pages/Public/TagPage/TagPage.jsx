import { useEffect, useState } from "react";
import NavBar from '../../../components/Header/NavBar';
import SideBar from '../../../components/Sidebar/SideBar';
import { Link } from "react-router-dom";
const TagPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories and tags from the API
    fetch("http://localhost:8080/api/posts")
      .then((response) => response.json())
      .then((data) => {
        // Lấy danh sách category từ các bài blog
        const categorySet = new Set();
        const tagSet = new Set();
        data.content.forEach((blog) => {
          if (blog.category) {
            categorySet.add(blog.category); // Giả sử blog có trường category
          }
          if (blog.tags) {
            blog.tags.forEach((tag) => tagSet.add(tag)); // Giả sử blog có trường tags
          }
        });
        setCategories([...categorySet]);
      })
      .catch((error) => console.error("Error fetching data:", error));
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
          </div>
        </div>
      </main>
    </div>
  );
  
};

export default TagPage;
