import { useState } from "react";

const SaveButton = (blog, setBlogs) => {
  const [isSaved, setIsSaved] = useState(blog.isSaved || false);

  const handleSavePost = async (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập.");
      return;
    }

    const url = `http://localhost:8080/bookmarks/post/${blog.id}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsSaved(true);
        setBlogs((prevBlogs) =>
          prevBlogs.map((b) => (b.id === blog.id ? { ...b, isSaved: true } : b))
        );
      } else {
        const errorData = await response.json();
        console.error("Lỗi khi lưu blog:", errorData.message || errorData);
        alert(`Lỗi: ${errorData.message || "Không thể lưu blog"}`);
      }
    } catch (error) {
      console.error("Lỗi khi kết nối đến API:", error);
      alert("Lỗi kết nối với API, vui lòng thử lại.");
    }
  };

  const handleDeletePost = async (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập.");
      return;
    }

    const url = `http://localhost:8080/bookmarks/post/${blog.id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsSaved(false);
        setBlogs((prevBlogs) =>
          prevBlogs.map((b) => (b.id === blog.id ? { ...b, isSaved: false } : b))
        );
      } else {
        const errorData = await response.json();
        console.error("Lỗi khi xóa blog:", errorData.message || errorData);
        alert(`Lỗi: ${errorData.message || "Không thể xóa blog"}`);
      }
    } catch (error) {
      console.error("Lỗi khi kết nối đến API:", error);
      alert("Lỗi kết nối với API, vui lòng thử lại.");
    }
  };

  return { isSaved, handleSavePost, handleDeletePost };
};

export default SaveButton;
