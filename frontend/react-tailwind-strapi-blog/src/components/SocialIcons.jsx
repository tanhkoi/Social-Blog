import { useState } from "react";
import { FaHeart, FaComment, FaBookmark } from "react-icons/fa";

const SocialIcons = () => {
  const [likes, setLikes] = useState(110);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="flex items-center space-x-4 text-gray-500">
      <div
        onClick={handleLike}
        className="flex items-center space-x-1 cursor-pointer hover:text-red-500"
      >
        <FaHeart />
        <span>{likes}</span>
      </div>
      <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-500">
        <FaComment />
        <span>comments</span>
      </div>
      <div
        onClick={handleSave}
        className="flex items-center space-x-1 cursor-pointer hover:text-yellow-500"
      >
        <FaBookmark />
        <span>{isSaved ? "Saved" : "Save"}</span>
      </div>
    </div>
  );
};

export default SocialIcons;