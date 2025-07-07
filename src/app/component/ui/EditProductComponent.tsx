"use client";
import { supabase } from "@/app/lib/supabaseClient";
import { ProductForm, ProductSchema } from "@/app/lib/validation/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
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
  return (
    <div
      className="relative flex items-center justify-center
      p-5  "
    >
      <div className="relative top-25 bg-stone-50 shadow w-full  p-5 rounded ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-stone-50 border border-stone-200  rounded-xl shadow-2xl p-10 flex flex-col"
        >
          <input
            {...register("title")}
            className="rounded focus:outline-blue-500/80 px-4 py-2"
            placeholder="product title"
          />
          {errors.title && (
            <p className="text-mg text-red-500/80"> {errors.title.message}</p>
          )}
          <input
            type="number"
            {...register("price")}
            className="rounded focus:outline-blue-500/80 px-4 py-2"
            placeholder="Product Price"
          />
          {errors.price && (
            <p className="text-mg text-red-500/80"> {errors.price.message}</p>
          )}
          <textarea
            {...register("description")}
            className="rounded focus:outline-blue-500/80 px-4 py-2"
            placeholder="Product description"
          />
          {errors.description && (
            <p className="text-mg text-red-500/80">
              {errors.description.message}
            </p>
          )}
          <input type="file" {...register("image")} className="w-full" />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded mt-5 cursor-pointer"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}
