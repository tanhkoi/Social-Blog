/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import NavBar from "../../../components/Header/NavBar";
import SideBar from "../../../components/Sidebar/SideBar";
import BlogList from "../../../components/Blog/BlogList";
import TopAuthors from "../../../components/Author/TopAuthors";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [blogs, setBlogs] = useState([]);
  const [mostLikedBlogs, setMostLikedBlogs] = useState([]); // State lưu các bài blog được thích nhiều nhất
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const fetchBlogs = async (page = 1, size = 5) => {
    const token = localStorage.getItem("token");

    setLoading(true); // Bắt đầu trạng thái loading

    try {
      // Lấy tất cả các bài blog
      const response = await fetch(
        `http://localhost:8080/api/posts?size=${size}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBlogs(data.content);
        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
      } else {
        const errorData = await response.json();
        console.error("Lỗi khi lấy danh sách blog:", errorData.message);
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  const fetchMostLikedBlogs = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const mostLikedResponse = await fetch(
        "http://localhost:8080/api/posts/most-liked",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (mostLikedResponse.ok) {
        const mostLikedData = await mostLikedResponse.json();
        setMostLikedBlogs(mostLikedData.content); // Cập nhật bài blog được thích nhiều nhất
      } else {
        const errorData = await mostLikedResponse.json();
        console.error(
          "Lỗi khi lấy bài blog được thích nhiều nhất:",
          errorData.message
        );
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage); // Cập nhật trang hiện tại
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage, pageSize);
  }, [currentPage, pageSize]);

  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");
    if (loginSuccess === "true") {
      setShowMessage(true);
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  useEffect(() => {
    fetchMostLikedBlogs(); // Fetch most liked blogs only once on initial load
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen text-black">
      {/* Header */}
      <header className="fixed text-black top-0 left-0 w-full bg-black z-50">
        <NavBar setSearchTerm={setSearchTerm} />
        resetPage={() => setCurrentPage(0)}
      </header>

      {/* Sidebar and Content */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-900 w-60 z-40">
          <SideBar />
        </aside>

        {/* Main Content */}
        <div className="ml-60 flex-grow">
          {/* Banner Section - only show on the first page */}
          {currentPage === 0 && (
            <div
              className="flex flex-col  justify-center p-6 bg-gradient-to-r from-blue-100 to-white rounded-lg shadow-lg mb-8"
              style={{ width: "auto", height: "auto" }}
            >
              <h1
                className="text-6xl font-bold mb-6 text-start"
                style={{
                  background: "linear-gradient(to right, #1A2D5A, #4CA4D8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Diverse Perspectives of the Young Generation in Vietnam
              </h1>
              <p className="text-4xl font-bold text-zinc-700  text-start">
                Write - Share - Connect - Reflect
                <br />
                All at CWTS
              </p>
            </div>
          )}

          {/* Message Section */}
          {showMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              Login successfully!
            </div>
          )}

          {/* Blog List Section */}
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
              <p className="ml-3 text-gray-400 text-lg">Loading blogs...</p>
            </div>
          ) : (
            <>
              {/* Most Liked Blogs - Only show on the first page */}
              {!loading && currentPage === 0 && (
                <>
                  {/* Most Liked Blogs */}
                  <h2 className="text-3xl font-bold text-black mb-5 px-10">
                    POPULAR BLOG
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 px-10">
                    {mostLikedBlogs.slice(0, 4).map((blog) => (
                      <Link
                        to={`/blog/${blog.id}`} // Điều hướng đến trang chi tiết blog
                        key={blog.id}
                        className="flex items-center bg-white rounded-lg hover:shadow-xl hover:scale-[1.02] transition transform duration-300 h-36"
                        style={{ width: "580px", height: "141px" }}
                      >
                        {/* Image on the left */}
                        <div className="flex-shrink-0 w-1/4 h-full">
                          <img
                            src={blog.imageCloudUrl}
                            alt={blog.title}
                            className="w-full h-full object-cover rounded-l-lg"
                          />
                        </div>
                        {/* Title and details on the right */}
                        <div className="flex-1 px-4 flex flex-col justify-center space-y-2">
                          <span className="text-xl text-gray-500">
                            {blog.category}
                          </span>
                          <h2 className="text-2xl font-semibold text-black truncate">
                            {blog.title}
                          </h2>
                          <div className="flex items-center space-x-3 pt-2">
                            <img
                              className="w-6 h-6 rounded-full object-cover"
                              src={blog.author.profilePicture}
                              alt="Author"
                            />
                            <h1 className="text-xs font-medium text-black">
                              {blog.author.name}
                            </h1>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Banner Section */}
                  <div className="mt-8 flex flex-col items-center">
                    <img
                      src="https://img.freepik.com/free-psd/horizontal-banner-template-techno-store_23-2148979527.jpg?t=st=1733290054~exp=1733293654~hmac=db36f9214353c62a8ba1d049ba2961f1a5ed0c65b8b8a0ac2f4c2e1b11b6a6b0&w=1380"
                      alt="Technology horizontal banner template"
                      className="rounded-lg shadow-lg"
                      style={{ maxWidth: "80%", height: "auto" }}
                    />
                  </div>
                </>
              )}
              <TopAuthors />
              <h2 className="text-3xl font-bold text-black mt-7 ml-10">
                ALL BLOG
              </h2>
              <BlogList
                blogs={filteredBlogs}
                setBlogs={setBlogs}
                layout="grid"
              />
              <div className="flex justify-center mt-5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="px-4 py-2 bg-white border border-white text-black rounded-l mx-2"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index)}
                    className={`px-4 py-2 border border-white bg-white ${index === currentPage ? "text-blue-500" : "text-black"
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className="px-4 py-2 bg-white border border-white text-black rounded-r mx-2"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
