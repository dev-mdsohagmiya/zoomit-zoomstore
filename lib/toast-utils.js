import { toast } from "react-toastify";

// Custom toast configurations
const defaultToastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

// Success toast
export const showSuccessToast = (message, options = {}) => {
  return toast.success(message, {
    ...defaultToastConfig,
    autoClose: 3000,
    ...options,
  });
};

// Error toast
export const showErrorToast = (message, options = {}) => {
  return toast.error(message, {
    ...defaultToastConfig,
    autoClose: 5000,
    ...options,
  });
};

// Warning toast
export const showWarningToast = (message, options = {}) => {
  return toast.warning(message, {
    ...defaultToastConfig,
    autoClose: 4000,
    ...options,
  });
};

// Info toast
export const showInfoToast = (message, options = {}) => {
  return toast.info(message, {
    ...defaultToastConfig,
    autoClose: 4000,
    ...options,
  });
};

// Loading toast
export const showLoadingToast = (message, options = {}) => {
  return toast.loading(message, {
    ...defaultToastConfig,
    autoClose: false,
    ...options,
  });
};

// Update toast
export const updateToast = (
  toastId,
  message,
  type = "success",
  options = {}
) => {
  return toast.update(toastId, {
    render: message,
    type: type,
    isLoading: false,
    autoClose: type === "error" ? 5000 : 3000,
    ...options,
  });
};

// Dismiss toast
export const dismissToast = (toastId) => {
  return toast.dismiss(toastId);
};

// Dismiss all toasts
export const dismissAllToasts = () => {
  return toast.dismiss();
};
