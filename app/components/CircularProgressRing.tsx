import React from 'react';

interface CircularProgressRingProps {
  score: number; // Score value
  maxScore: number; // Maximum score value
  size?: number; // Size of the ring
  strokeWidth?: number; // Width of the stroke
}

const CircularProgressRing: React.FC<CircularProgressRingProps> = ({
  score,
  maxScore,
  size = 100,
  strokeWidth = 10,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedScore = Math.min(score, maxScore);
  const strokeDashoffset = circumference - (normalizedScore / maxScore) * circumference;

  // Calculate percentage
  const percentage = (normalizedScore / maxScore) * 100;

  // Determine the color of the ring based on the percentage
  let ringColor = '';
  if (percentage > 75) {
    ringColor = '#4caf50'; // Green
  } else if (percentage > 30) {
    ringColor = '#ffa500'; // Orange
  } else {
    ringColor = '#f44336'; // Red
  }

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform rotate-[-90deg]"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="none"
          style={{ transition: 'stroke-dashoffset 0.3s, stroke 0.3s' }}
        />
      </svg>
      <div className="absolute text-black text-md font-bold">
        {score}/{maxScore}
      </div>
    </div>
  );
};

export default CircularProgressRing;
