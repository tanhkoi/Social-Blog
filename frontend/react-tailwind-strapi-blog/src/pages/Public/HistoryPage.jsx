import {  useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { NavBar, SideBar } from "../../components";

const ReadingHistory = ({ blogs }) => {
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
    <div className="bg-zinc-900 min-h-screen text-white"> 
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
              className="border hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search blog..."
                  className="bg-zinc-900 rounded px-4 py-2 pl-10 pr-4" 
                />
              </div>
            </form>
          </div>
          <div className="mt-4">
            {blogs.map((blog) => (
              // eslint-disable-next-line react/jsx-no-undef
              <HistoryItem key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

ReadingHistory.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      coverImg: PropTypes.string.isRequired,
      readTime: PropTypes.string,
      upvotes: PropTypes.string,
      date: PropTypes.string,
    })
  ).isRequired,
};

export default ReadingHistory;
