import { useEffect, useState } from "react";
import BlogList from "../../../components/Blog/BlogList ";
import NavBar from "../../../components/Header/NavBar";
import SideBar from "../../../components/Sidebar/SideBar";

const ProfilePage = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Thêm state cho thông tin người dùng

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const profilePicture = localStorage.getItem("profilePicture");

    if (token && username) {
      setUser({ username, profilePicture });
    }

    const fetchMyPosts = async () => {
      if (!token) {
        alert("Bạn cần đăng nhập để xem bài viết của bạn.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/posts/myPosts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMyPosts(data);
        } else {
          const errorData = await response.json();
          console.error("Lỗi khi lấy bài viết:", errorData.message);
        }
      } catch (error) {
        console.error("Lỗi khi kết nối đến API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0E1217]">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0E1217] min-h-screen text-white">
      <header>
        <NavBar />
      </header>
      <main className="flex">
        <aside className="w-60">
          <SideBar />
        </aside>
        <div className="flex-grow p-10 ml-10">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-5 mt-20">Posts</h2>
              {myPosts.length > 0 ? (
                <BlogList blogs={myPosts} setBlogs={setMyPosts} />
              ) : (
                <p className="text-gray-400"></p>
              )}
            </div>
            <div className="lg:w-1/3 bg-card p-4 rounded-lg border border-gray-600">
              <h1 className="text-3xl font-bold mb-5 mt-20">Profile</h1>
              <div className="flex flex-col items-start mt-2">
                <div className="w-24 h-24 bg-zinc-300 rounded-full overflow-hidden mb-2">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-400 rounded-full" />
                  )}
                </div>
                <p className="font-medium">{user?.username || "Guest"}</p>
              </div>
              <p className="mt-2">0 Followers • 0 Following</p>
              <h4 className="mt-4 font-semibold">Invite friends</h4>
              <p className="mt-2">
                Invite other developers to discover how easy it is to stay updated with daily.dev.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
