import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentButton from "../Button/CommentButton"; // Import CommentButton
import DOMPurify from "dompurify";
import PropTypes from "prop-types";

const BlogContent = ({ content }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const sanitizedContent = DOMPurify.sanitize(content);

  // Lấy bài viết từ localStorage khi component mount
  useEffect(() => {
    const fetchBlogData = async () => {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      try {
        const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const blogData = await response.json();
        setBlog(blogData); // Cập nhật blog vào state
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogData();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full pb-10 bg-[#0E1217] text- mt-10">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1 md:gap-x-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-20 md:mt-0 ss:pt-20 text-black">
          <div className="col-span-2 text-white">
            <img
              className="h-80 w-full object-contant "
              src={blog.imageCloudUrl}
              alt="Blog cover"
            />
            <h1 className="font-bold text-2xl my-1 pt-5">{blog.title}</h1>
            <div className="pt-5 text-justify">
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              ></div>
            </div>
          </div>
          <div className="items-center w-full bg-zinc-900 rounded-xl drop-shadow-md py-5 max-h-[250px]">
            <div>
              <img
                className="p-2 w-32 h-32 rounded-full mx-auto object-cover text-justify"
                src={blog.author.profilePicture}
                alt="Author"
              />
              <h1 className="font-bold text-2xl text-center text-white pt-3">
                {blog.author.name}
              </h1>
              <p className="text-center text-white font-medium">
                {blog.author.email}
              </p>
              <div className="text-center pt-4">
              </div>
            </div>
          </div>
        </div>
        <CommentButton blogId={id} />
      </div>
    </div>
  );
};
BlogContent.propTypes = {
  content: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default BlogContent;
