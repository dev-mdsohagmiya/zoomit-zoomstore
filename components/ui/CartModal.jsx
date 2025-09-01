"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";

export default function CartModal({ trigger }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl border-l border-purple-200 focus:outline-none z-50 data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right">
          <div className="flex items-center justify-between border-b border-purple-200 p-6 bg-gradient-to-r from-purple-50 to-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-900 flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <Dialog.Title className="text-lg font-bold text-purple-900">
                  Shopping Cart
                </Dialog.Title>
                <p className="text-sm text-purple-600">2 items in your cart</p>
              </div>
            </div>
            <Dialog.Close className="rounded-xl p-2 text-purple-500 hover:bg-purple-100 hover:text-purple-700 transition-colors">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <div className="h-[calc(100%-240px)] overflow-y-auto p-6 space-y-4">
            {/* Cart Item 1 */}
            <div className="flex gap-4 rounded-xl border border-purple-200 p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-purple-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Product"
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&h=120&fit=crop"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-purple-900">
                      Classic Cotton Tee
                    </p>
                    <p className="text-sm text-purple-600">Size M • Black</p>
                  </div>
                  <button className="text-purple-400 hover:text-red-500 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-purple-300 text-purple-700 hover:bg-purple-50 transition-colors">
                      <Minus className="h-4 w-4" />
                    </button>
                    <input
                      className="h-8 w-12 rounded-lg border border-purple-300 text-center text-purple-900 font-medium"
                      defaultValue={1}
                      readOnly
                    />
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-purple-300 text-purple-700 hover:bg-purple-50 transition-colors">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="font-bold text-purple-900">৳2,640</p>
                </div>
              </div>
            </div>

            {/* Cart Item 2 - Stock Out */}
            <div className="flex gap-4 rounded-xl border border-red-200 p-4 bg-red-50/50 opacity-75">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-red-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Product"
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-red-900">
                      Wireless Headphones
                    </p>
                    <p className="text-sm text-red-600">Silver</p>
                  </div>
                  <button className="text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-400"
                      disabled
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <input
                      className="h-8 w-12 rounded-lg border border-red-200 text-center bg-red-50 text-red-400"
                      defaultValue={0}
                      readOnly
                    />
                    <button
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-400"
                      disabled
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                      Stock Out
                    </span>
                    <p className="font-bold text-red-900 line-through">
                      ৳9,790
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-200 p-6 bg-gradient-to-r from-purple-50 to-white space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-purple-700">
                <span>Subtotal</span>
                <span>৳2,640</span>
              </div>
              <div className="flex items-center justify-between text-sm text-purple-700">
                <span>Shipping</span>
                <span>৳150</span>
              </div>
              <div className="border-t border-purple-200 pt-3">
                <div className="flex items-center justify-between text-lg font-bold text-purple-900">
                  <span>Total</span>
                  <span>৳2,790</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Dialog.Close asChild>
                <button className="h-12 flex-1 rounded-xl border-2 border-purple-300 text-purple-700 font-medium hover:bg-purple-50 transition-colors">
                  Continue Shopping
                </button>
              </Dialog.Close>
              <Link href="/checkout" className="flex-1">
                <button className="h-12 w-full rounded-xl bg-purple-900 text-white font-semibold hover:bg-purple-800 transition-colors shadow-lg">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
