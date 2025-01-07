import React from 'react';

const KnowMoreButton = ({ onClick }) => {
  return (
    <button
      className="px-6 py-2 bg-violet-800 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-offset-2 transition-transform transform hover:scale-105"
      onClick={onClick}
    >
      Know More
    </button>
  );
};

export default KnowMoreButton;
