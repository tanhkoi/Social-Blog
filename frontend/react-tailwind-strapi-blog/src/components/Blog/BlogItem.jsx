import { Link } from 'react-router-dom';
import { FaComment } from 'react-icons/fa';
import PropTypes from 'prop-types';
import SaveButton from '../Button/SaveButton';
import LikeButton from '../Button/LikeButton';
import { useState } from 'react';

const BlogItem = ({ blog, setBlogs }) => {
	// Local state for likes and isLiked
	const [likes, setLikes] = useState(blog.likeCnt || 0);
	const [isLiked, setIsLiked] = useState(blog.liked || false);
	const [isSaved, setIsSaved] = useState(blog.saved || false);

	return (
		<div className="bg-[#1c1f26] rounded-xl overflow-hidden drop-shadow-md border border-gray-600">
			<Link to={`/blog/${blog.id}`}>
				<img className="h-56 w-full object-cover" src={blog.imageCloudUrl} alt="Blog cover" />
				<div className="p-4">
					<h3 className="text-white font-bold text-2xl my-1">{blog.title}</h3>
				</div>
			</Link>
			<div className="p-4 flex items-center space-x-4 text-gray-500">
				<LikeButton blogId={blog.id} likes={likes} isLiked={isLiked} setLikes={setLikes} setIsLiked={setIsLiked} setBlogs={setBlogs} />
				<Link to={`/blog/${blog.id}`} className="flex items-center space-x-1 cursor-pointer hover:text-blue-500">
					<FaComment />
					<span>comments</span>
				</Link>
				<SaveButton blog={blog} setBlogs={setBlogs} isSaved={isSaved} setIsSaved={setIsSaved} />
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
		likeCnt: PropTypes.number, // Initial like count
		liked: PropTypes.bool, // Initial liked state
		isSaved: PropTypes.bool,
	}).isRequired,
	setBlogs: PropTypes.func.isRequired, // Function to update blogs list
};

export default BlogItem;
