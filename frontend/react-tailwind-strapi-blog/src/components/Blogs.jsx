import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaComment, FaBookmark } from "react-icons/fa";
import PropTypes from "prop-types"; // Import PropTypes

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs"));
    if (savedBlogs && Array.isArray(savedBlogs)) {
      setBlogs(savedBlogs);
    }
  }, []);

  // Đồng bộ hóa lại dữ liệu blogs với localStorage mỗi khi blogs thay đổi
  useEffect(() => {
    if (blogs.length > 0) {
      localStorage.setItem("blogs", JSON.stringify(blogs));
    }
  }, [blogs]);

  return (
    <div className="w-full bg-[#f9f9f9] py-[50px] mt-10">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8 px-4 text-black">
          {blogs.map((blog) => (
            <BlogItem key={blog.id} blog={blog} setBlogs={setBlogs} />
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogItem = ({ blog, setBlogs }) => {
  const [likes, setLikes] = useState(blog.likes || 110); // Đặt giá trị mặc định từ blog nếu có
  const [isSaved, setIsSaved] = useState(blog.isSaved || false); // Đặt giá trị mặc định từ blog nếu có

  const handleLike = (e) => {
    e.stopPropagation();
    const newLikes = likes + 1;
    setLikes(newLikes);

    // Cập nhật lại blogs trong state và localStorage
    setBlogs((prevBlogs) =>
      prevBlogs.map((b) => (b.id === blog.id ? { ...b, likes: newLikes } : b))
    );
  };

  const handleSave = (e) => {
    e.stopPropagation();
    const newIsSaved = !isSaved;
    setIsSaved(newIsSaved);

    // Cập nhật lại blogs trong state và localStorage
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
    likes: PropTypes.number, // Validation cho likes
    isSaved: PropTypes.bool, // Validation cho isSaved
  }).isRequired,
  setBlogs: PropTypes.func.isRequired, // Validation cho setBlogs
};

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired, // Validation cho blogs nếu truyền vào như prop (nếu có)
};

export default Blogs;
