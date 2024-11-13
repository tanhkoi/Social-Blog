import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
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

const Home = () => {
  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <main style={{ padding: "20px", backgroundColor: "#f4f5f7" }}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
      }}>
        <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#263043" }}>DASHBOARD</h3>
      </div>

      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={{
          flex: "1",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}>
            <h3 style={{ fontSize: "18px", color: "#263043" }}>BLOGS</h3>
            <BsFillArchiveFill style={{ fontSize: "24px", color: "#8884d8" }} />
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#263043" }}>300</h1>
        </div>

        <div style={{
          flex: "1",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}>
            <h3 style={{ fontSize: "18px", color: "#263043" }}>CATEGORIES</h3>
            <BsFillGrid3X3GapFill style={{ fontSize: "24px", color: "#82ca9d" }} />
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#263043" }}>12</h1>
        </div>

        <div style={{
          flex: "1",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}>
            <h3 style={{ fontSize: "18px", color: "#263043" }}>CUSTOMERS</h3>
            <BsPeopleFill style={{ fontSize: "24px", color: "#8884d8" }} />
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#263043" }}>33</h1>
        </div>

        <div style={{
          flex: "1",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}>
            <h3 style={{ fontSize: "18px", color: "#263043" }}>ALERTS</h3>
            <BsFillBellFill style={{ fontSize: "24px", color: "#f39c12" }} />
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#263043" }}>42</h1>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        height: "400px",
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
};

export default Home;
