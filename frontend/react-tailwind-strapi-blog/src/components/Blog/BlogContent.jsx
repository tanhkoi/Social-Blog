import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentButton from "../Button/CommentButton";
import RelatedBlogs from "./RelatedBlogs";
import DOMPurify from "dompurify";
import BlogAudio from "../Button/BlogAudio";
import ReportButton from "../Button/ReportButton";

const BlogContent = () => {
  const { id } = useParams(); // Lấy id của bài blog từ URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true); // Trạng thái loading


  // Fetch blog data when component mounts
  useEffect(() => {
    const fetchBlogData = async () => {
      const token = localStorage.getItem("token");
      setLoading(true); // Bắt đầu trạng thái loading
      try {
        const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const blogData = await response.json();
        setBlog(blogData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
      }
    };

    fetchBlogData();
  }, [id]);

  // Gọi API Zalo TTS để lấy audio URL
  // Trích xuất văn bản thuần túy từ sanitizedContent



  // Nếu đang loading, hiển thị hiệu ứng loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg
          className="animate-spin h-8 w-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <p className="ml-3 text-gray-400 text-lg">Loading blog...</p>
      </div>
    );
  }

  // Nội dung khi đã tải xong blog
  const sanitizedContent = DOMPurify.sanitize(blog.content);

  return (
    <div className="w-full pb-10 bg-white mt-10">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1 md:gap-x-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-20 text-black">
          <div className="col-span-2 text-black">
            <img
              className="h-80 w-full object-contain"
              src={blog.imageCloudUrl}
              alt="Blog cover"
            />
            <h1 className="font-bold text-2xl my-1 pt-5">{blog.title}</h1>
            <BlogAudio blogText={blog.content}></BlogAudio>
            <div className="pt-5 text-justify">
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              ></div>
            </div>
          </div>

          <div className="items-center w-full bg-gray-300 rounded-xl drop-shadow-md py-5 max-h-[250px]">
            <div>
              <a href={`/profile/${blog.author.id}`} className="flex justify-center">
                <img
                  className="p-2 w-32 h-32 rounded-full mx-auto object-cover"
                  src={blog.author.profilePicture}
                  alt="Author"
                />
              </a>
              <h1 className="font-bold text-2xl text-center text-black pt-3">
                {blog.author.name}
              </h1>
              <p className="text-center text-black font-medium">
                {blog.author.email}
              </p>
            </div>
          </div>
        </div>
        <ReportButton reportText={blog.content} id={blog.id} type={"Post"}></ReportButton>
        <RelatedBlogs tag={blog.tags[0]} postId={blog.id} />
        <CommentButton blogId={id} />
      </div>
    </div>
  );
};

export default BlogContent;
