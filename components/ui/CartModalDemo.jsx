"use client";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import CartSidePanel from "./CartSidePanel";
import CenteredCartModal from "./CenteredCartModal";

export default function CartModalDemo() {
  const [modalType, setModalType] = useState("side");

  return (
    <div className="p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-purple-900 mb-4">
          Cart Modal Demo
        </h1>
        <p className="text-purple-600 mb-6">
          Choose between side panel and centered modal views
        </p>

        {/* Modal Type Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setModalType("side")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              modalType === "side"
                ? "bg-purple-900 text-white"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            📱 Side Panel
          </button>
          <button
            onClick={() => setModalType("centered")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              modalType === "centered"
                ? "bg-purple-900 text-white"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            🖥️ Centered Modal
          </button>
        </div>
      </div>

      {/* Cart Modal Triggers */}
      <div className="flex justify-center gap-6">
        {modalType === "side" ? (
          <CartSidePanel
            trigger={
              <button className="flex items-center gap-2 px-6 py-3 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                Open Side Panel Cart
              </button>
            }
          />
        ) : (
          <CenteredCartModal
            trigger={
              <button className="flex items-center gap-2 px-6 py-3 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                Open Centered Cart
              </button>
            }
          />
        )}
      </div>

      {/* Features Comparison */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl border border-purple-200 p-6">
          <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
            📱 Side Panel Features
          </h3>
          <ul className="space-y-2 text-purple-700">
            <li>• Slides in from the right side</li>
            <li>• Takes up full height of screen</li>
            <li>• Compact width (max 384px)</li>
            <li>• Great for quick cart previews</li>
            <li>• Mobile-friendly design</li>
            <li>• Smooth slide animations</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-purple-200 p-6">
          <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
            🖥️ Centered Modal Features
          </h3>
          <ul className="space-y-2 text-purple-700">
            <li>• Appears in center of screen</li>
            <li>• Larger width (max 512px)</li>
            <li>• Better for detailed cart review</li>
            <li>• More spacious layout</li>
            <li>• Enhanced product display</li>
            <li>• Zoom-in/out animations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
