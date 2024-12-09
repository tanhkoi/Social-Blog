import React from "react";
import "./BlogCard.css";

const BlogCard = ({ category, title, imageUrl }) => {
  return (
    <div className="blog-card">
      <img src={imageUrl} alt={title} className="blog-image" />
      <div className="blog-info">
        <p className="blog-category">{category}</p>
        <h3 className="blog-title">{title}</h3>
      </div>
    </div>
  );
};

export default BlogCard;
