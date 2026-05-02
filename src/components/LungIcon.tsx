import React from 'react';

const LungIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      {/* Left Lung */}
      <path d="M30 20C15 30 10 50 20 65C30 80 40 85 50 80C60 85 70 80 80 70C90 60 85 40 75 30C65 10 45 10 30 20Z" 
        fill="#93C5FD" 
        stroke="#3B82F6" 
        strokeWidth="2"
      />
      
      {/* Right Lung */}
      <path d="M70 20C85 30 90 50 80 65C70 80 60 85 50 80C40 85 30 80 20 70C10 60 15 40 25 30C35 10 55 10 70 20Z" 
        fill="#93C5FD" 
        stroke="#3B82F6" 
        strokeWidth="2"
      />
      
      {/* Trachea */}
      <path d="M50 5V25C50 30 50 35 50 40C50 45 50 50 50 55C50 60 50 65 50 70V95" 
        stroke="#3B82F6" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      
      {/* Bronchi */}
      <path d="M50 40L35 50" 
        stroke="#3B82F6" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      <path d="M50 40L65 50" 
        stroke="#3B82F6" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export default LungIcon;
