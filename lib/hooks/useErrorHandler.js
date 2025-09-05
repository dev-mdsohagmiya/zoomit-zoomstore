"use client";

import { useState, useCallback } from "react";
import { showErrorToast } from "../toast-utils";

export function useErrorHandler() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = useCallback((error, customMessage = null) => {
    console.error("Error occurred:", error);

    let errorMessage =
      customMessage || "Something went wrong. Please try again.";

    if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    setError(errorMessage);
    showErrorToast(errorMessage);

    return errorMessage;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const executeWithErrorHandling = useCallback(
    async (asyncFunction, customMessage = null) => {
      try {
        setIsLoading(true);
        clearError();
        const result = await asyncFunction();
        return result;
      } catch (error) {
        handleError(error, customMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [handleError, clearError]
  );

  return {
    error,
    isLoading,
    handleError,
    clearError,
    executeWithErrorHandling,
  };
}
