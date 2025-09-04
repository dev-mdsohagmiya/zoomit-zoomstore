import React from "react";
import RegisterForm from "../../components/auth/RegisterForm";
import RegisterSidebar from "../../components/auth/RegisterSidebar";

// Server Component - No client-side JavaScript needed for layout
export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Column - Form (Client Component) */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <RegisterForm />
      </div>

      {/* Right Column - Visual/Decorative (Server Component) */}
      <RegisterSidebar />
    </div>
  );
}
