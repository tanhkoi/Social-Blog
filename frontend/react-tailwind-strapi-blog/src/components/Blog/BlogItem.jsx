import { Link } from "react-router-dom";
import { FaComment } from "react-icons/fa";
import PropTypes from "prop-types";
import SaveButton from "../Button/SaveButton";
import LikeButton from "../Button/LikeButton";

const BlogItem = ({ blog, setBlogs }) => {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden drop-shadow-md">
      <Link to={`/blog/${blog.id}`}>
        <img
          className="h-56 w-full object-cover"
          src={blog.imvageCloudUrl}
          alt="Blog cover"
        />
        <div className="p-4">
          <h3 className="text-white font-bold text-2xl my-1">{blog.title}</h3>
        </div>
      </Link>
      <div className="p-4 flex items-center space-x-4 text-gray-500">
      <LikeButton blog={blog} setBlogs={setBlogs} />
        <Link
          to={`/blog/${blog.id}`}
          className="flex items-center space-x-1 cursor-pointer hover:text-blue-500"
        >
          <FaComment />
          <span>comments</span>
        </Link>
        <SaveButton blog={blog} setBlogs={setBlogs} />
      </div>
    </div>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    imageCloudUrl: PropTypes.string,
    likes: PropTypes.number, // Số lượt thích
    isLiked: PropTypes.bool,
    isSaved: PropTypes.bool,
  }).isRequired,
  setBlogs: PropTypes.func.isRequired, // Hàm để cập nhật danh sách blog
};

export default BlogItem;
