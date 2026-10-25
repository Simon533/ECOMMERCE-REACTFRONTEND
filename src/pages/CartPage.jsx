import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Looks like you haven't added any products yet.</p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium text-sm transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between gap-4"
            >
              <img
                src={item.productImageUrl || item.imageUrl || 'https://via.placeholder.com/80'}
                alt={item.productName}
                className="w-16 h-16 object-cover rounded bg-gray-100"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.productName}</h3>
                <p className="text-sm text-gray-500">${item.productPrice || item.price}</p>
              </div>

              <div className="flex items-center border rounded">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-3 text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.productId)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-xs text-gray-500 hover:text-gray-700 underline pt-2"
          >
            Clear Entire Cart
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="border-t pt-4 flex justify-between text-base font-bold text-gray-900 mb-6">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium text-sm transition-colors shadow-sm">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}