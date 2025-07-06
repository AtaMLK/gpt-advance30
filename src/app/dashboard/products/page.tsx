"use client";
import Link from "next/link";

export default function ProductPage() {
  return (
    <div className="bg-stone-50 rounded-xl p-10 h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div className="border  border-stone-100 rounded-xl w-full h-50 flex flex-col gap-6 p-6 hover:shadow-md transition-shadow   ">
          <h1 className="text-2xl font-bold text-stone-600">Add New Product</h1>
          <p>To add new product pleass push the button </p>
          <Link href="/dashboard/products/addProductPage">
            <button className="bg-blue-600 text-white rounded px-6 py-2">
              Add Product
            </button>
          </Link>
        </div>
        <div className="border  border-stone-100 rounded-xl w-full h-50 flex flex-col gap-6 p-6 hover:shadow-md transition-shadow   ">
          <h1 className="text-2xl font-bold text-stone-600">Edit Product</h1>
          <p>Edit currently added poructs </p>
          <Link href="/dashboard/products/editProductPage">
            <button className="bg-blue-600 text-white rounded px-6 py-2">
              Edit Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
