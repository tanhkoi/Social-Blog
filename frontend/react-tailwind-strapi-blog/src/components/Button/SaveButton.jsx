import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaBookmark } from "react-icons/fa";

const SaveButton = ({ blog, setBlogs }) => {
  // Trạng thái lưu bài viết
  const [isSaved, setIsSaved] = useState(false);

  // Khi component được render, lấy trạng thái từ localStorage hoặc API
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("savedPosts")) || [];
    setIsSaved(savedPosts.includes(blog.id));
  }, [blog.id]);

  const handleToggleSavePost = async (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập.");
      return;
    }

    const url = `http://localhost:8080/bookmarks/post/${blog.id}`;
    const method = isSaved ? "DELETE" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedSaved = !isSaved;

        // Cập nhật trạng thái
        setIsSaved(updatedSaved);

        // Đồng bộ localStorage
        const savedPosts = JSON.parse(localStorage.getItem("savedPosts")) || [];
        if (updatedSaved) {
          localStorage.setItem(
            "savedPosts",
            JSON.stringify([...savedPosts, blog.id])
          );
        } else {
          localStorage.setItem(
            "savedPosts",
            JSON.stringify(savedPosts.filter((id) => id !== blog.id))
          );
        }

        // Cập nhật danh sách blogs
        setBlogs((prevBlogs) =>
          prevBlogs.map((b) =>
            b.id === blog.id ? { ...b, isSaved: updatedSaved } : b
          )
        );
      } else {
        const errorData = await response.json();
        console.error(
          `Lỗi khi ${isSaved ? "xóa" : "lưu"} blog:`,
          errorData.message || errorData
        );
        alert(`Lỗi: ${errorData.message || "Không thể xử lý blog"}`);
      }
    } catch (error) {
      console.error(`Lỗi khi kết nối đến API:`, error);
      alert("Lỗi kết nối với API, vui lòng thử lại.");
    }
  };

  return (
    <div
      onClick={handleToggleSavePost}
      className="flex items-center space-x-1 cursor-pointer hover:text-yellow-500"
    >
      <FaBookmark />
      <span>{isSaved ? "Saved" : "Save"}</span>
    </div>
  );
};

SaveButton.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isSaved: PropTypes.bool,
  }).isRequired,
  setBlogs: PropTypes.func.isRequired,
};

export default SaveButton;
