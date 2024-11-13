import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    id: null,
    title: "",
    category: "",
    description: "",
    coverImg: "",
    date: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(storedBlogs);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentBlog((prevBlog) => ({ ...prevBlog, coverImg: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditBlog = (blog) => {
    setCurrentBlog(blog);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteBlog = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedBlogs = blogs.map((blog) =>
        blog.id === currentBlog.id ? currentBlog : blog
      );
      setBlogs(updatedBlogs);
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    } else {
      const newBlog = { ...currentBlog, id: blogs.length + 1 };
      setBlogs([...blogs, newBlog]);
      localStorage.setItem("blogs", JSON.stringify([...blogs, newBlog]));
    }
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">{isEditing ? "Edit Blog" : "Add New Blog"}</h3>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={currentBlog.title}
              onChange={handleInputChange}
              required
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              name="category"
              value={currentBlog.category}
              onChange={handleInputChange}
              required
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={currentBlog.description}
              onChange={handleInputChange}
              required
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border rounded w-full px-3 py-2"
            />
            {currentBlog.coverImg && (
              <img src={currentBlog.coverImg} alt="Cover preview" className="mt-2 w-32 h-32 object-cover" />
            )}
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={currentBlog.date}
              onChange={handleInputChange}
              required
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            {isEditing ? "Update Blog" : "Add Blog"}
          </button>
          <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 ml-2 rounded">
            Cancel
          </button>
        </form>
      )}

      <table className="w-full bg-white border border-gray-200 rounded shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-6 px-8 text-left">#</th>
            <th className="py-6 px-8 text-left">Title</th>
            <th className="py-6 px-8 text-left">Category</th>
            <th className="py-6 px-8 text-left">Description</th>
            <th className="py-6 px-8 text-left">Date</th>
            <th className="py-6 px-8 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog.id} className="border-b">
              <td className="py-6 px-8">{index + 1}</td>
              <td className="py-6 px-8">{blog.title}</td>
              <td className="py-6 px-8">{blog.category}</td>
              <td className="py-6 px-8">{blog.description}</td>
              <td className="py-6 px-8">{blog.date}</td>
              <td className="py-6 px-8">
                <button onClick={() => handleEditBlog(blog)} className="text-blue-500 hover:text-blue-700 mx-1">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDeleteBlog(blog.id)} className="text-red-500 hover:text-red-700 mx-1">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogPage;
