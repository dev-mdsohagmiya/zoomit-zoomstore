export default function HomePageLoader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Simple Logo */}
        <div className="w-16 h-16 mx-auto rounded-xl bg-purple-600 flex items-center justify-center mb-6 animate-pulse">
          <span className="text-2xl font-bold text-white">Z</span>
        </div>

        {/* Simple Loading Text */}
        <h2 className="text-xl font-semibold text-purple-900 mb-2">
          Loading...
        </h2>
        <p className="text-purple-600">Please wait</p>

        {/* Simple Loading Dots */}
        <div className="mt-6 flex justify-center space-x-1">
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
