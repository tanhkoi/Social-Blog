import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewPost = ({ token }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [imageCloudUrl, setImageCloudUrl] = useState("");
  const navigate = useNavigate();

  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0]; // Get selected file from input

    if (!imageFile) {
      alert("Vui lòng chọn một tệp ảnh.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch("http://localhost:8080/cloudinary/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Send token in header
        },
        body: formData, // Send image as form data
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Lỗi: ${errorData.message}`);
        return;
      }

      // Lấy URL ảnh từ phản hồi (dự đoán là chuỗi)
      const imageUrl = await response.text(); // Nhận URL ảnh từ API dưới dạng chuỗi
      setImageCloudUrl(imageUrl); // Lưu URL ảnh vào state
      alert("Tải ảnh lên thành công!");
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên:", error);
      alert("Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại.");
    }
  };

  const handlePost = async () => {
    if (!token) {
      alert("Bạn cần đăng nhập để tạo bài đăng.");
      navigate("/login");
      return;
    }

    const newPost = {
      title,
      category,
      tags: tags.split(",").map((tag) => tag.trim()),
      content,
      imageCloudUrl,
    };

    try {
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        alert("Tạo bài đăng thành công!");
        navigate(`/`);
      } else {
        const errorData = await response.json();
        alert(`Lỗi: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi tạo bài đăng:", error);
      alert("Có lỗi xảy ra khi tạo bài đăng. Vui lòng thử lại.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-4 bg-zinc-900 rounded">
      <h1 className="text-2xl font-bold">Create New Post</h1>
      <input
        type="text"
        className="w-full mt-4 p-2 bg-zinc-800 text-white border rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="w-full mt-4 p-2 bg-zinc-800 text-white border rounded"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        className="w-full mt-4 p-2 bg-zinc-800 text-white border rounded"
        placeholder="Tags (ngăn cách bằng dấu phẩy)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
       <div className="mt-4">
        <ReactQuill
          value={content}
          onChange={setContent} // Set content to editor value
          className="bg-zinc-800 text-white border rounded"
          placeholder="Content"
        />
      </div>
      <input
        type="file"
        className="w-full mt-4 p-2 bg-zinc-800 text-white border rounded"
        onChange={handleImageChange}
        accept="image/*"
      />
      <button
        className="w-full mt-4 bg-white text-black py-2 rounded"
        onClick={handlePost}
      >
        Post
      </button>
    </div>
  );
};

NewPost.propTypes = {
  token: PropTypes.string,
};

export default NewPost;
