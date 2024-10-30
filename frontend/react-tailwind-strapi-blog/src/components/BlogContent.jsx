import { useParams } from "react-router-dom";
import { useState } from "react";

const BlogContent = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const blogs = [
    {
      id: 1,
      title: "Blog 1",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      coverImg:
        "https://mir-s3-cdn-cf.behance.net/project_modules/fs/876c22100707927.5f0ec9851cb08.png",
      content:
        "dsajknda ckasndqwabsicwbkabckjbakbjcjlksajn.ckmxz,m ;lám;lcm a.sdasdasdas",
      authorName: "John Doe",
      authorImg:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600",
      authorDesc: "Web Developer",
    },
    {
      id: 2,
      title: "Blog 2",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      coverImg:
        "https://mir-s3-cdn-cf.behance.net/project_modules/fs/876c22100707927.5f0ec9851cb08.png",
      content:
        "dsajknda ckasndqwabsicwbkabckjbakbjcjlksajn.ckmxz,m ;lám;lcm a.sdasdasdas",
      authorName: "John Doe",
      authorImg:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600",
      authorDesc: "Web Developer",
    },
    {
      id: 3,
      title: "Blog 3",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      coverImg:
        "https://mir-s3-cdn-cf.behance.net/project_modules/fs/876c22100707927.5f0ec9851cb08.png",
      content:
        "dsajknda ckasndqwabsicwbkabckjbakbjcjlksajn.ckmxz,m ;lám;lcm a.sdasdasdas",
      authorName: "John Doe",
      authorImg:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600",
      authorDesc: "Web Developer",
    },
    {
      id: 4,
      title: "Blog 4",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      coverImg:
        "https://mir-s3-cdn-cf.behance.net/project_modules/fs/876c22100707927.5f0ec9851cb08.png",
      content:
        "dsajknda ckasndqwabsicwbkabckjbakbjcjlksajn.ckmxz,m ;lám;lcm a.sdasdasdas",
      authorName: "John Doe",
      authorImg:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600",
      authorDesc: "Web Developer",
    }
  ];
  let blog = blogs.filter((blog) => blog.id == id);
  blog = blog[0];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      setComments([...comments, commentText]);
      setCommentText("");
    }
  };

  return (
    <div className="w-full pb-10 bg-[#f9f9f9] mt-10">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1 md:gap-x-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-20 md:mt-0 ss:pt-20 text-black">
          <div className="col-span-2">
            <img className="h-56 w-full object-cover" src={blog.coverImg} alt="Blog cover" />
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
        <div className="mt-8 px-4">
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
              className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-md"
            >
              Comment
            </button>
          </form>
          <div className="space-y-2 mt-4">
            {comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded-md">
                {comment}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;