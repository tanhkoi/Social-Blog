import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({ 
    id: null, 
    title: "", 
    category: "", 
    content: "", 
    imageCloudUrl: "" // Thêm trường imageCloudUrl
  });
  const [showForm, setShowForm] = useState(false);

  const formatDate = (apiDate) => {
    const date = new Date(apiDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Fetch blogs when the component mounts
  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then((response) => response.json())
      .then((data) => {
        const formattedBlogs = data.content.map((blog) => ({
          ...blog,
          createdAt: formatDate(blog.createdAt),
        }));
        setBlogs(formattedBlogs);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const handleDeleteBlog = (id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Blog deleted successfully!");
          setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        } else {
          throw new Error("Unable to delete the blog.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while deleting the blog!");
        console.error("Error deleting blog:", error);
      });
  };

  const handleEditBlog = (blog) => {
    setCurrentBlog(blog);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBlog({ ...currentBlog, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (isEditing) {
      fetch(`http://localhost:8080/api/posts/${currentBlog.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentBlog),
      })
        .then((response) => response.json())
        .then((updatedBlog) => {
          setBlogs((prevBlogs) =>
            prevBlogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
          );
          toast.success("Blog updated successfully!");
          setShowForm(false);
          setIsEditing(false);
        })
        .catch((error) => {
          toast.error("An error occurred while updating the blog!");
          console.error("Error updating blog:", error);
        });
    } else {
      // Thêm blog mới (nếu cần)
      fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentBlog),
      })
        .then((response) => response.json())
        .then((newBlog) => {
          setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
          toast.success("Blog added successfully!");
          setShowForm(false);
        })
        .catch((error) => {
          toast.error("An error occurred while adding the blog!");
          console.error("Error adding blog:", error);
        });
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">{isEditing ? "Edit Blog" : "Add Blog"}</h3>
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
              type="text"
              name="category"
              value={currentBlog.category}
              onChange={handleInputChange}
              required
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              name="content"
              value={currentBlog.content}
              onChange={handleInputChange}
              required
              className="border rounded w-full px-3 py-2"
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="text"
              name="imageCloudUrl"
              value={currentBlog.imageCloudUrl}
              onChange={handleInputChange}
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            {isEditing ? "Update Blog" : "Add Blog"}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="bg-gray-500 text-white px-4 py-2 ml-2 rounded"
          >
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
              <td className="py-6 px-8">{blog.createdAt}</td>
              <td className="py-6 px-8">
                <button
                  onClick={() => handleEditBlog(blog)}
                  className="bg-white border-white text-blue-500 hover:text-blue-700 mx-1"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="bg-white border-white text-red-500 hover:text-red-700 mx-1"
                >
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
