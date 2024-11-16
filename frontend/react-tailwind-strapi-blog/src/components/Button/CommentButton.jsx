import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CommentButton = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  // Lấy bình luận từ API khi component mount
  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:8080/api/comments/${blogId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const commentsData = await response.json();
        setComments(commentsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [blogId]);

  // Xử lý gửi bình luận mới
  const handleCommentSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = { content: commentText };
      try {
        const response = await fetch(`http://localhost:8080/api/comments/${blogId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(newComment),
        });

        if (response.ok) {
          const savedComment = await response.json();
          setComments([...comments, savedComment]);
          setCommentText("");
        } else {
          throw new Error('Failed to post comment');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Xử lý like comment
  const handleToggleLike = async (commentId, isLiked, likes) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập.");
      return;
    }

    const url = `http://localhost:8080/api/likes/comment/${commentId}`;
    const method = isLiked ? "DELETE" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(isLiked ? "Failed to unlike the comment" : "Failed to like the comment");
      }

      const newLikes = isLiked ? likes - 1 : likes + 1;

      // Cập nhật lại danh sách bình luận
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, likes: newLikes, isLiked: !isLiked }
            : comment
        )
      );

      // Cập nhật lại mảng likedComments trong localStorage
      const likedComments = JSON.parse(localStorage.getItem("likedComments")) || [];
      const updatedLikedComments = likedComments.filter((comment) => comment.id !== commentId);
      updatedLikedComments.push({ id: commentId, isLiked: !isLiked, likes: newLikes });
      localStorage.setItem("likedComments", JSON.stringify(updatedLikedComments));
      
    } catch (error) {
      console.error(isLiked ? "Error unliking comment:" : "Error liking comment:", error);
    }
  };

  return (
    <div className="mt-8 px-4 bg-zinc-950 border border-zinc-900 rounded-lg p-6">
      <h2 className="text-2xl text-white font-bold">Comments</h2>
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
          className="w-full p-2 bg-zinc-900 text-white border border-gray-300 rounded-md"
        />
        <button type="submit" className="hidden">Submit</button>
      </form>

      <div className="space-y-2 mt-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-zinc-900 text-white p-2 rounded-md flex justify-between items-center">
            <div>
              <p className="text-lg font-bold text-white">{comment.user.username}</p>
              <p>{comment.content}</p>
              <span className="text-sm text-white">{comment.createdAt}</span>
            </div>
            <div
              onClick={() => handleToggleLike(comment.id, comment.isLiked, comment.likes)}
              className={`flex items-center space-x-1 cursor-pointer ${comment.isLiked ? "text-red-500" : "hover:text-red-500"}`}
            >
              <FaHeart />
              <span>{comment.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

CommentButton.propTypes = {
  blogId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CommentButton;
