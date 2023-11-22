import { useEffect, useState } from 'react';

const TextLoader = ({ text }) => {
  const [visibleLetters, setVisibleLetters] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLetters((prev) => (prev < text.length ? prev + 1 : 0)); // Reset to 0 when it reaches the end
    }, 100); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="text-4xl font-bold">
      {text.split('').map((letter, index) => (
        <span key={index}  className={`${
            index < visibleLetters ? 'opacity-100' : 'opacity-0'
          } text-${index % 7 + 1}`} // Assign a different color based on the index
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default TextLoader;
