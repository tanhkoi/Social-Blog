import { useEffect, useState } from "react";
import BlogList from "../../../components/Blog/BlogList ";
import NavBar from "../../../components/Header/NavBar";  
import SideBar from "../../../components/Sidebar/SideBar";  

const ProfilePage = () => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Bạn cần đăng nhập để xem bài viết của bạn.");
        return;
      }

      try {
        // Lấy danh sách bài viết của người dùng từ API
        const response = await fetch(`http://localhost:8080/api/posts/myPosts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMyPosts(data); // Gán danh sách bài viết của người dùng
        } else {
          const errorData = await response.json();
          console.error("Lỗi khi lấy bài viết:", errorData.message);
        }
      } catch (error) {
        console.error("Lỗi khi kết nối đến API:", error);
      }
    };

    fetchMyPosts();
  });

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <header>
        <NavBar />
      </header>
      <main className="flex">
        <aside className="w-60">
          <SideBar />
        </aside>
        <div className="flex-grow p-4 ml-4">
          <h1 className="text-3xl font-bold mb-5 mt-20">Trang cá nhân</h1>
          {myPosts.length > 0 ? (
            <BlogList blogs={myPosts} setBlogs={setMyPosts} />
          ) : (
            <p className="text-gray-400">Bạn chưa có bài viết nào.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
