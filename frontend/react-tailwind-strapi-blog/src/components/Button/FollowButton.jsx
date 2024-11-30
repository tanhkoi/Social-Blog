import PropTypes from 'prop-types';
import { FaUserPlus, FaUserTimes } from 'react-icons/fa';

const FollowButton = ({ userId, isFollowing, setIsFollowing }) => {
  const token = localStorage.getItem('token');

  const handleToggleFollow = async (e) => {
    e.stopPropagation();

    if (!token) {
      alert('You need to be logged in.');
      return;
    }

    const url = `http://localhost:8080/api/follows/${userId}`;
    const method = isFollowing ? 'DELETE' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Cập nhật trạng thái theo dõi cục bộ
        const updatedFollowing = !isFollowing;
        setIsFollowing(updatedFollowing); 

      } else {
        const data = await response.json();
        alert(data.message || 'Error while following/unfollowing user');
      }
    } catch (error) {
      console.error('Error connecting to API:', error);
      alert('Error connecting to the API, please try again.');
    }
  };

  return (
    <div
      onClick={handleToggleFollow}
      className={`flex items-center space-x-1 cursor-pointer ${
        isFollowing ? 'text-blue-500' : 'hover:text-blue-500'
      }`}
    >
      {isFollowing ? <FaUserTimes /> : <FaUserPlus />}
      <span>{isFollowing ? 'Unfollow' : 'Follow'}</span>
    </div>
  );
};

FollowButton.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isFollowing: PropTypes.bool.isRequired,
  setIsFollowing: PropTypes.func.isRequired,
};

export default FollowButton;