import React, { useEffect } from "react";

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2  m-4 p-4 border border-black bg-green-500 text-white rounded-md">
      {message}
    </div>
  );
};

export default SuccessMessage;
