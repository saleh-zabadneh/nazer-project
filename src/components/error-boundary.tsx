import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorFallback } from "./error-fallback";
import { ErrorContext } from "@/context/error-context";
import { parseError } from "@/lib/error-utils";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // You can log the error to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContext.Provider value={{ error: this.state.error }}>
          <ErrorFallback error={parseError(this.state.error)} />
        </ErrorContext.Provider>
      );
    }

    return this.props.children;
  }
}
