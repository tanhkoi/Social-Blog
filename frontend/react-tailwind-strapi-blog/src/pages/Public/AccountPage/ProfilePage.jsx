/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import BlogList from "../../../components/Blog/BlogList";
import NavBar from "../../../components/Header/NavBar";
import SideBar from "../../../components/Sidebar/SideBar";
import "../../../App.css";
import { useParams } from "react-router-dom";
import FollowButton from "../../../components/Button/FollowButton";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useParams();
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${userId}`,
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
          setUser(data);
          setIsFollowing(data.amIFollowing);
        } else {
          console.error("Lỗi khi lấy thông tin người dùng");
        }
      } catch (error) {
        console.error("Lỗi khi kết nối đến API thông tin người dùng:", error);
      }
    };

    const fetchMyPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/posts/${userId}-posts`,
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

    fetchUserInfo();
    fetchMyPosts();
  }, [userId]);

  const fetchFollowers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/follows/${userId}/followers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setFollowers(await response.json());
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách followers:", error);
    }
  };

  const fetchFollowing = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/follows/${userId}/following`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setFollowing(await response.json());
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách following:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen text-black">
      <header>
        <NavBar />
      </header>
      <main className="flex">
        <aside className="w-60 h-screen fixed top-0 left-0 bg-white border-r border-gray-600">
          <SideBar />
        </aside>
        <div className="flex-grow ml-60 p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="lg:w-3/4 p-4">
              <h2 className="text-3xl font-bold mb-4 mt-20">Posts</h2>

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
                  <p className="ml-3 text-gray-400 text-lg">
                    Loading popular posts...
                  </p>
                </div>
              ) : myPosts.length > 0 ? (
                <BlogList blogs={myPosts} setBlogs={setMyPosts} />
              ) : (
                <p className="text-gray-400">No posts yet.</p>
              )}
            </div>
            <div className="lg:w-1/4 lg:h-1/4 bg-card p-4 rounded-lg border border-gray-600">
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
                  {user?.name || "Guest"}
                </p>
                <FollowButton
                  userId={userId}
                  isFollowing={isFollowing}
                  setIsFollowing={setIsFollowing}
                  onFollowChange={(change) => {
                    setUser((prevUser) => ({
                      ...prevUser,
                      followerNumber: prevUser.followerNumber + change,
                    }));
                  }}
                />
              </div>
              <p className="mt-2">
                <button
                  className="mt-4 bg-white border border-white text-black px-4 py-2 rounded hover:underline focus:outline-none"
                  onClick={() => {
                    setIsFollowersModalOpen(true);
                    fetchFollowers();
                  }}
                >
                  {user?.followerNumber} Followers
                </button>
                •
                <button
                  className="mt-4 bg-white border border-white text-black px-4 py-2 rounded hover:underline focus:outline-none"
                  onClick={() => {
                    setIsFollowingModalOpen(true);
                    fetchFollowing();
                  }}
                >
                  {user?.followingNumber} Following
                </button>
              </p>
              <div className="mt-4 text-start text-lg text-black">
                <p>Invite friends</p>
                <p className="text-md text-black">
                  Invite other developers to discover how easy it is to stay
                  updated with CWTS
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      {isFollowersModalOpen && (
        <Modal
          title="Followers"
          onClose={() => setIsFollowersModalOpen(false)}
          items={followers}
        />
      )}
      {isFollowingModalOpen && (
        <Modal
          title="Following"
          onClose={() => setIsFollowingModalOpen(false)}
          items={following}
        />
      )}
    </div>
  );
};

const Modal = ({ title, onClose, items }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleProfileClick = async (authorId) => {
    setLoading(true); // Bắt đầu loading

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Giả lập việc tải dữ liệu (bạn có thể thay bằng API thật)

      // Sau khi loading xong, điều hướng đến trang profile
      navigate(`/profile/${authorId}`);
    } catch (error) {
      console.error("Error while navigating:", error);
    } finally {
      setLoading(false); // Tắt loading
      onClose(); // Đóng modal sau khi hoàn thành
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-white opacity-75 flex items-center justify-center z-50">
          <div className="loader">Loading...</div> {/* Hiển thị loading */}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-600 rounded-lg p-4 w-96 max-h-96 overflow-y-auto relative">
        <button
          className="absolute top-2 right-2 text-red-600 hover:text-gray-800 bg-white border-white"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className="mb-2 flex items-center space-x-2 cursor-pointer"
              onClick={() => handleProfileClick(item.id)}
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden cursor-pointer">
                {item.profilePicture ? (
                  <img
                    src={item.profilePicture}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-500 rounded-full" />
                )}
              </div>
              <span className="ml-2">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
