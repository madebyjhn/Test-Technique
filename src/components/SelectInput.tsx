import React from "react";

interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <select
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
