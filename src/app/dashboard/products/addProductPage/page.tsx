"use client";
import AddFormComponent from "@/app/component/ui/AddFormComponent";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddProductsPage() {
  const router = useRouter();
  return (
    <div className="relative rounded shadow bg-stone-50 w-full h-min py-10">
      <button
        onClick={() => router.back()}
        className="absolute p-5 top-5 left-5 rounded bg-stone-100 shadow"
      >
        <ArrowLeft />
      </button>
      <h1 className="text-2xl font-bold text-blue-900 py-10 text-center">
        Add New Product
      </h1>
      <AddFormComponent />
    </div>
  );
}
