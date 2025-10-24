import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => onClose(), 3000); 
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed font-mono top-5 right-5 px-4 py-2 rounded-lg shadow-lg text-sm font-medium z-50 transition-all duration-300
        ${
          type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
    >
      {message}
    </div>
  );
};

export default Toast;
