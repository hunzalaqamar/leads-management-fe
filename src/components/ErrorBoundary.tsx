import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center mt-10">
          <h1 className="text-red-500 text-xl font-bold">
            Something went wrong
          </h1>
          <p className="text-gray-600 mt-2">
            An error occurred while rendering this component. Please try again.
          </p>
          {this.state.error && (
            <p className="text-sm text-gray-500 mt-2">
              Error: {this.state.error.message}
            </p>
          )}
          {this.state.errorInfo && (
            <details className="mt-2 text-sm text-gray-500">
              <summary>Stack Trace</summary>
              <pre>{this.state.errorInfo.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
