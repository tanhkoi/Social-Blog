import { FaHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';

const LikeButton = ({ blogId, likes, isLiked, setLikes, setIsLiked, setBlogs }) => {
	const token = localStorage.getItem('token');

	const handleToggleLike = async (e) => {
		e.stopPropagation();

		if (!token) {
			alert('Bạn cần đăng nhập.');
			return;
		}

		const url = `http://localhost:8080/api/likes/post/${blogId}`;
		const method = isLiked ? 'DELETE' : 'POST';

		try {
			const response = await fetch(url, {
				method,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const data = await response.json();
				alert(data.message || 'Lỗi khi like/unlike bài viết');
				return;
			}

			// Update the likes and isLiked state
			const newLikes = isLiked ? likes - 1 : likes + 1;
			setLikes(newLikes);
			setIsLiked(!isLiked);

			// Update blogs list in the parent
			setBlogs((prevBlogs) => prevBlogs.map((blog) => (blog.id === blogId ? { ...blog, likes: newLikes, isLiked: !isLiked } : blog)));
		} catch (error) {
			console.error('Lỗi khi like/unlike:', error);
		}
	};

	return (
		<div onClick={handleToggleLike} className={`flex items-center space-x-1 cursor-pointer ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}>
			<FaHeart />
			<span>{likes}</span>
		</div>
	);
};

LikeButton.propTypes = {
	blogId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	likes: PropTypes.number.isRequired,
	isLiked: PropTypes.bool.isRequired,
	setLikes: PropTypes.func.isRequired,
	setIsLiked: PropTypes.func.isRequired,
	setBlogs: PropTypes.func.isRequired,
};

export default LikeButton;
