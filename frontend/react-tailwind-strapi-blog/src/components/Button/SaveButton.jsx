import PropTypes from "prop-types";
import { FaBookmark } from "react-icons/fa";

const SaveButton = ({ blog, setBlogs, isSaved, setIsSaved }) => {
  const token = localStorage.getItem("token");

  const handleToggleSavePost = async (e) => {
    e.stopPropagation();

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

        // Update the state for this button
        setIsSaved(updatedSaved);

        // Update the parent blogs list
        setBlogs((prevBlogs) => {
          if (updatedSaved) {
            // Khi bài blog được lưu (POST), chỉ cập nhật trạng thái `isSaved`
            return prevBlogs.map((b) =>
              b.id === blog.id ? { ...b, isSaved: updatedSaved } : b
            );
          } else {
            // Khi bài blog bị xóa khỏi bookmark (DELETE), loại bỏ bài khỏi danh sách
            return prevBlogs.filter((b) => b.id !== blog.id);
          }
        });
      } else {
        const errorData = await response.json();
        console.error(
          `Lỗi khi ${isSaved ? "xóa" : "lưu"} blog:`,
          errorData.message || errorData
        );
        alert(`Lỗi: ${errorData.message || "Không thể xử lý blog"}`);
      }
    } catch (error) {
      console.error("Lỗi khi kết nối đến API:", error);
      alert("Lỗi kết nối với API, vui lòng thử lại.");
    }
  };

  return (
    <div
      onClick={handleToggleSavePost}
      className={`flex items-center space-x-1 cursor-pointer ${
        isSaved ? "text-yellow-500" : "hover:text-yellow-500"
      }`}
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
  isSaved: PropTypes.bool,
  setIsSaved: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
};

export default SaveButton;
