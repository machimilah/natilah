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
    <div className="fixed top-0 left-0 right-0 w-full bg-black border-b border-white/[0.06] py-3 px-6 flex items-center justify-between z-50">
      <div className="flex-1 text-center">
        <span className="text-sm text-slate-300">
          News: {data.text}{' '}
          <a
            href={data.linkUrl}
            className="underline text-white hover:text-slate-300 transition-colors duration-300"
          >
            {data.linkText}
          </a>
        </span>
      </div>
      <button
        onClick={handleClose}
        className="ml-4 text-slate-500 hover:text-white transition-colors duration-300"
        aria-label="Close banner"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default NewsBanner;
