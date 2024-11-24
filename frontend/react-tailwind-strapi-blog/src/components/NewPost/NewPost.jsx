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
    const imageFile = e.target.files[0];

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
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Lỗi: ${errorData.message}`);
        return;
      }

      const imageUrl = await response.text();
      setImageCloudUrl(imageUrl);
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
    <div className="w-full max-w-5xl mx-auto mt-10 p-6  rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <input
        type="text"
        className="w-full h-12 mt-4 p-4 bg-[#1c1f26] text-white border border-gray-600 rounded-xl text-lg"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="w-full h-12 mt-4 p-4 bg-[#1c1f26] text-white border border-gray-600 rounded-xl text-lg"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        className="w-full h-12 mt-4 p-4 bg-[#1c1f26] text-white border border-gray-600 rounded-xl text-lg"
        placeholder="Tags (ngăn cách bằng dấu phẩy)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <div className="mt-6">
        <ReactQuill
          value={content}
          onChange={setContent}
          className="bg-[#1c1f26] text-white border border-gray-600 rounded-xl"
          placeholder="Content"
          style={{ height: "300px", marginBottom: "20px" }}
        />
      </div>
        <input
          type="file"
          id="fileInput"
          className="w-full h-12 mt-4 p-4 bg-[#1c1f26] text-white border border-gray-600 rounded-xl text-lg"
          onChange={handleImageChange}
          accept="image/*"
        />
      <div className="flex justify-end">
        <button
          className="w-1/6 h-14 mt-6 bg-white text-black text-lg font-semibold py-2 rounded-xl hover:bg-gray-200 transition duration-200"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

NewPost.propTypes = {
  token: PropTypes.string,
};

export default NewPost;
