import React, { useState, FormEvent, ChangeEvent } from "react";
import FormInput from "./FormInput";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit?: (e: FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<LoginFormData>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = (): Partial<LoginFormData> => {
    const errors: Partial<LoginFormData> = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email format is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
      <FormInput
        label="Email address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="xyz@email.com"
        error={formErrors.email}
        required
      />
      <FormInput
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
        error={formErrors.password}
        required
      />
      <button
        type="submit"
        className="w-full bg-teal-800 text-white py-3 rounded-md hover:bg-teal-900 transition"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
