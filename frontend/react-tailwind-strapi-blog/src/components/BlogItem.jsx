import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaComment, FaBookmark } from "react-icons/fa";
import PropTypes from "prop-types";

const BlogItem = ({ blog, setBlogs }) => {
  const [likes, setLikes] = useState(blog.likes || 110);
  const [isSaved, setIsSaved] = useState(blog.isSaved || false);

  const handleLike = (e) => {
    e.stopPropagation();
    const newLikes = likes + 1;
    setLikes(newLikes);

    setBlogs((prevBlogs) =>
      prevBlogs.map((b) => (b.id === blog.id ? { ...b, likes: newLikes } : b))
    );
  };

  const handleSave = (e) => {
    e.stopPropagation();
    const newIsSaved = !isSaved;
    setIsSaved(newIsSaved);

    setBlogs((prevBlogs) =>
      prevBlogs.map((b) => (b.id === blog.id ? { ...b, isSaved: newIsSaved } : b))
    );
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden drop-shadow-md">
      <Link to={`/blog/${blog.id}`}>
        <img className="h-56 w-full object-cover" src={blog.coverImg} alt="Blog cover" />
        <div className="p-4">
          <h3 className="font-bold text-2xl my-1">{blog.title}</h3>
          <p className="text-gray-600 text-xl">{blog.desc}</p>
        </div>
      </Link>
      <div className="p-4 flex items-center space-x-4 text-gray-500">
        <div onClick={handleLike} className="flex items-center space-x-1 cursor-pointer hover:text-red-500">
          <FaHeart />
          <span>{likes}</span>
        </div>
        <Link to={`/blog/${blog.id}`} className="flex items-center space-x-1 cursor-pointer hover:text-blue-500">
          <FaComment />
          <span>comments</span>
        </Link>
        <div onClick={handleSave} className="flex items-center space-x-1 cursor-pointer hover:text-yellow-500">
          <FaBookmark />
          <span>{isSaved ? "Saved" : "Save"}</span>
        </div>
      </div>
    </div>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    coverImg: PropTypes.string.isRequired,
    likes: PropTypes.number,
    isSaved: PropTypes.bool,
  }).isRequired,
  setBlogs: PropTypes.func.isRequired,
};

export default BlogItem;