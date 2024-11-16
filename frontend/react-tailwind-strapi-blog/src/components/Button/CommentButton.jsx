import { FaHeart } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const CommentButton = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [activeCommentId, setActiveCommentId] = useState(null);
  const menuRef = useRef(null); // Dùng ref để theo dõi menu

  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:8080/api/comments/${blogId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const commentsData = await response.json();
        setComments(commentsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [blogId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveCommentId(null); // Ẩn menu khi nhấn ra ngoài
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCommentSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = { content: commentText };
      try {
        const response = await fetch(`http://localhost:8080/api/comments/${blogId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newComment),
        });

        if (response.ok) {
          const savedComment = await response.json();
          setComments([...comments, savedComment]);
          setCommentText("");
        } else {
          throw new Error("Failed to post comment");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

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

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, likes: newLikes, isLiked: !isLiked }
            : comment
        )
      );
    } catch (error) {
      console.error(isLiked ? "Error unliking comment:" : "Error liking comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/comment/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      setActiveCommentId(null);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const toggleMenu = (commentId) => {
    setActiveCommentId((prev) => (prev === commentId ? null : commentId));
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
        <button type="submit" className="hidden">
          Submit
        </button>
      </form>

      <div className="space-y-2 mt-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-zinc-900 text-white p-2 rounded-md flex justify-between items-center">
            <div>
              <p className="text-lg font-bold text-white">{comment.user.username}</p>
              <p>{comment.content}</p>
              <span className="text-sm text-white">{comment.createdAt}</span>
            </div>
            <div className="flex space-x-4 items-center relative">
              <div
                onClick={() => handleToggleLike(comment.id, comment.isLiked, comment.likes)}
                className={`flex items-center space-x-1 cursor-pointer ${
                  comment.isLiked ? "text-red-500" : "hover:text-red-500"
                }`}
              >
                <FaHeart />
                <span>{comment.likes}</span>
              </div>
              <button
                onClick={() => toggleMenu(comment.id)}
                className="text-white bg-zinc-900 border-gray-300 hover:text-gray-400 focus:outline-none"
              >
                ...
              </button>
              {activeCommentId === comment.id && (
                <div
                  ref={menuRef} // Gắn ref vào menu
                  className="absolute right-0 bg-gray-800 text-white border border-gray-700 rounded shadow-lg mt-2"
                >
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="px-4 py-2 bg-zinc-900 hover text-sm"
                  >
                    Delete comment
                  </button>
                </div>
              )}
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
