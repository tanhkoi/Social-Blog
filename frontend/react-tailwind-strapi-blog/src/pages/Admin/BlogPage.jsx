import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const initialBlogs = [
  { id: 1, title: "React Basics", category: "Technology", description: "Learn the basics of React", date: "2023-10-01" },
  { id: 2, title: "Advanced React", category: "Technology", description: "Deep dive into React hooks", date: "2023-10-10" },
];

const BlogPage = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({ id: null, title: "", category: "", description: "", date: "" });
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBlog({ ...currentBlog, [name]: value });
  };

  const handleAddBlog = () => {
    setCurrentBlog({ id: null, title: "",category: "",  description: "", date: "" });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditBlog = (blog) => {
    setCurrentBlog(blog);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setBlogs(blogs.map(b => (b.id === currentBlog.id ? currentBlog : b)));
    } else {
      setBlogs([...blogs, { ...currentBlog, id: blogs.length + 1 }]);
    }
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <button onClick={handleAddBlog} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        <FontAwesomeIcon icon={faPlus} /> Add Blog
      </button>

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

      <table className="w-11/12 bg-white border border-gray-200 rounded shadow-md">
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
