import { useEffect, useState } from "react";
import BlogList from "../../../components/Blog/BlogList";
import NavBar from "../../../components/Header/NavBar";
import SideBar from "../../../components/Sidebar/SideBar";
import "../../../App.css";
import { useParams } from "react-router-dom"; 
import FollowButton from "../../../components/Button/FollowButton";
const ProfilePage = () => {
  const { userId } = useParams()
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]); // Khởi tạo là mảng rỗng
  const [following, setFollowing] = useState([]); // Khởi tạo là mảng rỗng

  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Bạn cần đăng nhập để xem bài viết của bạn.");
      return;
    }
    setLoading(true);
    // Fetch user information
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Lỗi khi lấy thông tin người dùng");
        }
      } catch (error) {
        console.error("Lỗi khi kết nối đến API thông tin người dùng:", error);
      }
    };

    // Fetch user's posts
    const fetchMyPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/posts/{userId}-posts?id=${userId}`, {
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
          console.error("Lỗi khi lấy bài viết:", await response.json());
        }
      } catch (error) {
        console.error("Lỗi khi kết nối đến API:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch followers and following counts
    const fetchFollowers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/follows/${userId}/followers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFollowers(data);
          setIsFollowing(data.amIFollowing);
        
        } else {
          console.error("Lỗi khi lấy followers");
        }
      } catch (error) {
        console.error("Lỗi khi kết nối đến API followers:", error);
      }
    };

    const fetchFollowing = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/follows/${userId}/following`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFollowing(data);
          console.log("Followers:", data.following);
        } else {
          console.error("Lỗi khi lấy following");
        }
      } catch (error) {
        console.error("Lỗi khi kết nối đến API following:", error);
      }
    };
   fetchUserInfo();
    fetchMyPosts();
    fetchFollowers();
    fetchFollowing();
  }, [userId]);

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
        <aside className="w-60 h-screen fixed top-0 left-0 bg-[#0E1217] border-r border-gray-600">
          <SideBar />
        </aside>
        <div className="flex-grow ml-60 p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="lg:w-3/4 p-4">
              <h2 className="text-3xl font-bold mb-4 mt-20">Posts</h2>
              {myPosts.length > 0 ? (
                <BlogList blogs={myPosts} setBlogs={setMyPosts} />
              ) : (
                <p className="text-gray-400">No posts yet.</p>
              )}
            </div>
            <div className="lg:w-1/4 bg-card p-4 rounded-lg border border-gray-600">
              <h1 className="text-3xl font-bold mb-5 mt-20 text-center">
                Profile
              </h1>
              <div className="flex flex-col items-center mt-2">
                <div className="w-32 h-32 bg-zinc-300 rounded-full overflow-hidden mb-4">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-400 rounded-full" />
                  )}
                </div>
                <p className="font-medium text-2xl text-center">
                  {user?.username || "Guest"}
                </p>
                <FollowButton
                  userId={userId}
                  // isFollowing={isFollowing}
                  // setIsFollowing={setIsFollowing}
                />
              </div>
              <p className="mt-2">
                <button
                  className=" mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:underline focus:outline-none"
                  onClick={() => setIsFollowersModalOpen(true)}
                >
                  {user.followerNumber} Followers
                </button>
                •
                <button
                  className=" mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:underline focus:outline-none"
                  onClick={() => setIsFollowingModalOpen(true)}
                >
                  {user.followingNumber} Following
                </button>
              </p>
              <h4 className="mt-4 font-semibold">Invite friends</h4>
              <p className="mt-2">
                Invite other developers to discover how easy it is to stay
                updated with daily.dev.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Modal for Followers */}
      {isFollowersModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-black p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Danh sách Followers</h2>
            <ul>
              {followers.length > 0 ? ( // Kiểm tra followers có dữ liệu không
                followers.map((follower) => (
                  <li key={follower.id} className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      {follower.profilePicture ? (
                        <img
                          src={follower.profilePicture}
                          alt={follower.username}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-400 rounded-full" />
                      )}
                    </div>
                    <span className="text-white">{follower.username}</span>
                  </li>
                ))
              ) : (
                <p className="text-white">No followers found.</p>
              )}
            </ul>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:underline focus:outline-none"
              onClick={() => setIsFollowersModalOpen(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Modal for Following */}
      {isFollowingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-black text-white p-5 rounded-lg shadow-lg w-1/3 border border-gray-600">
            <h2 className="text-lg font-bold mb-4">Danh sách Following</h2>
            <ul>
              {following.length > 0 ? ( // Kiểm tra following có dữ liệu không
                following.map((followingItem) => (
                  <li key={followingItem.id} className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      {followingItem.profilePicture ? (
                        <img
                          src={followingItem.profilePicture}
                          alt={followingItem.username}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-400 rounded-full" />
                      )}
                    </div>
                    <span className="text-white">{followingItem.username}</span>
                  </li>
                ))
              ) : (
                <p className="text-white">No following found.</p>
              )}
            </ul>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:underline focus:outline-none"
              onClick={() => setIsFollowingModalOpen(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;