import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SaveButton from "../Button/SaveButton";
import LikeButton from "../Button/LikeButton";
import { useState } from "react";

const BlogItem = ({ blog, setBlogs }) => {
  // Local state for likes and isLiked
  const [likes, setLikes] = useState(blog.likeCnt || 0);
  const [isLiked, setIsLiked] = useState(blog.liked || false);
  const [isSaved, setIsSaved] = useState(blog.saved || false);

  return (
    <div className="relative flex items-center bg-white rounded-lg hover:shadow-md hover:scale-[1.02] transition transform duration-300  overflow-hidden">
      {/* Image on the left */}
      
      <div className="flex-shrink-0 w-1/4 h-36">
        <img
          className="w-full h-full object-cover rounded-l-lg"
          src={blog.imageCloudUrl}
          alt="Blog cover"
        />
      </div>

      {/* Content area */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        {/* Save Button at top-right */}
        <div className="absolute top-2 right-5">
          <SaveButton
            blog={blog}
            setBlogs={setBlogs}
            isSaved={isSaved}
            setIsSaved={setIsSaved}
          />
        </div>

        {/* Like Button at bottom-right */}
        <div className="absolute bottom-2 right-2">
          <LikeButton
            blogId={blog.id}
            likes={likes}
            isLiked={isLiked}
            setLikes={setLikes}
            setIsLiked={setIsLiked}
            setBlogs={setBlogs}
          />
        </div>

        {/* Blog content */}
        <Link to={`/blog/${blog.id}`} className="flex-1">
          {/* Category nằm trên cùng */}
          <span className="text-xl font-medium text-gray-500 block mb-2">
            {blog.category}
          </span>

          {/* Blog title */}
          <h3 className="text-2xl font-semibold text-black truncate">
            {blog.title}
          </h3>

          {/* Author and createdAt */}
          <div className="flex items-center space-x-3 pt-2">
            <img
              className="w-6 h-6 rounded-full object-cover"
              src={blog.author.profilePicture}
              alt="Author"
            />
            <h1 className="text-xs font-medium text-black">
              {blog.author.name}
            </h1>
            {/* Thêm ngày tạo blog */}
            <span className="text-xs text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString("en-GB")}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    category: PropTypes.string,
    imageCloudUrl: PropTypes.string,
    likeCnt: PropTypes.number,
    liked: PropTypes.bool,
    isSaved: PropTypes.bool,
    saved: PropTypes.bool,
    author: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      profilePicture: PropTypes.string,
    }),
  }).isRequired,
  setBlogs: PropTypes.func.isRequired,
};

export default BlogItem;
