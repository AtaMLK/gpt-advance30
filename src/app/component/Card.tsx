"use client";

import Image from "next/image";

interface CardProps {
  title: string;
  price: number;
  image: string;
}

export default function Card({ title, price, image }: CardProps) {
  return (
    <div className="w-60 border p-4 rounded flex flex-col ">
      <div className="w-24 h-24 rounded-full overflow-hidden relative">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-xl font-semibold">{price} 💲</p>
    </div>
  );
}

/*  

import { useCartStore } from "../lib/CartStore";


export default function CartComponent() {
  const { items, addItem, removeItem, clearCart } = useCartStore();

  const sampleItem = { id: 1, title: "Silver Ring", quantity: 1 };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">🛒 Cart</h2>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => addItem(sampleItem)}
      >
        Add Silver Ring
      </button>

      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>
              {item.title} x {item.quantity}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {items.length > 0 && (
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      )}
    </div>
  );
}
 */
