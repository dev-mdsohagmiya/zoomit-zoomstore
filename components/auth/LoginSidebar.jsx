export default function LoginSidebar() {
  const benefits = [
    {
      icon: "🛒",
      title: "Easy Shopping",
      description: "Browse and purchase with ease",
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description: "Shop on any device, anywhere",
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description: "Your payment information is safe",
    },
  ];

  return (
    <div
      className="hidden lg:flex flex-1 items-center justify-center p-8"
      style={{ backgroundColor: "rgb(244, 234, 244)" }}
    >
      <div className="w-full max-w-lg">
        {/* Decorative Content */}
        <div className="text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-xl overflow-hidden bg-white border border-purple-200 p-3">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop"
                alt="Shopping"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <h2 className="text-xl font-bold text-purple-900 mb-3">
              Welcome Back to ZoomStore
            </h2>
            <p className="text-purple-700 text-sm leading-relaxed">
              Access your account to continue shopping, track your orders, and
              manage your profile. Your shopping journey continues here.
            </p>
          </div>

          {/* Benefit Cards */}
          <div className="grid grid-cols-1 gap-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 border border-purple-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-purple-600 text-xs">
                      {benefit.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-900 text-sm">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-purple-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
