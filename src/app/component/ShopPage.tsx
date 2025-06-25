"use client";
import { useCartStore } from "../lib/useCartStore";

const products = [
  { id: 1, title: "Silver Ring", price: 1000 },
  { id: 2, title: "Gold Necklace", price: 2500 },
  { id: 3, title: "Bracelet", price: 1800 },
];

export default function ShopPage() {
  const { addItem } = useCartStore();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">🛍 Products</h1>
      <ul className="space-y-4 mt-4">
        {products.map((product) => (
          <li key={product.id} className="flex justify-between items-center">
            <div>
              <p>{product.title}</p>
              <p>{product.price}₺</p>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded"
              onClick={() => addItem({ ...product, quantity: 1 })}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
