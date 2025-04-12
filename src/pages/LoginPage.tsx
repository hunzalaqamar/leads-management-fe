import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import ErrorBoundary from "../components/ErrorBoundary";
import { useAuth } from "../context/AuthContext";
import { login } from "../service/api";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login: setAuthLogin } = useAuth();
  const [formErrors, setFormErrors] = useState<{ general?: string }>({});

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      setFormErrors({ general: "Email and password are required." });
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      setAuthLogin();
      navigate("/home");
    } else {
      setFormErrors({ general: result.message });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 flex items-center justify-center bg-white p-6 lg:p-12">
        <div className="w-full max-w-md">
          <ErrorBoundary>
            <LoginForm onSubmit={handleLogin} />
          </ErrorBoundary>
          {formErrors.general && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {formErrors.general}
            </p>
          )}
          <p className="mt-4 text-sm text-gray-600 text-center">
            Want to submit a Lead?
            <Link to="/signup" className="text-teal-600 hover:underline ml-1">
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

export default LoginPage;
