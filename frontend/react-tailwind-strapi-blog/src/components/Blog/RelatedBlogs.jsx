import BlogCard from "./BlogCard";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const RelatedBlogs = ({ tag }) => {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:8080/api/posts/related/${tag}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const data = await response.json();
        setBlogs(data.content);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogData();
  }, [tag]);

  return (
    <div className="related-blogs text-lg">
      <h2 className="font-bold mt-5 mb-4">Bài viết nổi bật khác</h2>
      <div className="blogs-container flex flex-wrap gap-4">
        {blogs?.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            category={blog.category}
            title={blog.title}
            imageUrl={blog.imageCloudUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedBlogs;
