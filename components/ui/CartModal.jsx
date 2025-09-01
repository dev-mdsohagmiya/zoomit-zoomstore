"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { X, ShoppingCart, Minus, Plus } from "lucide-react";

export default function CartModal({ trigger }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl border-l border-slate-200 focus:outline-none data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right">
          <div className="flex items-center justify-between border-b border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <Dialog.Title className="text-lg font-semibold text-slate-900">
                Your Cart
              </Dialog.Title>
            </div>
            <Dialog.Close className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <div className="h-[calc(100%-192px)] overflow-y-auto p-4 space-y-4">
            {/* Cart Item 1 */}
            <div className="flex gap-3 rounded-lg border border-slate-200 p-3">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Product"
                  src="https://picsum.photos/seed/zoomstore-1/120/120"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-slate-900">
                      Classic Cotton Tee
                    </p>
                    <p className="text-sm text-slate-500">Size M • Black</p>
                  </div>
                  <p className="font-medium text-slate-900">$24.00</p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
                    disabled
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    className="h-8 w-12 rounded-md border border-slate-300 text-center"
                    defaultValue={1}
                    readOnly
                  />
                  <button
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
                    disabled
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Cart Item 2 - Stock Out */}
            <div className="flex gap-3 rounded-lg border border-slate-200 p-3 opacity-70">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Product"
                  src="https://picsum.photos/seed/zoomstore-2/120/120"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-slate-900">
                      Wireless Headphones
                    </p>
                    <p className="text-sm text-slate-500">Silver</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                      Stock Out
                    </span>
                    <p className="font-medium text-slate-900">$89.00</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-400"
                    disabled
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    className="h-8 w-12 rounded-md border border-slate-200 text-center bg-slate-50"
                    defaultValue={0}
                    readOnly
                  />
                  <button
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-400"
                    disabled
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>$113.00</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Shipping</span>
              <span>$7.00</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold text-slate-900">
              <span>Total</span>
              <span>$120.00</span>
            </div>

            <div className="flex gap-2 pt-2">
              <Dialog.Close asChild>
                <button className="h-10 flex-1 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50">
                  Continue Shopping
                </button>
              </Dialog.Close>
              <Link href="/checkout" className="flex-1">
                <button className="h-10 w-full rounded-md bg-slate-900 text-white hover:bg-slate-800">
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
