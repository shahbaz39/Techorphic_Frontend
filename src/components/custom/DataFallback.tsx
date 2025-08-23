import React from 'react';

interface DataFallbackProps {
  componentName: string;
}

const DataFallback: React.FC<DataFallbackProps> = ({ componentName }) => {
  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
      <p className="text-yellow-800">
        Failed to load data for {componentName}. Showing default content.
      </p>
    </div>
  );
};

export default DataFallback;