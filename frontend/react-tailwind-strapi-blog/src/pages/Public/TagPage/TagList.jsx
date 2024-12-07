import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../../components/Header/NavBar";
import SideBar from "../../../components/Sidebar/SideBar";
import BlogList from "../../../components/Blog/BlogList"; // Đảm bảo bạn đã import BlogList

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
    <div className="bg-white min-h-screen text-black">
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
                <BlogList blogs={blogs} setBlogs={setBlogs} layout="grid" />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TagList;
