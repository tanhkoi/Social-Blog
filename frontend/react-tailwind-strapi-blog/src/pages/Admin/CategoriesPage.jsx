import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const initialCategories = [
  { id: 1, name: "Technology", description: "All about technology" },
  { id: 2, name: "Health", description: "Health and wellness topics" },
  { id: 3, name: "Finance", description: "Financial news and tips" },
];

const CategoriesPage = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: null, name: "", description: "" });
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const handleAddCategory = () => {
    setCurrentCategory({ id: null, name: "", description: "" });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setCategories(categories.map(cat => (cat.id === currentCategory.id ? currentCategory : cat)));
    } else {
      setCategories([...categories, { ...currentCategory, id: categories.length + 1 }]);
    }
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <button
        onClick={handleAddCategory}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        <FontAwesomeIcon icon={faPlus} /> Add Category
      </button>

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
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={currentCategory.description}
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

      <table className=" bg-white border border-gray-200 rounded shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-6 px-8 text-left">#</th>
            <th className="py-6 px-8 text-left">Category Name</th>
            <th className="py-6 px-8 text-left">Description</th>
            <th className="py-6 px-8 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id} className="border-b">
              <td className="py-6 px-8">{index + 1}</td>
              <td className="py-6 px-8">{category.name}</td>
              <td className="py-6 px-8">{category.description}</td>
              <td className="py-6 px-8">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="text-blue-500 hover:text-blue-700 mx-1"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-500 hover:text-red-700 mx-1"
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
