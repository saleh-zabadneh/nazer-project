import { useEffect } from "react";
import { ParsedError } from "@/lib/error-utils";

export const useErrorLogging = (error: ParsedError) => {
  useEffect(() => {
    // Log the error to your preferred error tracking service
    console.error("Logged error:", error);
    // Example: If using a service like Sentry
    // Sentry.captureException(error);
  }, [error]);
};
