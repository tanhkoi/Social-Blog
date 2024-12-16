import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogList from "../../../components/Blog/BlogList";
import NavBar from "../../../components/Header/NavBar";  // Import NavBar
import SideBar from "../../../components/Sidebar/SideBar";  // Import Sidebar

const SavedBlogsPage = () => {
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm state loading
  const [alertShown] = useState(false); // State để kiểm tra alert đã hiển thị chưa
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      const token = localStorage.getItem("token");
      if (!token && !alertShown) {
        navigate("/*"); // Điều hướng đến trang đăng nhập
        return;
      }

      try {
        // Sử dụng userId thay cho blog.id trong URL để lấy danh sách blog đã lưu của người dùng
        const response = await fetch(`http://localhost:8080/bookmarks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSavedBlogs(data); // Gán danh sách blog đã lưu
        } else {
          const errorData = await response.json();
          console.error("Lỗi khi lấy blog:", errorData.message);
        }
      } catch (error) {
        console.error("Lỗi khi kết nối đến API:", error);
      } finally {
        setLoading(false); // Khi đã lấy xong dữ liệu, set loading = false
      }
    };

    fetchSavedBlogs();
  }, [alertShown, navigate]); // alertShown và navigate là dependencies

  return (
    <div className="bg-white min-h-screen text-black">
      <header>
        <NavBar />
      </header>
      <main className="flex">
        <aside className="w-60">
          <SideBar />
        </aside>
        <div className="flex-grow p-4 ml-10">
          <h1 className="text-3xl font-bold mb-5 mt-20">Bookmarks</h1>
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
              <p className="ml-3 text-gray-400 text-lg">Loading saved blogs...</p>
            </div>
          ) : savedBlogs.length > 0 ? (
            <BlogList blogs={savedBlogs} setBlogs={setSavedBlogs} />
          ) : (
            <p className="text-gray-400">Không có blog đã lưu nào.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default SavedBlogsPage;
