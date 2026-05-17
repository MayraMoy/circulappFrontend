import { useState, useCallback } from "react";

export const useErrorHandler = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAsync = useCallback(async (asyncFn) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await asyncFn();
      return result;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.msg ||
        err?.message ||
        "Ha ocurrido un error inesperado";

      setError(errorMessage);
      console.error("Error:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(""), []);

  return {
    error,
    isLoading,
    handleAsync,
    clearError,
  };
};