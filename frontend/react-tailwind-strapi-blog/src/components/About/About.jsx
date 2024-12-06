// eslint-disable-next-line no-unused-vars
import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl text-left ">
        <h1 className="text-4xl text-center font-bold text-blue-500 mb-6 mt-10">About SocialBlog</h1>
        
        <p className="text-lg text-black mb-8">
          Welcome to <span className="font-bold">SocialBlog</span> — a place where stories connect us. We believe that everyone has a voice, and through SocialBlog, you can share your journey, opinions, and passions with a growing community of like-minded individuals.
        </p>

        <h2 className="text-2xl font-semibold text-blue-500 mb-4">Our Mission</h2>
        <p className="text-md text-black mb-6">
          Our mission is to create a space for meaningful conversations, where people can share personal experiences, creative ideas, and inspire others. Whether you’re an aspiring writer, a passionate creator, or just someone looking to connect, SocialBlog is the platform for you.
        </p>

        <h2 className="text-2xl font-semibold text-blue-500 mb-4">What We Offer</h2>
        <p className="text-md text-black mb-6">
          SocialBlog provides a simple and intuitive way to write and publish your thoughts, connect with a diverse community, and engage with content that matters. Here, you can:
        </p>
        <ul className="list-disc list-inside text-left text-md text-black mb-8">
          <li>Create and share blog posts on topics you’re passionate about.</li>
          <li>Follow and interact with other users’ stories and discussions.</li>
          <li>Engage in meaningful conversations and build lasting connections.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-500 mb-4">Why Join Us?</h2>
        <p className="text-md text-black mb-6">
          At SocialBlog, we believe in the power of community and authentic connection. By joining, you’ll be part of a platform that celebrates diversity of thought and fosters collaboration. Share your unique perspective and inspire others through the art of storytelling.
        </p>

        <h2 className="text-2xl font-semibold text-blue-500 mb-4">Be Part of Our Community</h2>
        <p className="text-md text-black mb-8">
          Thank you for being here! Whether you’re here to write, read, or simply explore, we hope you find value and connection through SocialBlog. Join us today and become part of a growing community that is shaping the future of digital conversations.
        </p>

        <button className="bg-blue-500 text-black px-6 py-3 rounded-lg hover:bg-blue-600">
          Join the Community
        </button>
      </div>
    </div>
  );
};

export default About;
