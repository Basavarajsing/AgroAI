
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-light-green" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
