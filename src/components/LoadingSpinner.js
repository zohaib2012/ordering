import React from 'react';

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`${sizeClasses[size]} spinner`}></div>
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="large" />
      <span className="ml-4 text-gray-600">Loading...</span>
    </div>
  );
};

export const ButtonLoader = ({ text = 'Processing...' }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
      <span>{text}</span>
    </div>
  );
};

export default LoadingSpinner;