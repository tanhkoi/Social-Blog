import { useState, useEffect } from "react";
import NavBar from "../../../components/Header/NavBar";
import SideBar from "../../../components/Sidebar/SideBar";
import BlogList from "../../../components/Blog/BlogList";

const PopularPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPopularBlogs = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/posts/most-liked`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch popular posts.");
      }

      const data = await response.json();

      if (data) {
        setBlogs(data.content);
      } else {
        console.error("Dữ liệu không hợp lệ", data);
        setBlogs([]);
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchPopularBlogs();
  }, []);

  return (
    <div className="bg-white min-h-screen text-black">
      <header>
        <NavBar setSearchTerm={setSearchTerm} />
      </header>
      <main className="flex">
        <aside className="w-60">
          <SideBar />
        </aside>
        <section className="flex-1 p-5">
          <h1 className="text-2xl font-bold mb-4 mt-20">Popular Posts</h1>
          {loading ? (
            <div className="flex justify-center items-center mt-10">
              <svg
                className="animate-spin h-8 w-8 text-blue-600"
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
              <p className="ml-3 text-gray-400 text-lg">Loading popular posts...</p>
            </div>
          ) : filteredBlogs.length > 0 ? (
            <BlogList blogs={filteredBlogs} setBlogs={setBlogs} />
          ) : (
            <p className="text-gray-400">No popular posts found.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default PopularPage;
