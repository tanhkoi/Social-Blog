import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  NavBar  from "../../../components/Header/NavBar";
import  SideBar  from "../../../components/Sidebar/SideBar";

const NewPostPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [previewImg, setPreviewImg] = useState(null);
  const [imageCloudUrl, setImageCloudUrl] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
      setImageCloudUrl("http://cloud-storage-url.com/image");
    }
  };

  const handlePost = async () => {
    const token = localStorage.getItem("token");
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
    <div className="bg-zinc-950 min-h-screen text-white">
      <header>
        <NavBar setSearchTerm={() => {}} />
      </header>
      <main className="flex">
          <aside className="w-60">
            <SideBar />
          </aside>
        <div className="w-full flex-grow p-4 mt-10">
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
            <textarea
              className="w-full mt-4 p-2 bg-zinc-800 text-white border rounded"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <input
              type="file"
              className="w-full mt-4 p-2 bg-zinc-800 text-white border rounded"
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
              className="w-full mt-4 bg-white text-black py-2 rounded"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewPostPage;
