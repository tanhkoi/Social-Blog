import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaTimes } from 'react-icons/fa';  

const UserProfilePage = () => {
  const navigate = useNavigate();  
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const profilePicture = localStorage.getItem('profilePicture');
  
  const [user, setUser] = useState({
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600",
    name: username,
    email: "johndoe@example.com",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedUser({ ...user });
  };

  const handleSaveChanges = () => {
    setUser({ ...editedUser });
    setIsEditing(false);
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
      {/* Nút "Exit" với biểu tượng "X" */}
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
        <p className="text-gray-600">{user.phone}</p>
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
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={editedUser.phone}
              onChange={handleInputChange}
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Avatar</label>
            <input type="file" onChange={handleAvatarChange} className="border rounded w-full px-3 py-2" />
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

export default UserProfilePage;
