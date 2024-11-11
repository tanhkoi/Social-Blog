import { useState, useEffect } from "react";
import BlogList from "./BlogList ";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('token:', token)
        const response = await fetch('http://localhost:8080/api/posts',{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Gửi token trong header Authorization
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); 

        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);


  return (
    <div className="w-full bg-zinc-950 py-[50px] mt-10">
      <div className="max-w-[1240px] mx-auto">
        <BlogList blogs={blogs} setBlogs={setBlogs} />
      </div>
    </div>
  );
};

export default Blogs;
