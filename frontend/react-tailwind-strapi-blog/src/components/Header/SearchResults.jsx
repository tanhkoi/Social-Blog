import React, { useState, useEffect, useRef } from 'react';
import   '../.././App.css';
function SearchResults() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const prevSearchTerm = useRef(searchTerm); 

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.trim() === '') {
        setResults([]);
        return;
      }

      // Only fetch if searchTerm has actually changed
      if (prevSearchTerm.current !== searchTerm) {
        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(`http://localhost:8080/api/posts/search?keyword=${searchTerm}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data);
          setResults(data);
          console.log('Search Results:', data);
          console.log(`http://localhost:8080/api/posts/search?q=${searchTerm}`);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
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
    console.log(`Navigating to post with ID: ${id}`);
    // Add navigation if needed, e.g., using React Router:
    // navigate(`/blog/${id}`);
  };

  return (
    <div className="relative">
      {/* Search Bar */}
      <div className={"searchBar"}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full p-3 text-black rounded-md bg-[#1a202c] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          aria-label="Search posts" 
        />
      </div>

      {/* Search Results */}
      <div className={"searchResultsContainer"}> {/* Ensure spacing below the search bar */}
  {isLoading && <p>Loading results...</p>}
  {error && <p>Error: {error.message}</p>}
  {!isLoading && !error && (
    <ul className="space-y-4">
      {results.slice(0, 5).map((result) => ( // Chỉ lấy 5 kết quả đầu tiên
        <li
          key={result.id}
          className="p-4 border border-gray-700 rounded-lg bg-[#0E1217] hover:bg-[#1A2027] cursor-pointer transition-transform transform hover:scale-105"
          onClick={() => handleClick(result.id)}
        >
          <h3 className="text-lg font-semibold text-white">{result.title}</h3>
          <p className="text-sm text-gray-400">
            <strong>Category:</strong> {result.category}
          </p>
          <p className="text-sm text-gray-400">
            <strong>Tags:</strong> {result.tags.join(', ')}
          </p>
        </li>
      ))}
    </ul>
  )}
</div>
    </div>
  );
}

export default SearchResults;