import React from 'react';

interface CardProps {
  title: string;
  description: string;
  action: () => void;
  actionLabel: string;
}

const Card: React.FC<CardProps> = ({ title, description, action, actionLabel }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 sm:m-4">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <button
        onClick={action}
        className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600"
      >
        {actionLabel}
      </button>
    </div>
  );
};

export default Card;
