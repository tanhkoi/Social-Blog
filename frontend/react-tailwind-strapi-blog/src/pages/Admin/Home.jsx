import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsFillBellFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogsByMonth, setBlogsByMonth] = useState([]);
  const [blogsByCategory, setBlogsByCategory] = useState([]);
  const [blogsCount, setBlogsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0); // State để lưu số lượng user
  const navigate = useNavigate();

  const handleNavigateToBlogPage = () => {
    navigate("/admin/products");
  };
  const handleNavigateToCustomerPage = () => {
    navigate("/admin/customers");
  };
  const handleNavigateToCategoriesPage = () => {
    navigate("/admin/categories");
  };

  useEffect(() => {
    // Fetch blogs
    fetch("http://localhost:8080/api/posts")
      .then((response) => response.json())
      .then((data) => {
        setBlogsCount(data.length);
        const filteredData = data.filter((blog) => {
          const blogDate = new Date(blog.createdAt);
          return blogDate.getMonth() === 10 || blogDate.getMonth() === 11;
        });
        const dailyCount = {};
        filteredData.forEach((blog) => {
          const blogDate = new Date(blog.createdAt);
          const day = String(blogDate.getDate()).padStart(2, "0"); 
          const month = String(blogDate.getMonth() + 1).padStart(2, "0"); 
          const formattedDate = `${day}/${month}`; 
          dailyCount[formattedDate] = (dailyCount[formattedDate] || 0) + 1;
        });

        const blogsByDayData = Object.entries(dailyCount).map(
          ([date, count]) => ({
            name: date,
            count,
          })
        );
        setBlogsByMonth(blogsByDayData);

        const categoryCount = {};
        data.forEach((blog) => {
          const category = blog.category;
          categoryCount[category] = (categoryCount[category] || 0) + 1;
        });
        const blogsByCategoryData = Object.entries(categoryCount).map(
          ([category, count]) => ({
            name: category,
            count: Math.floor(count),
          })
        );
        setBlogsByCategory(blogsByCategoryData);
      })
      .catch((error) => console.error("Error fetching blogs data:", error));

    // Fetch users
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    fetch("http://localhost:8080/api/admin/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Unauthorized: Invalid or expired token");
        }
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => setUsersCount(data.length))
      .catch((error) => console.error("Error fetching users data:", error));
  }, []);

  return (
    <main className="p-5 bg-gray-100">
      <div className="flex justify-center items-center mb-5">
        <h3 className="text-2xl font-bold text-[#263043]">DASHBOARD</h3>
      </div>
      <div className="flex gap-5 mb-7">
        <div
          className="flex-1 bg-white p-5 rounded-lg shadow-md cursor-pointer"
          onClick={handleNavigateToBlogPage}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg text-[#263043]">BLOGS</h3>
            <BsFillArchiveFill className="text-xl text-[#8884d8]" />
          </div>
          <h1 className="text-4xl font-bold text-[#263043]">{blogsCount}</h1>
        </div>

        <div
          className="flex-1 bg-white p-5 rounded-lg shadow-md cursor-pointer"
          onClick={handleNavigateToCategoriesPage}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg text-[#263043]">CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="text-xl text-[#82ca9d]" />
          </div>
          <h1 className="text-4xl font-bold text-[#263043]">
            {blogsByCategory.length}
          </h1>
        </div>

        <div
          className="flex-1 bg-white p-5 rounded-lg shadow-md cursor-pointer"
          onClick={handleNavigateToCustomerPage}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg text-[#263043]">USER</h3>
            <BsFillBellFill className="text-xl text-[#f39c12]" />
          </div>
          <h1 className="text-4xl font-bold text-[#263043]">{usersCount}</h1>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-2 gap-5 h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={blogsByMonth}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="count" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={blogsByCategory}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(tick) => Math.floor(tick)} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
};

export default Home;
