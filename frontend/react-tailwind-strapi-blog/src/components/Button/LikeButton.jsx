import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import PropTypes from "prop-types";

const LikeButton = ({ initialLikes, blogId, setBlogs }) => {
  const [likes, setLikes] = useState(initialLikes || 110);

  const handleLike = async (e) => {
    e.stopPropagation();

    try {
      // Gửi yêu cầu POST tới API để tăng số lượng like
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/likes/post/${blogId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to like the post');
      }

      // Nếu thành công, tăng số lượng like trong trạng thái cục bộ
      const newLikes = likes + 1;
      setLikes(newLikes);

      // Cập nhật lại blog trong danh sách sau khi tăng like
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) => (b.id === blogId ? { ...b, likes: newLikes } : b))
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div onClick={handleLike} className="flex items-center space-x-1 cursor-pointer hover:text-red-500">
      <FaHeart />
      <span>{likes}</span>
    </div>
  );
};

LikeButton.propTypes = {
  initialLikes: PropTypes.number,
  blogId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setBlogs: PropTypes.func.isRequired,
};

export default LikeButton;
