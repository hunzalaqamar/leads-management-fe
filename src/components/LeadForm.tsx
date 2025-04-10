import React, { useState, FormEvent, ChangeEvent } from "react";
import FormInput from "./FormInput";
import axios from "axios";
import { Lead } from "../types/interfaces";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  notes: string;
}

interface LeadFormProps {
  onLeadSubmit: (lead: Lead) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onLeadSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<FormData & { general?: string }>
  >({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "", general: "" });
  };

  const validateForm = (): Partial<FormData> => {
    const errors: Partial<FormData> = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email format is invalid";
    }
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors({ ...formErrors, ...errors });
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/leads", {
        ...formData,
        created_at: new Date().toISOString(),
      });
      onLeadSubmit(response.data);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        notes: "",
      });
      setFormErrors({});
    } catch (error) {
      setFormErrors({
        ...formErrors,
        general: "Failed to submit lead. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">
        Let's get you started
      </h2>
      <FormInput
        label="Full name"
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Ade Tiger"
        error={formErrors.fullName}
        required
      />
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
        label="Phone number (Optional)"
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+234 800 2758 9700"
        error={formErrors.phone}
      />
      <FormInput
        label="Company Name (Optional)"
        type="text"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        placeholder="XYZ Company"
        error={formErrors.companyName}
      />
      <FormInput
        label="Notes (Optional)"
        type="textarea"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Anything else?"
        error={formErrors.notes}
        rows={3}
      />
      {formErrors.general && (
        <p className="text-red-500 text-sm">{formErrors.general}</p>
      )}
      <button
        type="submit"
        className="w-full bg-teal-800 text-white py-3 rounded-md hover:bg-teal-900 transition"
      >
        Sign Up
      </button>
    </form>
  );
};

export default LeadForm;
