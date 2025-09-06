export default function HomePageLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className=" animate-pulse">
          <img
            src="/logo.png"
            alt="Zoomit Logo"
            className="w-32 h-32 mx-auto object-contain"
          />
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center items-center space-x-2 -translate-y-10">
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
