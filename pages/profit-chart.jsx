import React, { useEffect, useState } from 'react';
import { PieChart, Pie } from 'recharts';

const data01 = [
  {
    "name": "Group A",
    "value": 400
  },
  // ... (rest of your data)
];

const data02 = [
  {
    "name": "Group A",
    "value": 2400
  },
  // ... (rest of your data)
];

const Profitchart = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Set the state to render the chart
          observer.disconnect(); // Stop observing once rendered
        }
      });
    }, options);

    // Start observing the chart element
    observer.observe(document.querySelector('.chart-container'));

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="chart-container">
      {isVisible && (
        <PieChart width={430} height={280}>
          <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
          <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
        </PieChart>
      )}
    </div>
  );
}

export default Profitchart;
