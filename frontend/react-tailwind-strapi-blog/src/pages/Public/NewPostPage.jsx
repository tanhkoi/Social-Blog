import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewPostPage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [previewImg, setPreviewImg] = useState(null); // Chỉ cần URL xem trước
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file)); // Tạo URL xem trước
    }
  };

  const handlePost = () => {
    const newPost = {
      id: Date.now(),
      title,
      desc,
      content,
      coverImg: previewImg, // Sử dụng URL xem trước để hiển thị
      authorName: "John Doe",
      authorImg: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600",
      authorDesc: "Web Developer",
    };

    const posts = JSON.parse(localStorage.getItem("blogs")) || [];
    posts.push(newPost);
    localStorage.setItem("blogs", JSON.stringify(posts));

    navigate(`/`);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold">Create New Post</h1>
      <input
        type="text"
        className="w-full mt-4 p-2 border rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="w-full mt-4 p-2 border rounded"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <textarea
        className="w-full mt-4 p-2 border rounded"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="file"
        className="w-full mt-4 p-2 border rounded"
        onChange={handleImageChange} 
        accept="image/*" 
      />
      {previewImg && (
        <img
          src={previewImg}
          alt="Preview"
          className="w-full mt-4 h-48 object-cover rounded"
        />
      )}
      <button
        className="w-full mt-4 bg-blue-500 text-white py-2 rounded"
        onClick={handlePost}
      >
        Post
      </button>
    </div>
  );
};

export default NewPostPage;
