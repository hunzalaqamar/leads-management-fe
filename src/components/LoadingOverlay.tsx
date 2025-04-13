import React from "react";

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-t-4 border-teal-500 border-solid rounded-full animate-spin border-t-transparent"></div>
        <p className="mt-4 text-white text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
