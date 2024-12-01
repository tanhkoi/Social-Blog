import PropTypes from "prop-types";
import { FaUserPlus, FaUserTimes } from "react-icons/fa";

const FollowButton = ({ userId, isFollowing, setIsFollowing, setFollowingUsers }) => {
    const token = localStorage.getItem("token");

    const handleToggleFollow = async (e) => {
        e.stopPropagation();

        if (!token) {
            alert("Bạn cần đăng nhập.");
            return;
        }

        const url = `http://localhost:8080/api/follows/${userId}`;
        const method = isFollowing ? "DELETE" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setIsFollowing(!isFollowing);

                // Cập nhật danh sách followingUsers
                setFollowingUsers((prevUsers) =>
                    isFollowing
                        ? prevUsers.filter((id) => id !== userId)
                        : [...prevUsers, userId]
                );
            } else {
                const errorData = await response.json();
                console.error("Lỗi từ API:", errorData.message || "Không thể cập nhật trạng thái follow.");
                alert(errorData.message || "Không thể cập nhật trạng thái follow.");
            }
        } catch (error) {
            console.error("Lỗi kết nối API:", error);
            alert("Lỗi kết nối API. Vui lòng thử lại.");
        }
    };

    return (
        <div
            onClick={handleToggleFollow}
            className={`flex items-center space-x-1 cursor-pointer ${
                isFollowing ? "text-blue-500" : "hover:text-blue-500"
            }`}
        >
            {isFollowing ? <FaUserTimes /> : <FaUserPlus />}
            <span>{isFollowing ? "Unfollow" : "Follow"}</span>
        </div>
    );
};

FollowButton.propTypes = {
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    // isFollowing: PropTypes.bool.isRequired,
    // setIsFollowing: PropTypes.func.isRequired,
    // setFollowingUsers: PropTypes.func.isRequired,
};

export default FollowButton;
