// components/Accordion.js
import React, { useState } from 'react';

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="mb-4">
          <div
            className="flex justify-between items-center bg-gray-200 p-4 cursor-pointer"
            onClick={() => handleClick(index)}
          >
            <div>{item.title}</div>
            <div>{activeIndex === index ? '▲' : '▼'}</div>
          </div>
          {activeIndex === index && (
            <div className="p-4 border-t border-gray-300">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
