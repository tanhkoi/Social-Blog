/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import NavBar from "../../../components/Header/NavBar";
import SideBar from "../../../components/Sidebar/SideBar";
import BlogList from "../../../components/Blog/BlogList";

const Homepage = () => {
  const [blogs, setBlogs] = useState([]);
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

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#0E1217] min-h-screen text-white">
      <header>
        <NavBar setSearchTerm={setSearchTerm} />
      </header>
      <main>
        <div className="flex">
          <aside className="w-60">
            <SideBar />
          </aside>
          <div className="w-full flex-grow ml-4 p-5 px-10 mt-20">
            {showMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                Login successfully!
              </div>
            )}

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
                <BlogList blogs={filteredBlogs} setBlogs={setBlogs} />
                <div className="flex justify-center mt-5 ">
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
      </main>
    </div>
  );
};

export default Homepage;
