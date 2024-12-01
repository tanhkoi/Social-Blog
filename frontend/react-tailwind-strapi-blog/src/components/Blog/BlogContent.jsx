import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentButton from "../Button/CommentButton";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";

const BlogContent = ({ content }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false); 
  const sanitizedContent = DOMPurify.sanitize(content);

  // Fetch blog data when component mounts
  useEffect(() => {
    const fetchBlogData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const blogData = await response.json();
        setBlog(blogData);
        // Kiểm tra xem người dùng hiện tại có đang theo dõi tác giả hay không
        // setIsFollowing(blogData.author.isFollowedByCurrentUser); // Giả sử API trả về thông tin này
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
    <div className="w-full pb-10 bg-[#0E1217] mt-10">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1 md:gap-x-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-20 text-black">
          <div className="col-span-2 text-white">
            <img
              className="h-80 w-full object-contant"
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
            <a href={`/profile/${blog.author.id}`} className="flex justify-center">
      <img
        className="p-2 w-32 h-32 rounded-full mx-auto object-cover"
        src={blog.author.profilePicture}
        alt="Author"
      />
    </a>
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

        {/* Comment Button */}
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