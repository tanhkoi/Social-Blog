import PropTypes from "prop-types";
import BlogItem from "./BlogItem";

const BlogList = ({ blogs, setBlogs }) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8 px-4 text-black">
      {blogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} setBlogs={setBlogs} />
      ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired, 
      desc: PropTypes.string, 
      coverImg: PropTypes.string, 
      likes: PropTypes.number, 
      isSaved: PropTypes.bool, 
    })
  ).isRequired,
  setBlogs: PropTypes.func.isRequired, 
};

export default BlogList;