// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-4">
      <h1 className="text-6xl font-bold text-black mb-4">404 Not Found</h1>
      <p className="text-black mb-8">Your visited page not found. You may go home page.</p>
      <button
        className="inline-block bg-accent text-accent-foreground hover:bg-accent/80 px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        onClick={goHome}
      >
        Back to home page
      </button>
    </div>
  );
};

export default PageNotFound;
