import EditProductsPage from "@/app/dashboard/products/editProductPage/page";
import { supabase } from "@/app/lib/supabaseClient";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image_url: string;
  created_at?: string;
  // add other fields as needed
};

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProducts, setEditingProducts] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("tsproducts")
        .select("*")
        .order("created_at", { ascending: false });
      setProducts(data || []);
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id: number) => {
    const confirm = window.confirm("Are you sure you want to delete this item");
    if (!confirm) return;

    const { error } = await supabase.from("tsproducts").delete().eq("id", id);
    if (!error) setProducts((prev) => prev.filter((p) => p.id !== id));
  };
  return (
    <div className="flex flex-wrap gap-6">
      {editingProducts ? (
        <EditProductsPage
          product={editingProducts}
          onDone={() => setEditingProducts(null)}
        />
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            className="relative w-[18rem] h-[25rem] bg-white border border-stone-200 hover:shadow-md rounded-xl overflow-hidden flex flex-col"
          >
            <div className=" justify-between border relative border-stone-200 hover:shadow-md rounded-xl flex flex-col pb-2 w-[18rem] h-[25rem]">
              <img
                src={
                  supabase.storage
                    .from("products")
                    .getPublicUrl(product.image_url).data.publicUrl
                }
                className="w-full h-[12.5rem] z-10 object-center object-cover rounded-t-xl rounded-b-full"
                alt={product.title}
              />
              <span className="w-full h-[14.5rem] bg-amber-200/30 rounded-full absolute top-0 hover:h-full hover:rounded-lg transition-all duration-150 z-0"></span>
              <div className="flex flex-col gap-2 px-4 py-2">
                <h1 className="text-xl font-bold tracking-wider">
                  {product.title}
                </h1>
                <p className="flex items-center gap-2 text-md font-semibold">
                  {product.price}
                  <DollarSign size={16} />
                </p>
                <p className="text-sm line-clamp-2">{product.description}</p>
              </div>
              <div className="flex gap-10 px-5 py-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setEditingProducts(product)}
                  className="bg-yellow-500 text-white px-2 py-1 text-sm rounded hover:shadow-sm shadow-amber-700/50"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => deleteProduct(product.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:shadow-sm shadow-amber-700/50 outline-0"
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
