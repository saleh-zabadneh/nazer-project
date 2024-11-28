import React from "react";
import { useErrorLogging } from "@/hooks/use-error-logging";
import { ParsedError } from "@/lib/error-utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ErrorFallbackProps {
  error: ParsedError;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  useErrorLogging(error);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-red-100 to-red-200">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-red-600">
            Oops! Something went wrong
          </CardTitle>
          <CardDescription className="text-xl text-gray-700">
            We're sorry, but an unexpected error occurred.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error Details</AlertTitle>
            <AlertDescription>
              <p className="mb-2">
                <strong>Message:</strong> {error.message}
              </p>
              <p className="mb-2">
                <strong>Type:</strong> {error.type}
              </p>
            </AlertDescription>
          </Alert>
          {error.componentStack && (
            <div className="mt-4">
              <h3 className="mb-2 text-lg font-semibold text-red-800">
                Component Stack
              </h3>
              <ScrollArea className="h-[200px] w-full rounded border p-4">
                <pre className="text-sm text-red-800">
                  {error.componentStack}
                </pre>
              </ScrollArea>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
