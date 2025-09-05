export class APIError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.data = data;
  }
}

export function handleAPIError(error) {
  console.error("API Error:", error);

  // Network error
  if (!error.response) {
    return {
      message: "Network error. Please check your internet connection.",
      status: 0,
      type: "network",
    };
  }

  const { status, data } = error.response;

  // Server errors
  if (status >= 500) {
    return {
      message: "Server error. Please try again later.",
      status,
      type: "server",
    };
  }

  // Client errors
  if (status >= 400) {
    return {
      message: data?.message || "Invalid request. Please check your input.",
      status,
      type: "client",
    };
  }

  // Unknown error
  return {
    message: "An unexpected error occurred.",
    status: status || 0,
    type: "unknown",
  };
}

export async function safeAPIRequest(requestFunction, errorMessage = null) {
  try {
    const response = await requestFunction();
    return {
      success: true,
      data: response,
      error: null,
    };
  } catch (error) {
    const errorInfo = handleAPIError(error);
    return {
      success: false,
      data: null,
      error: {
        ...errorInfo,
        message: errorMessage || errorInfo.message,
      },
    };
  }
}
