import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import  NavBar  from "../../../components/Header/NavBar";
import  SideBar  from "../../../components/Sidebar/SideBar";

const blogs = [
  {
    id: 1,
    title: "Blog 1",
    desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    coverImg:
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/876c22100707927.5f0ec9851cb08.png",
    readTime: "1m read time",
    upvotes: "226 upvotes",
    date: "Wed, 30 Oct",
  },
  {
    id: 2,
    title: "Blog 2",
    desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    coverImg:
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/876c22100707927.5f0ec9851cb08.png",
    upvotes: "89 upvotes",
    date: "Wed, 23 Oct",
  },
  {
    id: 3,
    title: "Blog 3",
    desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    coverImg:
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/876c22100707927.5f0ec9851cb08.png",
    readTime: "7m read time",
    upvotes: "811 upvotes",
    date: "Wed, 23 Oct",
  },
];

const ReadingHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <div className="bg-white min-h-screen text-black"> 
      <header>
        <NavBar />
      </header>
      <main className="flex">
        <div className="w-60">
          <SideBar />
        </div>
        <div className="flex-grow p-4 ml-4">
          <h2 className="text-lg font-semibold mb-5 mt-20">Reading history</h2>
          <div className="flex items-center mb-2">
            <form
              onSubmit={handleSearchSubmit}
              className="border hidden md:flex items-center"            >
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search blog..."
                  className="bg-white rounded px-4 py-2 pl-10 pr-4" 
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">

                </span>
              </div>
            </form>
          </div>
          <div className="mt-4">
            {blogs.map((blog) => (
              <HistoryItem key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const HistoryItem = ({ blog }) => (
  <div className="border-b border-gray-700 mb-4 pb-2">
    <div className="flex items-center">
      <img
        src={blog.coverImg}
        alt="Article Thumbnail"
        className="w-20 h-20 rounded-lg mr-2"
      />
      <div>
        <Link to={`/blog/${blog.id}`}>
          <h3 className="text-md font-medium text-blue-400 hover:underline">
            {blog.title}
          </h3>
        </Link>
        <span className="text-sm text-gray-400">
          {blog.readTime ? `${blog.readTime}  ` : ""}
        </span>
      </div>
    </div>
  </div>
);

HistoryItem.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    coverImg: PropTypes.string.isRequired,
    readTime: PropTypes.string,
    upvotes: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
};

export default ReadingHistory;
