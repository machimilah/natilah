import React, { useState, useEffect } from 'react';

const BinaryTicker = () => {
  const [bits, setBits] = useState('0110');

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random 4-character binary string
      const newBits = Array.from({ length: 4 }, () => (Math.random() > 0.5 ? '1' : '0')).join('');
      setBits(newBits);
    }, 150); // Change bits every 150ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center font-mono font-bold tracking-[0.15em] text-white leading-none text-[10px]">
      <span>{bits.slice(0, 2)}</span>
      <span>{bits.slice(2, 4)}</span>
    </div>
  );
};

export default BinaryTicker;
