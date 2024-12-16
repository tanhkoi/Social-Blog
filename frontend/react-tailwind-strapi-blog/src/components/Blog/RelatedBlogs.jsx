import React from "react";
import BlogCard from "./BlogCard";
import { useState, useEffect } from "react";

const RelatedBlogs = ({ tag, postId }) => {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:8080/api/posts/related/${tag}/${postId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
  }, [])

  return (
    <div className="related-blogs">
      <h2>Bài viết nổi bật khác</h2>
      <div className="blogs-container">
        {blogs?.map((blog) => (
          <BlogCard
            key={blog.id}
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
