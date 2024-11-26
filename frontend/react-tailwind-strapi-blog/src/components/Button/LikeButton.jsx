import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const LikeButton = ({ blog, setBlogs }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/likes/post/${blog.id}/count`,
         
        );
        if (response.ok) {
          const count = await response.json();
          setLikes(count);
        } else {
          console.error("Lỗi khi lấy số like");
        }
      } catch (error) {
        console.error("Lỗi khi lấy số like:", error);
      }
    };

    fetchLikeCount();

    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    const likedBlog = likedPosts.find((post) => post.id === blog.id);

    if (likedBlog) {
      setIsLiked(likedBlog.isLiked);
    } else {
      setIsLiked(false);
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
        const data = await response.json();
        alert(data.message || "Lỗi khi like/unlike bài viết");
        return;
      }

      const newLikes = isLiked ? likes - 1 : likes + 1;
      setLikes(newLikes);
      setIsLiked(!isLiked);

      setBlogs((prevBlogs) =>
        prevBlogs.map((b) =>
          b.id === blog.id
            ? { ...b, likes: newLikes, isLiked: !isLiked }
            : b,
        ),
      );

      const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
      const updatedLikedPosts = likedPosts.filter(
        (post) => post.id !== blog.id,
      );
      updatedLikedPosts.push({
        id: blog.id,
        isLiked: !isLiked,
        likes: newLikes,
      });
      localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
    } catch (error) {
      console.error("Lỗi khi like/unlike:", error);
    }
  };

  return (
    <div
      onClick={handleToggleLike}
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
  blog: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isLiked: PropTypes.bool,
    likes: PropTypes.number,
  }).isRequired,
  setBlogs: PropTypes.func.isRequired,
};

export default LikeButton;