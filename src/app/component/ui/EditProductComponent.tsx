"use client";
import { supabase } from "@/app/lib/supabaseClient";
import { ProductForm, ProductSchema } from "@/app/lib/validation/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function EditProductComponent({
  product,
  onDone,
}: {
  product: {
    id: string | number;
    title: string;
    price: number;
    description?: string;
    image_url?: string;
  };
  onDone: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: product?.title,
      price: product?.price,
      description: product?.description,
    },
  });
  const onSubmit = async (data: ProductForm) => {
    console.log("Submitting form with data:", data); // 👈 اضافه کن
    let imagePath = product.image_url;

    if (data.image && data.image[0]) {
      console.log("iploading image :", data.image[0]);
      const file = data.image[0];
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData } = await supabase.storage
        .from("products")
        .upload(fileName, file);
      imagePath = uploadData?.path || imagePath;
    }

    const { error } = await supabase
      .from("tsproducts")
      .update({
        title: data.title,
        price: data.price,
        description: data.description,
        image_url: imagePath,
      })
      .eq("id", product.id);

    if (!error) onDone();
  };
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="relative shadow w-full rounded ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-stone-200/30 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-150 px-5 grid grid-cols-3 gap-8 py-15"
      >
        <div className="flex flex-col gap-4 col-span-1 items-cente justify-between pt-8 ">
          <input
            type="file"
            accept="image/"
            {...register("image")}
            className="w-full mx-auto"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }}
          />
          {(preview || product.image_url) && (
            <img
              
              src={
                preview
                  ? preview
                  : supabase.storage
                      .from("products")
                      .getPublicUrl(product.image_url || "").data.publicUrl
              }
              alt="Preview"
              className="w-64 h-64 flex items-center mx-auto object-cover rounded-full"
            />
          )}
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded mt-5 cursor-pointer"
          >
            Save changes
          </button>
        </div>
        <div className="col-start-2 col-span-2 grid gap-4">
          <div className="flex flex-col gap-1 items-start mt-2">
            <label htmlFor="title" className="font-semibold text-lg">
              Title
            </label>
            <input
              {...register("title")}
              className="rounded focus:outline-blue-500/80 px-4 py-2 border border-stone-200 w-full"
              placeholder="product title"
              id="title"
            />
            {errors.title && (
              <p className="text-mg text-red-500/80"> {errors.title.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 items-start ">
            <label htmlFor="price" className="font-semibold text-lg">
              Price
            </label>
            <input
              id="price"
              type="number"
              {...register("price")}
              className="rounded focus:outline-blue-500/80 px-4 py-2 border border-stone-200 w-full"
              placeholder="Product Price"
            />
            {errors.price && (
              <p className="text-mg text-red-500/80"> {errors.price.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 items-start ">
            <label htmlFor="description" className="font-semibold text-lg">
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="rounded focus:outline-blue-500/80 px-4 py-2 h-40 border border-stone-200 w-full"
              placeholder="Product description"
            />
            {errors.description && (
              <p className="text-mg text-red-500/80">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
