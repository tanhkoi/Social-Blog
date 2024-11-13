// CommentButton.jsx
import { FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CommentButton = ({ blogId }) => {
  return (
    <Link to={`/blog/${blogId}`} className="flex items-center space-x-1 cursor-pointer hover:text-blue-500">
      <FaComment />
      <span>comments</span>
    </Link>
  );
};

CommentButton.propTypes = {
  blogId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CommentButton;
