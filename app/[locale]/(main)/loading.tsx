
"use client";
import { ShoppingCart } from 'lucide-react'
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-gray-800">
      <div className="animate-bounce mb-4">
        <ShoppingCart className="w-16 h-16 !text-primary" />
      </div>
      <p className="text-xl font-medium animate-pulse"></p>
    </div>
  )
}