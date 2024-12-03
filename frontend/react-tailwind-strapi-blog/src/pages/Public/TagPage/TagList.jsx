import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../../../components/Header/NavBar";
import SideBar from "../../../components/Sidebar/SideBar";

const TagList = () => {
  const { categoryName } = useParams(); // Lấy category từ URL
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State để theo dõi trạng thái loading

  useEffect(() => {
    // Fetch các bài blog từ API
    fetch("http://localhost:8080/api/posts")
      .then((response) => response.json())
      .then((data) => {
        // Lọc các bài blog có category trùng với categoryName
        const filteredBlogs = data.content.filter(
          (blog) => blog.category === categoryName
        );
        setBlogs(filteredBlogs); // Lưu dữ liệu blog vào state
        setIsLoading(false); // Cập nhật trạng thái loading sau khi lấy dữ liệu xong
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Dù có lỗi hay không, hãy dừng trạng thái loading
      });
  }, [categoryName]);

  return (
    <div className="bg-[#0E1217] min-h-screen text-white">
      <header>
        <NavBar />
      </header>
      <main>
        <div className="flex">
          <aside className="w-60">
            <SideBar />
          </aside>
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold mb-4 mt-20">
              Blogs in #{categoryName}
            </h2>
            <div className="space-y-4">
              {isLoading ? (
                <p>Loading...</p> // Hiển thị "Loading..." khi đang tải dữ liệu
              ) : (
                blogs.map((blog) => (
                    <Link
                    key={blog.id} // Thêm key cho Link
                    to={`/blog/${blog.id}`} // Tạo liên kết đến trang chi tiết của bài blog
                  >
                    <div className="bg-[#1c1f26] p-4 mb-2 ">
                      <h3 className="text-xl font-semibold">{blog.title}</h3>
                      <p>{blog.excerpt}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TagList;
