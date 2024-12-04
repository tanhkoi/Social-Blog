import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";


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
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên:", error);
    }
  };


const handlePost = async () => {
  if (!token) {
    toast.error("You need to log in to create a post.", {
      position: "top-right",
      autoClose: 3000,
    });
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
      toast.success("Post created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate(`/`);
    } else {
      const errorData = await response.json();
      toast.error(`Error: ${errorData.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  } catch (error) {
    console.error("Error creating post:", error);
    toast.error("An error occurred while creating the post. Please try again.", {
      position: "top-right",
      autoClose: 3000,
    });
  }
};


  return (
    <div className="w-full max-w-5xl mx-auto mt-10 p-6  rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <input
        type="text"
        className="w-full h-12 mt-4 p-4 bg-white text-black border border-gray-600 rounded-xl text-lg"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="w-full h-12 mt-4 p-4 bg-white text-black border border-gray-600 rounded-xl text-lg"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        className="w-full h-12 mt-4 p-4 bg-white text-black border border-gray-600 rounded-xl text-lg"
        placeholder="Tags "
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <div className="mt-6">
        <ReactQuill
          value={content}
          onChange={setContent}
          className="bg-white text-black border border-gray-600 rounded-xl"
          placeholder="Content"
          style={{ height: "300px", marginBottom: "20px" }}
        />
      </div>
        <input
          type="file"
          id="fileInput"
          className="w-full h-12 mt-4 p-4 bg-white text-black border border-gray-600 rounded-xl text-lg"
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
