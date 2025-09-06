// Client-side authentication utilities

export const getStoredToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

export const getStoredUser = () => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        return null;
      }
    }
  }
  return null;
};

export const storeAuthData = (accessToken, user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    // Also set cookie for server-side access
    document.cookie = `accessToken=${accessToken}; path=/; max-age=${
      7 * 24 * 60 * 60
    }; SameSite=Lax`;
  }
};

export const clearAuthData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    // Also clear cookie
    document.cookie = "accessToken=; path=/; max-age=0";
  }
};

export const isAuthenticated = () => {
  const token = getStoredToken();
  const user = getStoredUser();
  return !!(token && user);
};

export const getUserRole = () => {
  const user = getStoredUser();
  return user?.role || null;
};

export const isAdmin = () => {
  const role = getUserRole();
  return role === "admin" || role === "superadmin";
};

export const isSuperAdmin = () => {
  const role = getUserRole();
  return role === "superadmin";
};

// Check if token is expired (basic check)
export const isTokenExpired = () => {
  const token = getStoredToken();
  if (!token) return true;

  try {
    // Decode JWT token (basic decode, not verification)
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

// Logout function that clears local storage
export const logout = (showToast = true) => {
  clearAuthData();

  if (showToast && typeof window !== "undefined") {
    // Import toast dynamically to avoid SSR issues
    import("./toast-utils").then(({ showSuccessToast }) => {
      showSuccessToast("Logged out successfully!");
    });
  }

  // Redirect to root page immediately
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
};
