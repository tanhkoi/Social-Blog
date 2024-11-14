import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const LikeButton = ({ initialLikes, blogId, setBlogs }) => {
  const [likes, setLikes] = useState(initialLikes || 110);
  const [isLiked, setIsLiked] = useState(false); // Trạng thái thích

  // Kiểm tra trạng thái thích từ API khi render
  useEffect(() => {
    const fetchLikeStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`http://localhost:8080/api/likes/post/${blogId}/count`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLikes(data.likes); // Cập nhật số lượt thích
        }
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };

    fetchLikeStatus();
  }, [blogId]);

  const handleLikeToggle = async (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập.");
      return;
    }

    const url = `http://localhost:8080/api/likes/post/${blogId}`;
    const method = isLiked ? "DELETE" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(isLiked ? "Failed to unlike the post" : "Failed to like the post");
      }

      const newLikes = isLiked ? likes - 1 : likes + 1;
      setLikes(newLikes);
      setIsLiked(!isLiked); // Cập nhật trạng thái thích

      // Cập nhật lại danh sách blog
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) =>
          b.id === blogId ? { ...b, likes: newLikes, isLiked: !isLiked } : b
        )
      );
    } catch (error) {
      console.error(isLiked ? "Error unliking post:" : "Error liking post:", error);
    }
  };

  return (
    <div
      onClick={handleLikeToggle}
      className={`flex items-center space-x-1 cursor-pointer ${
        isLiked ? "text-red-500" : "hover:text-red-500"
      }`}
    >
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
