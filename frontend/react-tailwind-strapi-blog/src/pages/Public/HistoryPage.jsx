import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { NavBar, SideBar } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const blogs = [
  {
    id: 1,
    title: "Blog 1",
    desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    coverImg: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/876c22100707927.5f0ec9851cb08.png",
    readTime: "1m read time",
    upvotes: "226 upvotes",
    date: "Wed, 30 Oct",
  },
  {
    id: 2,
    title: "Blog 2",
    desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    coverImg: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/876c22100707927.5f0ec9851cb08.png",
    upvotes: "89 upvotes",
    date: "Wed, 23 Oct",
  },
  {
    id: 3,
    title: "Blog 3",
    desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    coverImg: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/876c22100707927.5f0ec9851cb08.png",
    readTime: "7m read time",
    upvotes: "811 upvotes",
    date: "Wed, 23 Oct",
  },
];

const ReadingHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
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
    <div>
      <header>
        <NavBar />
      </header>
      <main className="flex">
        {isSidebarVisible && (
          <div className="w-60">
            <SideBar />
          </div>
        )}
        <div className="inline-flex justify-center items-center h-[480px]">
          <button
            className="bg-white text-gray-800 rounded px-2 py-1 text-sm fixed"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          >
            {isSidebarVisible ? (
              <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
            ) : (
              <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className={`flex-grow p-4 ${isSidebarVisible ? "ml-4" : ""}`}>
        <h2 className="text-lg font-semibold mb-5 mt-20">Reading history</h2>
        <div className="flex items-center mb-2">
            <form
              onSubmit={handleSearchSubmit}
              className="border border-border rounded-lg p-2 flex-grow"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search blog..."
                  className="border border-gray-300 rounded px-4 py-2 pl-10 pr-4"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 451 451"
                    className="h-5 w-5"
                  >
                    <g>
                      <path d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3 s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4 C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3 s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z" />
                    </g>
                  </svg>
                </span>
              </div>
            </form>
          </div>
          <div className="mt-4">
            {blogs.map(blog => (
              <HistoryItem key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const HistoryItem = ({ blog }) => (
  <div className="border-b border-muted mb-4 pb-2">
    <div className="flex items-center">
      <img src={blog.coverImg} alt="Article Thumbnail" className="w-20 h-20 rounded-lg mr-2" />
      <div>
        <Link to={`/blog/${blog.id}`}>
          <h3 className="text-md font-medium text-blue-600 hover:underline">{blog.title}</h3>
        </Link>
        <span className="text-sm text-muted">
          {blog.readTime ? `${blog.readTime}  ` : ''}
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
    readTime: PropTypes.number.isRequired,
    content: PropTypes.string,
    authorName: PropTypes.string,
    authorImg: PropTypes.string,
    authorDesc: PropTypes.string,
  }).isRequired,
};

export default ReadingHistory;
