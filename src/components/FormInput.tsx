import React, { ChangeEvent } from "react";

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          required={required}
          {...props}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
