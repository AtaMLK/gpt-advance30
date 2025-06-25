"use client";

import { useCartStore } from "../lib/useCartStore";

export default function CartPage() {
  const { items, increaseQty, decreaseQty, removeCart, clearCart } =
    useCartStore();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">🛒 Cart</h1>
      {items.length === 0 && <p>No items in cart.</p>}

      <ul className="space-y-4 mt-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center">
            <div>
              <p>{item.title}</p>
              <p>
                {item.price}₺ × {item.quantity}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => decreaseQty(item.id)} className="px-2">
                -
              </button>
              <button onClick={() => increaseQty(item.id)} className="px-2">
                +
              </button>
              <button
                onClick={() => removeCart(item.id)}
                className="text-red-500"
              >
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>

      {items.length > 0 && (
        <button
          onClick={clearCart}
          className="mt-6 bg-gray-800 text-white px-4 py-2 rounded"
        >
          Clear Cart
        </button>
      )}
    </div>
  );
}
