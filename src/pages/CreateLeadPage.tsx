import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LeadForm from "../components/LeadForm";
import ErrorBoundary from "../components/ErrorBoundary";
import { createLead } from "../service/api";
import { Lead } from "../types/interfaces";
import { toast } from "react-toastify";

const CreateLeadPage: React.FC = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<{ general?: string }>({});

  const handleLeadSubmit = async (lead: Lead) => {
    const result = await createLead({
      fullName: lead.fullName,
      email: lead.email,
      phone: lead.phone,
      companyName: lead.companyName,
      notes: lead.notes,
    });

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 lg:p-12">
        <div className="w-full max-w-md">
          <ErrorBoundary>
            <LeadForm onLeadSubmit={handleLeadSubmit} />
          </ErrorBoundary>
          {formErrors.general && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {formErrors.general}
            </p>
          )}
          <p className="mt-4 text-sm text-gray-600 text-center">
            Go to Admin Login
            <Link to="/login" className="text-teal-600 hover:underline ml-1">
              Click here
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center bg-teal-700 text-white p-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            "Creativity is intelligence having fun"
          </h2>
          <p className="text-lg">— Albert Einstein</p>
        </div>
      </div>
    </div>
  );
};

export default CreateLeadPage;
