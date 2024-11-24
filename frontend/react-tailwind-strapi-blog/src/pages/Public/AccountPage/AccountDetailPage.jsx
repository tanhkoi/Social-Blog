import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaTimes } from 'react-icons/fa';  

const AccountDetailPage = () => {
  const navigate = useNavigate();  
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const profilePicture = localStorage.getItem('profilePicture');
  
  const [user, setUser] = useState({
    avatar: profilePicture || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: username,
    email: "",
    password: "", // Add password to state
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  // Fetch user data when the component mounts
  useEffect(() => {
    if (!token) {
      alert("Bạn cần đăng nhập để xem thông tin tài khoản.");
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser({
            avatar: data.profilePicture || user.avatar,
            name: data.name || username,
            email: data.email || "",
            password: "", // Do not expose password for security reasons
          });
          setEditedUser({
            avatar: data.profilePicture || user.avatar,
            name: data.name || username,
            email: data.email || "",
            password: "", // Password field should remain hidden
          });
        } else {
          const errorData = await response.json();
          alert(`Lỗi: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin người dùng:", error);
      }
    };

    fetchUserData();
  }, [token, username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedUser({ ...user });
  };

  const handleSaveChanges = async () => {
    // Call API to update user info
    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editedUser.name,
          email: editedUser.email,
          profilePicture: editedUser.avatar, // Send updated profile picture URL
          password: editedUser.password, // Ensure password is sent if it is updated
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser({ ...updatedUser });
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        alert(`Lỗi: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedUser({ ...editedUser, avatar: imageUrl });
    }
  };

  const handleGoHome = () => {
    navigate("/");  // Điều hướng về trang chính
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleGoHome}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-auto flex items-center"
        >
          <FaTimes className="h-6 w-6" />
        </button>
      </div>
      <div className="text-center mb-6">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-32 h-32 rounded-full mx-auto border border-gray-200"
        />
        <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>

      {isEditing ? (
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-3">Edit Profile</h3>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Avatar</label>
            <input type="file" onChange={handleAvatarChange} className="border rounded w-full px-3 py-2" />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={editedUser.password}
              onChange={handleInputChange}
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSaveChanges}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={handleEditToggle}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleEditToggle}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default AccountDetailPage;
