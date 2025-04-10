import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LeadForm from "../components/LeadForm";
import ErrorBoundary from "../components/ErrorBoundary";

interface Lead {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  notes?: string;
  created_at: string;
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLeadSubmit = (lead: Lead) => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 lg:p-12">
        <div className="w-full max-w-md">
          <ErrorBoundary>
            <LeadForm onLeadSubmit={handleLeadSubmit} />
          </ErrorBoundary>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Already a user?{" "}
            <Link to="/login" className="text-teal-600 hover:underline">
              Login
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

export default SignupPage;
