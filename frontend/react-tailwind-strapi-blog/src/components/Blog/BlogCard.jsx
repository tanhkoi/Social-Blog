import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const BlogCard = ({ blog, category, title, imageUrl }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/blog/${blog.id}`); // Điều hướng đến trang blogcontent
  };

  return (
    <div
      onClick={handleNavigation}
      className="border border-gray-100 rounded-lg overflow-hidden w-72 m-2 hover:shadow-xl hover:scale-[1.02] transition transform duration-300 cursor-pointer"
    >
      <img src={imageUrl} alt={title} className="w-full h-44 object-cover" />
      <div className="p-2">
        <p className="text-xs text-gray-500">{category}</p>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
    </div>
  );
};

export default BlogCard;
