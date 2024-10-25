// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
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
    },
    {
      id: 5,
      title: "Blog 5",
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
      id: 6,
      title: "Blog 6",
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
  ];

  return (
    <div className="w-full bg-[#f9f9f9] py-[50px]">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8 px-4 text-black">
          {blogs.map((blog) => (
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
      </div>
    </div>
  );
};

export default Blogs;
