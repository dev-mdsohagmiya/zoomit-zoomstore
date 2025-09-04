import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import LoginSidebar from "../../components/auth/LoginSidebar";

// Server Component - No client-side JavaScript needed for layout
export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Column - Form (Client Component) */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <LoginForm />
      </div>

      {/* Right Column - Visual/Decorative (Server Component) */}
      <LoginSidebar />
    </div>
  );
}
