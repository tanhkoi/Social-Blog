import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const AccountDetailPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const profilePicture = localStorage.getItem("profilePicture");

  const [user, setUser] = useState({
    avatar:
      profilePicture ||
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: username,
    email: "",
    password: "", // Add password to state
  });

  const [editedUser, setEditedUser] = useState({ ...user });

  // Fetch user data when the component mounts
  useEffect(() => {
    if (!token) {
      alert("You need to log in to view account information.");
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error loading user information:", error);
      }
    };

    fetchUserData();
  }, [token, user.avatar, user.name, username]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setEditedUser({ ...editedUser, avatar: reader.result }); // Base64 image
      };
      reader.readAsDataURL(file);
    } else {
      setEditedUser({ ...editedUser, [name]: value });
    }
  };

  const handleSaveChanges = async () => {
    const updatedUserInfo = {
      name: editedUser.name,
      email: editedUser.email,
      profilePicture: editedUser.avatar,
    };

    // Only send the new password if the user has changed it
    if (editedUser.password) {
      updatedUserInfo.password = editedUser.password;
    }
    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserInfo),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("Updated user info:", updatedUser);

        setUser({ ...updatedUser });

        // Update localStorage with the new values
        localStorage.setItem("username", updatedUser.name);
        localStorage.setItem("profilePicture", updatedUser.profilePicture);
        localStorage.setItem("email", updatedUser.email);

        // Show success message
        toast.success("Account updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      toast.error("Failed to update account", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    navigate("/");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-r from-blue-400 to-white overflow-hidden">
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleGoHome}
            className="bg-white border-white text-black px-4 py-2 rounded ml-auto flex items-center"
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
          <h2 className="text-2xl text-black font-semibold mt-4">
            {user.name}
          </h2>
          <p className="text-black">{user.email}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl text-black font-bold mb-3">Edit Profile</h3>
          <div className="mb-3">
            <label className="text-sm text-black font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm text-black font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm text-black font-medium mb-1">
              Avatar
            </label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleInputChange}
              className="border bg-white rounded w-full px-3 py-2"
            />
            {editedUser.avatar && (
              <img
                src={editedUser.avatar}
                alt="Preview Avatar"
                className="w-16 h-16 rounded-full mt-2"
              />
            )}
          </div>

          <div className="mb-3">
            <label className="block text-sm text-black font-medium mb-1">
              Password
            </label>
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
              className="bg-white border border-gray-600 text-black px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailPage;
