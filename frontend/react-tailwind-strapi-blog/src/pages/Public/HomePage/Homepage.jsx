/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import NavBar from "../../../components/Header/NavBar";
import SideBar from "../../../components/Sidebar/SideBar";
import BlogList from "../../../components/Blog/BlogList";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [blogs, setBlogs] = useState([]);
  const [mostLikedBlogs, setMostLikedBlogs] = useState([]); // State lưu các bài blog được thích nhiều nhất
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const fetchBlogs = async (page = 1, size = 7) => {
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
        setMostLikedBlogs(mostLikedData); // Cập nhật bài blog được thích nhiều nhất
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
    <div className="bg-[#0E1217] min-h-screen text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-black z-50">
        <NavBar setSearchTerm={setSearchTerm} />
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
            <div className="flex flex-col items-start p-4 bg-gradient-to-r from-blue-100 to-white rounded-lg shadow-lg mb-5">
              <h1 className="text-5xl font-bold text-blue-700 mb-4">
                Diverse Perspectives of the Young Generation in Vietnam
              </h1>
              <p className="text-3xl font-bold text-zinc-700 mb-4">
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
              {currentPage === 0 && (
                <>
                  <h2 className="text-3xl font-bold text-blue-500 mb-5">
                    POPULAR BLOG
                  </h2>
                  <div className="w-50 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 px-10">
                    {mostLikedBlogs.slice(0, 4).map((blog) => (
                      <Link
                        to={`/blog/${blog.id}`} // Điều hướng đến trang chi tiết blog
                        key={blog.id}
                        className="flex items-center space-x-6 bg-[#1c1f26] rounded-lg hover:shadow-md hover:scale-[1.02] transition transform duration-300"
                      >
                        {/* Image on the left */}
                        <div className="flex-shrink-0 w-1/3">
                          <img
                            src={blog.imageCloudUrl} // Giả sử bạn có trường 'imageUrl' trong blog
                            alt={blog.title}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        {/* Title and tags on the right */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white">
                            {blog.title}
                          </h3>
                          <h3 className="text-lg font-semibold text-white">
                            {blog.category}
                          </h3>
                          <div className="p-4 flex flex-col">
                            <div className="flex space-x-3">
                              <img
                                className="w-8 h-8 rounded-full object-cover"
                                src={blog.author.profilePicture}
                                alt="Author"
                              />
                              <h1 className="font-bold text-lg text-white">
                                {blog.author.name}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
              {currentPage === 0 && (
                <div className="mt-8 mb-8 flex justify-center">
                  <img
                    src="https://img.freepik.com/free-psd/horizontal-banner-template-techno-store_23-2148979527.jpg?t=st=1733290054~exp=1733293654~hmac=db36f9214353c62a8ba1d049ba2961f1a5ed0c65b8b8a0ac2f4c2e1b11b6a6b0&w=1380"
                    alt="Technology horizontal banner template"
                    className="rounded-lg shadow-lg"
                    style={{ maxWidth: "70%", height: "auto" }}
                  />
                </div>
              )}
              <BlogList blogs={filteredBlogs} setBlogs={setBlogs} />
              <div className="flex justify-center mt-5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="px-4 py-2 bg-[#0E1217] border border-[#0E1217] text-white rounded-l mx-2"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index)}
                    className={`px-4 py-2 border border-[#0E1217] bg-[#0E1217] ${
                      index === currentPage ? "text-blue-500" : "text-white"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className="px-4 py-2 bg-[#0E1217] border border-[#0E1217] text-white rounded-r mx-2"
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
