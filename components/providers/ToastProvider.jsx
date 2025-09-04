"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      toastClassName="!bg-white !text-gray-900 !border !border-gray-200 !shadow-lg"
      progressClassName="!bg-purple-600"
      bodyClassName="!text-sm !font-medium"
      closeButton={({ closeToast }) => (
        <button
          onClick={closeToast}
          className="!text-gray-400 hover:!text-gray-600 !text-lg !font-bold !leading-none"
        >
          ×
        </button>
      )}
    />
  );
}
