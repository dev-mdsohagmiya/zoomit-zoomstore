export default function RegisterSidebar() {
  const features = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Get your orders delivered quickly",
    },
    {
      icon: "🔒",
      title: "Secure Shopping",
      description: "Your data is safe with us",
    },
    {
      icon: "⭐",
      title: "Quality Products",
      description: "Curated selection of premium items",
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
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop"
                alt="Shopping"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <h2 className="text-xl font-bold text-purple-900 mb-3">
              Welcome to ZoomStore
            </h2>
            <p className="text-purple-700 text-sm leading-relaxed">
              Discover amazing products, enjoy fast delivery, and shop with
              confidence. Join thousands of satisfied customers who trust
              ZoomStore for their shopping needs.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 gap-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 border border-purple-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-purple-600 text-xs">
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-900 text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-purple-600">
                      {feature.description}
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

