import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({
    id: null,
    name: "",
    email: "",
    userRole: ""
  });
  const [showForm, setShowForm] = useState(false);

  // Lấy dữ liệu khách hàng từ API
  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      try {
        const response = await fetch("http://localhost:8080/api/admin/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Thêm token vào headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCustomers(data); // Gán dữ liệu khách hàng
        } else {
          console.error("Failed to fetch customers:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  const handleEditCustomer = (customer) => {
    setCurrentCustomer(customer);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteCustomer = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/users/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        setCustomers(customers.filter((customer) => customer.id !== id));
      } else {
        console.error("Failed to delete customer:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/admin/users/${currentCustomer.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(currentCustomer),
          }
        );

        if (response.ok) {
          const updatedCustomer = await response.json();
          setCustomers(
            customers.map((cust) =>
              cust.id === updatedCustomer.id ? updatedCustomer : cust
            )
          );
          setIsEditing(false);
        } else {
          console.error("Failed to update customer:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating customer:", error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:8080/api/admin/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(currentCustomer),
        });

        if (response.ok) {
          const newCustomer = await response.json();
          setCustomers([...customers, newCustomer]);
        } else {
          console.error("Failed to add customer:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding customer:", error);
      }
    }

    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customers</h2>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">
            {isEditing ? "Edit Customer" : "Add New Customer"}
          </h3>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={currentCustomer.name}
              onChange={handleInputChange}
              required
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={currentCustomer.email}
              onChange={handleInputChange}
              required
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              type="text"
              name="userRole"
              value={currentCustomer.userRole}
              onChange={handleInputChange}
              required
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {isEditing ? "Update Customer" : "Add Customer"}
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
            <th className="py-6 px-8 text-left">Name</th>
            <th className="py-6 px-8 text-left">Email</th>
            <th className="py-6 px-8 text-left">Role</th>
            <th className="py-6 px-8 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id} className="border-b">
              <td className="py-6 px-8">{index + 1}</td>
              <td className="py-6 px-8">{customer.name}</td>
              <td className="py-6 px-8">{customer.email}</td>
              <td className="py-6 px-8">{customer.userRole}</td>
              <td className="py-6 px-8">
                <button
                  onClick={() => handleEditCustomer(customer)}
                  className="bg-white border-white text-blue-500 hover:text-blue-700 mx-1"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDeleteCustomer(customer.id)}
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

export default CustomerPage;
