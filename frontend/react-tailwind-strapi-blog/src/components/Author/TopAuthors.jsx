import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TopAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopAuthors = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/most-posts"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch top authors");
        }
        const data = await response.json();

        // Map data to get the top authors and fetch their followers
        const topAuthors = await Promise.all(
          data.slice(0, 4).map(async (author) => {
            const followersResponse = await fetch(
              `http://localhost:8080/api/follows/${author.id}/followers`
            );
            const followersData = await followersResponse.json();
            return {
              id: author.id,
              postCount: author.postCount,
              followerNumber: author.followerNumber,
              followersCount: followersData.length, // Changed to followersCount
              ...author.userDetails[0], // Assuming userDetails is an array
            };
          })
        );

        setAuthors(topAuthors);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopAuthors();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-[#F5F7FA]">
      <h2 className="text-3xl font-bold ml-10 mt-10 mb-4 bg-[#F5F7FA]">
        Top 4 Authors with Most Blog Posts
      </h2>
      <div className="flex space-x-8 bg-[#F5F7FA]">
        {authors.map((author) => (
          <div
            key={author.id}
            className="flex items-center rounded-lg hover:shadow-xl hover:scale-[1.05] transition transform duration-300 h-48 w-full max-w-[350px]"
          >
            <div
              className="flex items-center cursor-pointer w-full p-4"
              onClick={() => navigate(`/profile/${author.id}`)}
            >
              <img
                src={author.profilePicture || "/default-avatar.png"}
                alt={`${author.name}'s profile`}
                className="w-24 h-24 rounded-full mr-6 object-cover"
              />
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold">{author.name}</h3>
                <p className="text-sm text-gray-600">
                  Total Posts: {author.postCount}
                </p>
                <p className="text-sm text-gray-600">
                  Followers: {author.followersCount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAuthors;
