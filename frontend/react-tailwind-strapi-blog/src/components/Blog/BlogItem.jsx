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
    <div className="bg-[#1c1f26] rounded-xl overflow-hidden drop-shadow-md border border-gray-600 relative">
      <Link to={`/blog/${blog.id}`}>
        <img
          className="h-56 w-full object-cover"
          src={blog.imageCloudUrl}
          alt="Blog cover"
        />
        {/* Like and Save buttons positioned on top of the image */}
        <div className="absolute top-4 right-4 flex-col space-y-3 z-10">
          <LikeButton
            blogId={blog.id}
            likes={likes}
            isLiked={isLiked}
            setLikes={setLikes}
            setIsLiked={setIsLiked}
            setBlogs={setBlogs}
          />
          <SaveButton
            blog={blog}
            setBlogs={setBlogs}
            isSaved={isSaved}
            setIsSaved={setIsSaved}
          />
        </div>
        <div className="p-4">
          <h3 className="text-white font-bold text-2xl my-1 mb-10">{blog.title}</h3>    
        </div>
		<div className="absolute bottom-0 left-0 p-4 flex items-center space-x-3 bg-gradient-to-t from-black via-transparent to-transparent">
      <img
        className="w-8 h-8 rounded-full object-cover"
        src={blog.author.profilePicture}
        alt="Author"
      />
      <h1 className="font-bold text-lg text-white">{blog.author.name}</h1>
    </div>
      </Link>
    </div>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    imageCloudUrl: PropTypes.string,
    likeCnt: PropTypes.number, // Initial like count
    liked: PropTypes.bool, // Initial liked state
    isSaved: PropTypes.bool,
    saved: PropTypes.bool,
    author: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      profilePicture: PropTypes.string,
    }),
  }).isRequired,
  setBlogs: PropTypes.func.isRequired, // Function to update blogs list
};

export default BlogItem;
