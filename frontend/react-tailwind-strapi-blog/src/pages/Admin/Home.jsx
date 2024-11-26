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

const Home = () => {
  const [blogsByMonth, setBlogsByMonth] = useState([]);
  const [blogsByCategory, setBlogsByCategory] = useState([]);
  const [blogsCount, setBlogsCount] = useState(0);
  const [ setData] = useState([]);

  useEffect(() => {
  fetch("http://localhost:8080/api/posts")
    .then((response) => response.json())
    .then((data) => {
      setBlogsCount(data.length); // Tổng số bài viết

      // Tính số lượng bài viết theo từng tháng
      const months = Array(12).fill(0);
      data.forEach((blog) => {
        const month = new Date(blog.createdAt).getMonth();
        months[month]++;
      });
      const blogsByMonthData = months.map((count, index) => ({
        name: `Month ${index + 1}`,
        count,
      }));
      setBlogsByMonth(blogsByMonthData);

      // Tính số lượng bài viết theo danh mục
      const categoryCount = {};
      data.forEach((blog) => {
        const category = blog.category;
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });
      const blogsByCategoryData = Object.entries(categoryCount).map(
        ([category, count]) => ({
          name: category,
          count: Math.floor(count), // Đảm bảo số lượng bài viết là số nguyên
        })
      );
      setBlogsByCategory(blogsByCategoryData);

      // Dữ liệu giả cho biểu đồ đường
      setData(
        data.map((_, index) => ({
          name: `Page ${String.fromCharCode(65 + index)}`,
          uv: Math.floor(Math.random() * 4000) + 1000,
          pv: Math.floor(Math.random() * 4000) + 1000,
        }))
      );
    })
    .catch((error) => console.error("Error fetching data:", error));
}, []);


  return (
    <main style={{ padding: "20px", backgroundColor: "#f4f5f7" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#263043" }}>
          DASHBOARD
        </h3>
      </div>

      {/* Thống kê chính */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div
          style={{
            flex: "1",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h3 style={{ fontSize: "18px", color: "#263043" }}>BLOGS</h3>
            <BsFillArchiveFill style={{ fontSize: "24px", color: "#8884d8" }} />
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#263043" }}>
            {blogsCount}
          </h1>
        </div>

        <div
          style={{
            flex: "1",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h3 style={{ fontSize: "18px", color: "#263043" }}>CATEGORIES</h3>
            <BsFillGrid3X3GapFill
              style={{ fontSize: "24px", color: "#82ca9d" }}
            />
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#263043" }}>
            {blogsByCategory.length}
          </h1>
        </div>

        <div
          style={{
            flex: "1",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h3 style={{ fontSize: "18px", color: "#263043" }}>USER</h3>
            <BsFillBellFill style={{ fontSize: "24px", color: "#f39c12" }} />
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#263043" }}>
            42
          </h1>
        </div>
      </div>

      {/* Biểu đồ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          height: "400px",
        }}
      >
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
