import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../.././App.css";

function SearchResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const prevSearchTerm = useRef(searchTerm);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.trim() === "") {
        setResults([]);
        setShowResults(false);
        return;
      }
      if (prevSearchTerm.current !== searchTerm) {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:8080/api/posts/search?keyword=${searchTerm}`
        );
        const data = await response.json();
        setResults(data);
        setShowResults(true);
        setIsLoading(false);
      }
      prevSearchTerm.current = searchTerm;
    };
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="relative ">
      <div className="searchBar  ">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full p-3 text-white rounded-xl border border-gray-700 bg-[#1c1f26] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          aria-label="Search posts"
        />
      </div>
      {showResults && (
        <div className="searchResultsContainer bg-[#1c1f26] border border-gray-700 ">
          {isLoading && <p>Loading results...</p>}
          {!isLoading && (
            <ul className="space-y-4">
              {results.slice(0, 5).map((result) => (
                <li
                  key={result.id}
                  className="p-4 rounded-md bg-[#1c1f26] hover:bg-[#1A2027] cursor-pointer transition-transform transform hover:scale-105 flex items-center"
                  onClick={() => handleClick(result.id)}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {result.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      <strong>Category:</strong> {result.category}
                    </p>
                    <p className="text-sm text-gray-400">
                      <strong>Tags:</strong> {result.tags.join(", ")}
                    </p>
                  </div>
                  {result.imageCloudUrl && (
                    <img
                      src={result.imageCloudUrl}
                      alt={result.title}
                      className="ml-4 h-16 w-16 object-cover rounded-md"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
