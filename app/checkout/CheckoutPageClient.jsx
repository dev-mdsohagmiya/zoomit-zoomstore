"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createOrderWithPayment, confirmPayment } from "../actions/order";
import { clearCart } from "../actions/cart";
import { showSuccessToast, showErrorToast } from "../../lib/toast-utils";
import { truncateText } from "../../lib/utils";
import { getUserProfile } from "../actions/user";
import {
  CreditCard,
  MapPin,
  Package,
  ShoppingCart,
  Loader2,
  Check,
  AlertCircle,
  User,
  Mail,
  Phone,
  Banknote,
} from "lucide-react";

export default function CheckoutPageClient({ cart }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1: Form, 2: Processing, 3: Success

  const router = useRouter();

  // Debug cart data on component mount (remove in production)
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("=== CHECKOUT PAGE MOUNT DEBUG ===");
      console.log("Cart prop received:", cart);
      console.log("Cart items:", cart?.items);
      console.log("Cart items length:", cart?.items?.length);

      if (cart?.items) {
        cart.items.forEach((item, index) => {
          console.log(`Cart Item ${index}:`, {
            product: item.product,
            productId: item.product?._id,
            quantity: item.quantity,
            price: item.price,
            selectedSize: item.selectedSize,
            selectedColor: item.selectedColor,
          });
        });
      }
    }
  }, [cart]);

  // Auto-fill user profile data
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profileResult = await getUserProfile();
        if (profileResult.success && profileResult.data) {
          const user = profileResult.data;
          setFormData((prev) => ({
            ...prev,
            name: user.name || prev.name,
            email: user.email || prev.email,
            phone: user.phone || prev.phone,
            address: user.address || prev.address,
            city: user.city || prev.city,
            postalCode: user.postalCode || prev.postalCode,
            country: user.country || prev.country,
            // Update card name with user's name
            cardName: user.name || prev.cardName,
          }));
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
      }
    };

    loadUserProfile();
  }, []);

  // Form states
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    phone: "",

    // Shipping Address
    address: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",

    // Payment
    paymentMethod: "card",

    // Card Details (only for card payments) - Default Stripe test data
    cardNumber: "4242 4242 4242 4242",
    cardName: "",
    expMonth: "12",
    expYear: String(new Date().getFullYear() + 1),
    cvc: "123",
  });

  // Form validation
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Personal Information
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    // Shipping Address
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    // Card details validation (only if card payment is selected)
    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Card number must be 16 digits";
      }

      if (!formData.cardName.trim()) {
        newErrors.cardName = "Cardholder name is required";
      }

      if (!formData.expMonth.trim()) {
        newErrors.expMonth = "Expiry month is required";
      } else if (
        parseInt(formData.expMonth) < 1 ||
        parseInt(formData.expMonth) > 12
      ) {
        newErrors.expMonth = "Invalid month";
      }

      if (!formData.expYear.trim()) {
        newErrors.expYear = "Expiry year is required";
      } else if (parseInt(formData.expYear) < new Date().getFullYear()) {
        newErrors.expYear = "Card has expired";
      }

      if (!formData.cvc.trim()) {
        newErrors.cvc = "CVC is required";
      } else if (!/^\d{3,4}$/.test(formData.cvc)) {
        newErrors.cvc = "CVC must be 3-4 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Auto-fill card details when payment method changes to card
  const handlePaymentMethodChange = (value) => {
    handleInputChange("paymentMethod", value);

    // Auto-fill card details with test data if switching to card
    if (value === "card") {
      setFormData((prev) => ({
        ...prev,
        cardNumber: "4242 4242 4242 4242",
        cardName: prev.name || "",
        expMonth: "12",
        expYear: String(new Date().getFullYear() + 1),
        cvc: "123",
      }));
    }
  };

  // Get card type from card number
  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, "");
    if (number.startsWith("4")) return "Visa";
    if (number.startsWith("5")) return "Mastercard";
    if (number.startsWith("3")) return "American Express";
    return "Card";
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    router.push("/products");
  };

  const handleCheckout = async () => {
    if (!validateForm()) {
      showErrorToast("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);
    setCurrentStep(2); // Move to processing step

    try {
      // Debug cart data (development only)
      if (process.env.NODE_ENV === "development") {
        console.log("=== CHECKOUT DEBUG ===");
        console.log("Cart object:", cart);
        console.log("Cart items:", cart.items);
        console.log("Cart items length:", cart.items?.length);

        // Debug each cart item
        cart.items?.forEach((item, index) => {
          console.log(`Item ${index}:`, {
            product: item.product,
            productId: item.product?._id,
            quantity: item.quantity,
            price: item.price,
            selectedSize: item.selectedSize,
            selectedColor: item.selectedColor,
          });
        });
      }

      // Validate cart items
      if (!cart.items || cart.items.length === 0) {
        showErrorToast("No items in cart");
        setIsProcessing(false);
        setCurrentStep(1);
        return;
      }

      // Check for missing product IDs
      const invalidItems = cart.items.filter(
        (item) => !item.product || !item.product._id
      );

      if (invalidItems.length > 0) {
        showErrorToast("Some items in cart are invalid");
        setIsProcessing(false);
        setCurrentStep(1);
        return;
      }

      // Prepare order data
      const orderRequestData = {
        items: cart.items.map((item) => ({
          product: item.product._id,
          qty: item.quantity,
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          name: formData.name,
          email: formData.email,
        },
        paymentMethod: formData.paymentMethod,
        // Add card details if card payment is selected
        ...(formData.paymentMethod === "card" && {
          cardDetails: {
            number: formData.cardNumber.replace(/\s/g, ""), // Remove spaces from card number
            expMonth: formData.expMonth,
            expYear: formData.expYear,
            cvc: formData.cvc,
            name: formData.cardName,
            email: formData.email,
          },
        }),
      };

      if (process.env.NODE_ENV === "development") {
        console.log("Order request data:", orderRequestData);
      }

      // Create order with payment
      const result = await createOrderWithPayment(orderRequestData);

      if (result.success) {
        setOrderData(result.data);

        // For cash on delivery, no payment processing needed
        if (formData.paymentMethod === "cash") {
          setCurrentStep(3); // Move directly to success step
          showSuccessToast(
            "Order placed successfully! You will pay on delivery."
          );

          // Clear cart after successful order
          try {
            await clearCart();
          } catch (error) {
            console.error("Error clearing cart:", error);
          }
        } else {
          // For card payments, simulate payment processing
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // Confirm payment
          const paymentResult = await confirmPayment(
            result.data.payment.paymentId
          );

          if (paymentResult.success) {
            setCurrentStep(3); // Move to success step
            showSuccessToast("Order placed successfully! Payment confirmed.");

            // Clear cart after successful order
            try {
              await clearCart();
            } catch (error) {
              console.error("Error clearing cart:", error);
            }
          } else {
            throw new Error(
              paymentResult.error || "Payment confirmation failed"
            );
          }
        }
      } else {
        throw new Error(result.error || "Failed to create order");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      showErrorToast(error.message || "Checkout failed. Please try again.");
      setCurrentStep(1); // Back to form
    } finally {
      setIsProcessing(false);
    }
  };

  const handleViewOrders = () => {
    router.push("/profile?tab=orders");
  };

  // Calculate totals
  const itemsPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 1000 ? 0 : 100; // Free shipping over 1000 BDT
  const totalPrice = itemsPrice + shippingPrice;

  // Show error if no cart or empty cart
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some products to your cart before checkout.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="bg-purple-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* Step 1: Checkout Form */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-4 w-4 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Checkout Information
              </h2>
            </div>

            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.name ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.email ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.phone ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.address ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter your full address"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.city ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter your city"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) =>
                        handleInputChange("postalCode", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.postalCode ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter postal code"
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.postalCode}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.country ? "border-red-300" : "border-gray-300"
                      }`}
                    >
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="India">India</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                    </select>
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={(e) =>
                        handlePaymentMethodChange(e.target.value)
                      }
                      className="mr-3"
                    />
                    <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={(e) =>
                        handlePaymentMethodChange(e.target.value)
                      }
                      className="mr-3"
                    />
                    <Banknote className="h-5 w-5 text-gray-400 mr-3" />
                    <span>Cash on Delivery</span>
                  </label>
                </div>

                {/* Card Details Form - Only show when card is selected */}
                {formData.paymentMethod === "card" && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Card Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Card Number */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 16);
                              const formatted = value.replace(
                                /(\d{4})(?=\d)/g,
                                "$1 "
                              );
                              handleInputChange("cardNumber", formatted);
                            }}
                            className={`w-full px-4 py-3 pr-20 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                              errors.cardNumber
                                ? "border-red-300"
                                : "border-gray-300"
                            }`}
                          />
                          {formData.cardNumber && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {getCardType(formData.cardNumber)}
                              </span>
                            </div>
                          )}
                        </div>
                        {errors.cardNumber && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>

                      {/* Cardholder Name */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={formData.cardName}
                          onChange={(e) =>
                            handleInputChange("cardName", e.target.value)
                          }
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.cardName
                              ? "border-red-300"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.cardName && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.cardName}
                          </p>
                        )}
                      </div>

                      {/* Expiry Month */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Month
                        </label>
                        <select
                          value={formData.expMonth}
                          onChange={(e) =>
                            handleInputChange("expMonth", e.target.value)
                          }
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.expMonth
                              ? "border-red-300"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="">Month</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option
                              key={i + 1}
                              value={String(i + 1).padStart(2, "0")}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </option>
                          ))}
                        </select>
                        {errors.expMonth && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.expMonth}
                          </p>
                        )}
                      </div>

                      {/* Expiry Year */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Year
                        </label>
                        <select
                          value={formData.expYear}
                          onChange={(e) =>
                            handleInputChange("expYear", e.target.value)
                          }
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.expYear
                              ? "border-red-300"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="">Year</option>
                          {Array.from({ length: 10 }, (_, i) => {
                            const year = new Date().getFullYear() + i;
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                        {errors.expYear && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.expYear}
                          </p>
                        )}
                      </div>

                      {/* CVC */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVC
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          value={formData.cvc}
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 4);
                            handleInputChange("cvc", value);
                          }}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.cvc ? "border-red-300" : "border-gray-300"
                          }`}
                        />
                        {errors.cvc && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.cvc}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 text-blue-600 mt-0.5">
                          <svg fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="text-sm text-blue-800">
                          <p className="font-medium">Secure Payment</p>
                          <p className="text-blue-700">
                            Your card information is encrypted and secure. We
                            never store your card details.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Test Data Notice */}
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 text-yellow-600 mt-0.5">
                          <svg fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.726-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="text-sm text-yellow-800">
                          <p className="font-medium">Test Mode</p>
                          <p className="text-yellow-700">
                            Using Stripe test card details. No real payment will
                            be processed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-purple-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
              >
                <CreditCard className="h-6 w-6" />
                Place Order - ৳{totalPrice.toLocaleString()}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Processing */}
        {currentStep === 2 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {formData.paymentMethod === "cash"
                  ? "Creating Your Order"
                  : "Processing Your Order"}
              </h2>
              <p className="text-gray-600 mb-6">
                {formData.paymentMethod === "cash"
                  ? "Please wait while we create your order..."
                  : "Please wait while we process your order and payment..."}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Creating order</span>
                </div>
                {formData.paymentMethod === "card" && (
                  <>
                    <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
                      <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                      <span>Processing payment</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-sm text-gray-400">
                      <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                      <span>Confirming payment</span>
                    </div>
                  </>
                )}
                <div className="flex items-center justify-center gap-3 text-sm text-gray-400">
                  <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                  <span>Finalizing order</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {currentStep === 3 && orderData && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Order Placed Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                {formData.paymentMethod === "cash"
                  ? "Thank you for your order. You will pay on delivery. We'll send you a confirmation email shortly. Your cart has been cleared."
                  : "Your order has been confirmed and payment processed. We'll send you a confirmation email shortly. Your cart has been cleared."}
              </p>

              {/* Order Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Order Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{orderData.order._id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">
                      ৳{orderData.order.totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className="font-medium text-green-600">Paid</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Status:</span>
                    <span className="font-medium text-blue-600">Confirmed</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleViewOrders}
                  className="w-full bg-purple-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-800 transition-colors"
                >
                  View My Orders
                </button>
                <button
                  onClick={handleContinueShopping}
                  className="w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Order Summary
          </h3>

          {/* Cart Items */}
          <div className="space-y-4 mb-6">
            {cart.items.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={item.product.photos?.[0] || "/placeholder-product.jpg"}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900">
                    {truncateText(item.product.name, 30)}
                  </h4>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.selectedSize && (
                      <span>Size: {item.selectedSize}</span>
                    )}
                    {item.selectedSize && item.selectedColor && (
                      <span> • </span>
                    )}
                    {item.selectedColor && (
                      <span>Color: {item.selectedColor}</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-900 mt-1">
                    ৳{item.price.toLocaleString()} × {item.quantity}
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  ৳{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 border-t border-gray-200 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Items Price</span>
              <span className="text-gray-900">
                ৳{itemsPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900">
                {shippingPrice === 0
                  ? "Free"
                  : `৳${shippingPrice.toLocaleString()}`}
              </span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">
                ৳{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {shippingPrice === 0 && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">
                  Free shipping on orders over ৳1,000
                </span>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-1">
                  Secure Checkout
                </h4>
                <p className="text-xs text-blue-700">
                  Your payment information is encrypted and secure. We never
                  store your card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
