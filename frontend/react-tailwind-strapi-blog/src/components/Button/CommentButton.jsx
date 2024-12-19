import { FaHeart, FaEllipsisV } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ReportButton from "../Button/ReportButton";

const CommentButton = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [activeCommentId, setActiveCommentId] = useState(null);
  const menuRef = useRef(null);

  const formatDate = (apiDate) => {
    const date = new Date(apiDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
        const formattedCommentsData = commentsData.map((item) => ({
          ...item,
          createdAt: formatDate(item.createdAt),
        }));
        setComments(formattedCommentsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [blogId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveCommentId(null);
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

  const handleToggleLike = async (commentId, isLiked) => {
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

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, liked: !isLiked } : comment
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
      const response = await fetch(`http://localhost:8080/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      setActiveCommentId(null); // Close the dropdown after deletion
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };


  const toggleDropdown = (commentId) => {
    setActiveCommentId((prev) => (prev === commentId ? null : commentId));
  };

  return (
    <div className="mt-8 px-4 bg-white border border-gray-300 rounded-lg p-6">
      <h2 className="text-2xl text-black font-bold">Comments</h2>
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
          className="w-full p-2 bg-white text-black border border-gray-300 rounded-lg"
        />
        <button type="submit" className="hidden">
          Submit
        </button>
      </form>

      <div className="space-y-2 mt-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="text-black p-2 rounded-md flex justify-between items-center border border-gray-200 shadow-sm"
          >
            <div>
              <p className="text-lg font-bold text-black">{comment.user.name}</p>
              <p className="text-justify mr-4">{comment.content}</p>
            </div>
            <div className="flex space-x-4 items-center relative">
              <p className="text-sm text-black text-right">{comment.createdAt}</p>
              <div
                onClick={() => handleToggleLike(comment.id, comment.liked)}
                className={`flex items-center space-x-1 cursor-pointer ${comment.liked ? "text-red-500" : "hover:text-red-500"
                  }`}
              >
                <FaHeart />
              </div>
              <button
                onClick={() => toggleDropdown(comment.id)}
                className="text-black bg-white border-white hover:text-gray-400 focus:outline-none"
              >
                <FaEllipsisV />
              </button>
              {activeCommentId === comment.id && (
                <div
                  ref={menuRef}
                  className="bg-white absolute right-0 text-black mt-20 w-40 z-50"
                >
                  <div className="border border-gray-600 rounded-xl">
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="mx-4 py-2 text-black bg-white  border-white hover:bg-white"
                    >
                      Delete comment
                    </button>
                    <ReportButton reportText={comment.content} id={comment.id} type={"Com"} message={"Report comment"} />
                  </div>
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
