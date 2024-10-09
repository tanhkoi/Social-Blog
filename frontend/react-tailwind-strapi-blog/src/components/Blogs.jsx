// eslint-disable-next-line no-unused-vars
import React from "react";
// import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Blog 1",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      coverImg:
        "https://mir-s3-cdn-cf.behance.net/project_modules/fs/876c22100707927.5f0ec9851cb08.png",
    },
    {
      id: 2,
      title: "Blog 2",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      coverImg:
        "https://mir-s3-cdn-cf.behance.net/project_modules/fs/876c22100707927.5f0ec9851cb08.png",
    },
    {
      id: 3,
      title: "Blog 3",
      desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      coverImg:
        "https://mir-s3-cdn-cf.behance.net/project_modules/fs/876c22100707927.5f0ec9851cb08.png",
    },
  ];

  return (
    <div className="w-full bg-[#f9f9f9] py-[50px]">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8 px-4 text-black">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden drop-shadow-md"
            >
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
          ))}

          {/* {blogs1.map((blog)=>

                <Link key={blog.id} to={`/blog/${blog.id}`}>
                    <div  className='bg-white rounded-xl overflow-hidden drop-shadow-md'>
                        <img className='h-56 w-full object-cover' src={blog.coverImg} />
                        <div className='p-8'>
                            <h3 className='font-bold text-2xl my-1'>{blog.title}</h3>
                            <p className='text-gray-600 text-xl'>{blog.desc}</p>
                        </div>
                    </div>
                </Link>           
                
                )} */}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
