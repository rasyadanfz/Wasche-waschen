import React, { ChangeEvent } from "react";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({ label, value, onChange }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <input
        type="text"
        className="mt-1 p-2 border rounded-md w-full"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TextField;
