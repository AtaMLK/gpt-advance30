import React from "react";

export default function Flex() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black text-white p-4 text-center">🛍 My Shop</header>

      <main className="flex-1 p-6 grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-4">Product 1</div>
        <div className="bg-white shadow rounded p-4">Product 2</div>
        <div className="bg-white shadow rounded p-4">Product 3</div>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">© 2025</footer>
    </div>
  );
}
