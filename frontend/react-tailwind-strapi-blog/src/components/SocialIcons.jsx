import { useState } from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

const SocialIcons = () => {
  const [likes, setLikes] = useState(110);

  const handleLike = () => {
    setLikes(likes + 1);
  };



  const handleShare = () => {
    alert("Đã chia sẻ!");
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
      <div

        className="flex items-center space-x-1 cursor-pointer hover:text-blue-500"
      >
        <FaComment />
        <span>comments</span>
      </div>
      <div
        onClick={handleShare}
        className="flex items-center space-x-1 cursor-pointer hover:text-green-500"
      >
        <FaShare />
        <span>Share</span>
      </div>
    </div>
  );
};

export default SocialIcons;
