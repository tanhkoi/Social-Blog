import { useEffect, useState } from "react";
import BlogList from "../../../components/Blog/BlogList";
import NavBar from "../../../components/Header/NavBar";  // Import NavBar
import SideBar from "../../../components/Sidebar/SideBar";  // Import Sidebar

const SavedBlogsPage = () => {
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm state loading

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Bạn cần đăng nhập để xem bài viết đã lưu.");
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
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-black text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-black">
      <header>
        <NavBar />
      </header>
      <main className="flex">
        <aside className="w-60">
          <SideBar />
        </aside>
        <div className="flex-grow p-4 ml-4">
          <h1 className="text-3xl font-bold mb-5 mt-20">Bookmarks</h1>
          {savedBlogs.length > 0 ? (
            <BlogList blogs={savedBlogs} setBlogs={setSavedBlogs} />
          ) : (
            <p className="text-gray-400"></p>
          )}
        </div>
      </main>
    </div>
  );
};

export default SavedBlogsPage;
