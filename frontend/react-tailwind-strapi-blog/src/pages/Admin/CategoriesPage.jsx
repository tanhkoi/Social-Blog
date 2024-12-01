import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: null, name: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch categories from the API
    fetch("http://localhost:8080/api/posts")
      .then((response) => response.json())
      .then((data) => {
        // Lấy danh sách category từ các bài blog
        const categorySet = new Set();
        data.content.forEach((blog) => {
          if (blog.category) {
            categorySet.add(blog.category); // Giả sử blog có trường category
          }
        });
        setCategories([...categorySet].map((category, index) => ({
          id: index + 1,
          name: category,
        })));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setCategories(categories.map((cat) => (cat.id === currentCategory.id ? currentCategory : cat)));
    } else {
      setCategories([...categories, { ...currentCategory, id: categories.length + 1 }]);
    }
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">{isEditing ? "Edit Category" : "Add New Category"}</h3>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Category Name</label>
            <input
              type="text"
              name="name"
              value={currentCategory.name}
              onChange={handleInputChange}
              required
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            {isEditing ? "Update Category" : "Add Category"}
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
            <th className="py-6 px-8 text-left">Category Name</th>
            <th className="py-6 px-8 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id} className="border-b">
              <td className="py-6 px-8">{index + 1}</td>
              <td className="py-6 px-8">{category.name}</td>
              <td className="py-6 px-8">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="bg-white border-white text-blue-500 hover:text-blue-700 mx-1"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
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

export default CategoriesPage;
