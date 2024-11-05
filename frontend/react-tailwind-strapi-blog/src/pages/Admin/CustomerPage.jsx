import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const initialCustomers = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210" },
];

const CustomerPage = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({ id: null, name: "", email: "", phone: "" });
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  const handleAddCustomer = () => {
    setCurrentCustomer({ id: null, name: "", email: "", phone: "" });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditCustomer = (customer) => {
    setCurrentCustomer(customer);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setCustomers(customers.map(cust => (cust.id === currentCustomer.id ? currentCustomer : cust)));
    } else {
      setCustomers([...customers, { ...currentCustomer, id: customers.length + 1 }]);
    }
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      <button onClick={handleAddCustomer} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        <FontAwesomeIcon icon={faPlus} /> Add Customer
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">{isEditing ? "Edit Customer" : "Add New Customer"}</h3>
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
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={currentCustomer.phone}
              onChange={handleInputChange}
              required
              className="border rounded w-full px-3 py-2"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            {isEditing ? "Update Customer" : "Add Customer"}
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
            <th className="py-6 px-8 text-left">Name</th>
            <th className="py-6 px-8 text-left">Email</th>
            <th className="py-6 px-8 text-left">Phone</th>
            <th className="py-6 px-8 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id} className="border-b">
              <td className="py-6 px-8">{index + 1}</td>
              <td className="py-6 px-8">{customer.name}</td>
              <td className="py-6 px-8">{customer.email}</td>
              <td className="py-6 px-8">{customer.phone}</td>
              <td className="py-6 px-8">
                <button onClick={() => handleEditCustomer(customer)} className="text-blue-500 hover:text-blue-700 mx-1">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDeleteCustomer(customer.id)} className="text-red-500 hover:text-red-700 mx-1">
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
