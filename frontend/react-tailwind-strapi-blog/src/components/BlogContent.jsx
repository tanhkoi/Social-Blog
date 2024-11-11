import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

const BlogContent = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);  
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  // Lấy bài viết từ localStorage khi component mount
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const token = localStorage.getItem("token");  // Lấy token từ localStorage
        const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Gửi token trong header
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog data');
        }
        const blogData = await response.json();
        setBlog(blogData);  // Cập nhật blog vào state
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogData();
  }, [id]);

  // Lấy bình luận từ API khi component mount
  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:8080/api/comments/${id}`,{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Gửi token trong header
          },
        });


        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }

        const commentsData = await response.json();
        setComments(commentsData);  // Cập nhật bình luận vào state
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [id]);

 // Xử lý việc gửi bình luận mới
  const handleCommentSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = {
        content: commentText
      };
      try {
        const response = await fetch(`http://localhost:8080/api/comments/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
          body: JSON.stringify(newComment),
        });
        console.log(newComment)
        if (response.ok) {
          const savedComment = await response.json();
          setComments([...comments, savedComment]);
          setCommentText("");  // Reset input sau khi gửi bình luận
        } else {
          throw new Error('Failed to post comment');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };



  // Xử lý tăng lượt thích cho bình luận
  const handleLike = (index) => {
    const updatedComments = comments.map((comment, i) =>
      i === index ? { ...comment, likes: comment.likes + 1 } : comment
    );
    setComments(updatedComments);
  };

 
  // Nếu blog chưa được tải, hiển thị loading
  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full pb-10 bg-[#f9f9f9] mt-10">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1 md:gap-x-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-20 md:mt-0 ss:pt-20 text-black">
          <div className="col-span-2">
            <img
              className="h-56 w-full object-cover"
              src={blog.coverImg}
              alt="Blog cover"
            />
            <h1 className="font-bold text-2xl my-1 pt-5">{blog.title}</h1>
            <div className="pt-5">
              <p>{blog.content}</p>
            </div>
          </div>
          <div className="items-center w-full bg-white rounded-xl drop-shadow-md py-5 max-h-[250px]">
            <div>
              <img
                className="p-2 w-32 h-32 rounded-full mx-auto object-cover"
                src={blog.authorImg}
                alt="Author"
              />
              <h1 className="font-bold text-2xl text-center text-gray-900 pt-3">
                {blog.authorName}
              </h1>
              <p className="text-center text-gray-900 font-medium">
                {blog.authorDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Phần bình luận */}
        <div className="mt-8 px-4 bg-gray-50 border border-gray-300 rounded-lg p-6">
          <h2 className="text-2xl font-bold">Comments</h2>
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
    type="submit"
    className="hidden" // Ẩn nút submit (tùy chọn)
  >
    Submit
  </button>
          </form>
          <div className="space-y-2 mt-4">
            {comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded-md flex justify-between items-center">
                <div>
                <p className="text-lg font-bold text-blue-600">{comment.user.username}</p>
                  <p>{comment.content}</p>
                  <span className="text-sm text-gray-500">{comment.createdAt}</span>
                </div>
                <div
                  onClick={() => handleLike(index)}
                  className="flex items-center space-x-1 cursor-pointer hover:text-red-500"
                >
                  <FaHeart />
                  <span>{comment.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
