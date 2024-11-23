import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types"; 


const SearchResults = ({ blogs }) => {
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const location = useLocation();

  useEffect(() => {

    const query = new URLSearchParams(location.search).get("query");
    if (query) {


      const results = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBlogs(results);
    }
  }, [location.search, blogs]);

  return (
    <div className="w-full bg-[#1C1F26] py-[50px] mt-10  ">
      <div className="max-w-[1240px] mx-auto ">
        <h1 className="text-3xl font-bold mb-6">Kết quả tìm kiếm</h1>
        {filteredBlogs.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8 px-4 text-black">
            {filteredBlogs.map((blog) => (
              <Link key={blog.id} to={`/blog/${blog.id}`}>
                <div className="bg-white rounded-xl overflow-hidden drop-shadow-md">
                  <img
                    className="h-56 w-full object-cover"
                    src={blog.coverImg}
                    alt="Blog cover"
                  />
                  <div className="p-8">
                    <h3 className="font-bold text-2xl my-1">{blog.title}</h3>
                    <p className="text-gray-600 text-xl">{blog.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-600">Không tìm thấy kết quả nào.</p>
        )}
      </div>
    </div>
  );
};

SearchResults.propTypes = {
    blogs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        coverImg: PropTypes.string.isRequired,
        content: PropTypes.string,
        authorName: PropTypes.string.isRequired,
        authorImg: PropTypes.string,
        authorDesc: PropTypes.string,
      })
    ),
  };

export default SearchResults;
