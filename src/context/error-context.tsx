import React from "react";

interface ErrorContextType {
  error: Error | null;
}

export const ErrorContext = React.createContext<ErrorContextType>({
  error: null,
});
