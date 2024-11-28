export interface ParsedError {
  message: string;
  type: string;
  componentStack?: string;
}

export const parseError = (error: Error | null): ParsedError => {
  if (!error) {
    return { message: "Unknown error", type: "Unknown" };
  }

  let componentStack: string | undefined;

  if ("componentStack" in error) {
    componentStack = (error as any).componentStack;
  }

  return {
    message: error.message || "An unexpected error occurred",
    type: error.name || error.constructor.name,
    componentStack,
  };
};
