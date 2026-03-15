import React, { useState } from 'react';
import { X } from 'lucide-react';

const NewsBanner = ({ data, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-white py-3 px-6 flex items-center justify-between z-50">
      <div className="flex-1 text-center">
        <span className="text-sm text-gray-800">
          News: {data.text}{' '}
          <a
            href={data.linkUrl}
            className="underline text-gray-900 hover:text-gray-600 transition-colors duration-300"
          >
            {data.linkText}
          </a>
        </span>
      </div>
      <button
        onClick={handleClose}
        className="ml-4 text-gray-500 hover:text-gray-800 transition-colors duration-300"
        aria-label="Close banner"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default NewsBanner;
