import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import ErrorBoundary from "../components/ErrorBoundary";
import { useAuth } from "../context/AuthContext";
import { login } from "../service/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "../components/LoadingOverlay";

interface LoginResponse {
  success: boolean;
  message: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login: setAuthLogin } = useAuth();
  const [formErrors, setFormErrors] = useState<{ general?: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      setFormErrors({ general: "Email and password are required." });
      return;
    }

    setLoading(true);
    const result: LoginResponse = await login(email, password);
    setLoading(false);

    if (result.success) {
      setAuthLogin();
      navigate("/home");
      toast.success("Login Successful");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {loading && <LoadingOverlay message="Logging In..." />}

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
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
