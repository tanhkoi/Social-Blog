import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const LikeButton = ({ blog, setBlogs }) => {
  const [isLiked, setIsLiked] = useState(false); // Trạng thái thích
  const [likes, setLikes] = useState(10); // Số lượt thích mặc định là 10

  // Khi component được render, lấy trạng thái và số lượt like từ localStorage
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    const likedBlog = likedPosts.find((post) => post.id === blog.id);

    if (likedBlog) {
      setIsLiked(likedBlog.isLiked);
      setLikes(likedBlog.likes); // Lấy số lượt like từ localStorage
    } else {
      setIsLiked(false);
      setLikes(10); // Nếu không có bài viết trong localStorage, khởi tạo lại
    }
  }, [blog.id]);

  const handleToggleLike = async (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập.");
      return;
    }

    const url = `http://localhost:8080/api/likes/post/${blog.id}`;
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
          b.id === blog.id ? { ...b, likes: newLikes, isLiked: !isLiked } : b
        )
      );

      // Cập nhật lại mảng likedPosts trong localStorage
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];

      // Tìm bài viết đã được like và cập nhật nó
      const updatedLikedPosts = likedPosts.filter((post) => post.id !== blog.id); // Loại bỏ bài viết cũ nếu có
      updatedLikedPosts.push({ id: blog.id, isLiked: !isLiked, likes: newLikes }); // Thêm hoặc cập nhật bài viết mới

      // Lưu lại mảng likedPosts vào localStorage
      localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));

    } catch (error) {
      console.error(isLiked ? "Error unliking post:" : "Error liking post:", error);
    }
  };

  return (
    <div
      onClick={handleToggleLike}
      className={`flex items-center space-x-1 cursor-pointer ${isLiked ? "text-red-500" : "hover:text-red-500"}`}
    >
      <FaHeart />
      <span>{likes}</span>
    </div>
  );
};

LikeButton.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isLiked: PropTypes.bool,
    likes: PropTypes.number,
  }).isRequired,
  setBlogs: PropTypes.func.isRequired,
};

export default LikeButton;
